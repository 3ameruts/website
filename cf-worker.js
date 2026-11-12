// Cloudflare Workers entry: wraps the OpenNext worker.
// Adds HTTP Range support (206 Partial Content) for videos — Safari/iOS will
// not play <video> unless the server honours byte-range requests, and the
// static-asset server returns the whole file instead.
import openNext from "./.open-next/worker.js";
import { WorkerMailer } from "worker-mailer";

export * from "./.open-next/worker.js";

const VIDEO_PREFIX = "/media/video/";

async function serveVideo(request, env) {
  const url = new URL(request.url);
  const range = request.headers.get("range");
  const asset = await env.ASSETS.fetch(new Request(url.toString(), { method: "GET" }));
  if (asset.status !== 200) return asset;

  const headers = new Headers(asset.headers);
  headers.set("Accept-Ranges", "bytes");
  const match = range && /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if (!match) {
    return new Response(request.method === "HEAD" ? null : asset.body, { status: 200, headers });
  }

  const body = await asset.arrayBuffer();
  const size = body.byteLength;
  let start = match[1] === "" ? NaN : Number(match[1]);
  let end = match[2] === "" ? NaN : Number(match[2]);
  if (Number.isNaN(start)) {
    // suffix range: last N bytes
    start = Math.max(0, size - (Number.isNaN(end) ? 0 : end));
    end = size - 1;
  } else if (Number.isNaN(end) || end >= size) {
    end = size - 1;
  }
  if (start > end || start >= size) {
    headers.set("Content-Range", `bytes */${size}`);
    return new Response(null, { status: 416, headers });
  }
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(request.method === "HEAD" ? null : body.slice(start, end + 1), { status: 206, headers });
}

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8" } });

/**
 * Quote requests: the Next.js route validates the form and prepares the email
 * (header x-quote-deliver). Here it is sent through the company's Zoho mailbox.
 * Secret: ZOHO_SMTP_PASSWORD (set in Cloudflare → Worker → Settings → Variables and Secrets).
 * Optional vars: SMTP_USER (default sales@joradvanced.com), SMTP_HOST, SMTP_PORT, QUOTE_TO.
 */
async function handleQuote(request, env, ctx) {
  const res = await openNext.fetch(request, env, ctx);
  if (res.headers.get("x-quote-deliver") !== "1") return res; // validation error, rate limit, etc.
  const { deliver } = await res.json();
  if (!env.ZOHO_SMTP_PASSWORD) return json({ ok: false, error: "not_configured" }, 503);

  const user = env.SMTP_USER || "sales@joradvanced.com";
  let mailer;
  try {
    mailer = await WorkerMailer.connect({
      host: env.SMTP_HOST || "smtppro.zoho.com",
      port: Number(env.SMTP_PORT || 465),
      secure: true,
      credentials: { username: user, password: env.ZOHO_SMTP_PASSWORD },
      authType: "login",
    });
    await mailer.send({
      from: { name: "Jordanian Advanced Laboratory Equipment — Website", email: user },
      to: { email: env.QUOTE_TO || user },
      reply: { name: deliver.replyName, email: deliver.replyEmail },
      subject: deliver.subject,
      text: deliver.text,
      html: deliver.html,
    });
    return json({ ok: true, via: "email" });
  } catch (err) {
    console.error("[quote] email delivery failed", err && err.message);
    return json({ ok: false, error: "delivery_failed" }, 502);
  } finally {
    try {
      await mailer?.close();
    } catch {
      /* ignore */
    }
  }
}

const worker = {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/quote" && request.method === "POST") {
      return handleQuote(request, env, ctx);
    }
    if (pathname.startsWith(VIDEO_PREFIX) && (request.method === "GET" || request.method === "HEAD")) {
      return serveVideo(request, env);
    }
    return openNext.fetch(request, env, ctx);
  },
};

export default worker;

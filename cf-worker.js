// Cloudflare Workers entry: wraps the OpenNext worker.
// Adds HTTP Range support (206 Partial Content) for videos — Safari/iOS will
// not play <video> unless the server honours byte-range requests, and the
// static-asset server returns the whole file instead.
import openNext from "./.open-next/worker.js";

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

const worker = {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname.startsWith(VIDEO_PREFIX) && (request.method === "GET" || request.method === "HEAD")) {
      return serveVideo(request, env);
    }
    return openNext.fetch(request, env, ctx);
  },
};

export default worker;

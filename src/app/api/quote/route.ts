import { NextResponse } from "next/server";
import { toWesternDigits, validateQuote, type QuoteInput } from "@/lib/quote-validation";

/**
 * Quote / contact submissions.
 *
 * Delivery: set QUOTE_WEBHOOK_URL (e.g. a CRM, Zapier/Make, Slack or an email
 * service webhook). The validated request is POSTed there as JSON.
 * Without it, development logs the request; production returns 503 so the
 * visitor is told to use email/WhatsApp instead — requests are never silently lost.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // best-effort, per server instance

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  // Exact JSON MIME type: also forces a CORS preflight for cross-site posts.
  const type = (request.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (type !== "application/json") {
    return NextResponse.json({ ok: false, error: "unsupported" }, { status: 415 });
  }
  // Same-origin only (browsers always send Origin on POST).
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  // Best-effort key. Behind a proxy that overwrites these headers this is reliable;
  // for strict limits use the platform's rate limiting (e.g. edge/WAF rules).
  const ip = request.headers.get("x-real-ip") ?? ((request.headers.get("x-forwarded-for") ?? "").split(",").pop()?.trim() || "unknown");
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  // Read with a hard cap — content-length can be absent (chunked) or wrong.
  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 20_000) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
    raw = JSON.parse(text);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("shape");
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, do nothing.
  if (clip(raw.website, 200)) return NextResponse.json({ ok: true });

  const input: QuoteInput = {
    name: clip(raw.name, 120),
    company: clip(raw.company, 160),
    email: clip(raw.email, 160),
    phone: toWesternDigits(clip(raw.phone, 30)),
    interest: clip(raw.interest, 40),
    message: clip(raw.message, 5000),
    consent: raw.consent === true,
    locale: raw.locale === "ar" ? "ar" : "en",
  };

  const errors = validateQuote(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "validation", fields: Object.keys(errors) }, { status: 422 });
  }

  const payload = { ...input, receivedAt: new Date().toISOString(), source: "website" };
  const webhook = process.env.QUOTE_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[quote] delivery failed", err);
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[quote] (dev, no QUOTE_WEBHOOK_URL) received:", JSON.stringify(payload));
    return NextResponse.json({ ok: true, dev: true });
  }
  return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
}

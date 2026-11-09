import { NextResponse } from "next/server";
import { validateQuote, type QuoteInput } from "@/lib/quote-validation";

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
  const type = request.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "unsupported" }, { status: 415 });
  }
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 20_000) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, do nothing.
  if (clip(raw.website, 200)) return NextResponse.json({ ok: true });

  const input: QuoteInput = {
    name: clip(raw.name, 120),
    company: clip(raw.company, 160),
    email: clip(raw.email, 160),
    phone: clip(raw.phone, 30),
    interest: clip(raw.interest, 40),
    message: clip(raw.message, 5000),
    consent: raw.consent === true,
    locale: raw.locale === "ar" ? "ar" : "en",
    items: Array.isArray(raw.items)
      ? raw.items.slice(0, 60).map((it) => {
          const o = (it ?? {}) as Record<string, unknown>;
          return { id: clip(o.id, 80), name: clip(o.name, 160), qty: Math.max(1, Math.min(9999, Math.round(Number(o.qty) || 1))) };
        })
      : [],
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

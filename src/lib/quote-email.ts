import type { QuoteInput } from "./quote-validation";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";

/**
 * Builds the quote-request email (subject, text, HTML). Sending happens in
 * cf-worker.js (Cloudflare TCP sockets → the company's Zoho mailbox).
 */
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type QuoteEmail = { subject: string; text: string; html: string; replyName: string; replyEmail: string };

export function buildQuoteEmail(input: QuoteInput): QuoteEmail {
  const interest =
    input.interest === "lab-setup"
      ? "Complete laboratory setup / تجهيز مختبر متكامل"
      : input.interest === "other"
        ? "Other / أخرى"
        : (() => {
            const s = solutions.find((x) => x.id === input.interest);
            return s ? `${s.title.en} / ${s.title.ar}` : input.interest;
          })();
  const rows: [string, string][] = [
    ["Name / الاسم", input.name],
    ["Company / الشركة", input.company || "—"],
    ["Email / البريد", input.email],
    ["Phone / الهاتف", input.phone || "—"],
    ["Interest / المجال", interest],
    ["Language / اللغة", input.locale === "ar" ? "العربية" : "English"],
  ];
  const text = `New quote request — ${site.brand.name.en}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage / الرسالة:\n${input.message}\n`;
  const html = `<div style="font-family:Arial,sans-serif;color:#0B2D6B;max-width:640px">
<h2 style="margin:0 0 16px">New quote request — طلب عرض سعر جديد</h2>
<table style="border-collapse:collapse;width:100%">${rows
    .map(([k, v]) => `<tr><td style="padding:8px;border-bottom:1px solid #E6E9ED;color:#4A5670;white-space:nowrap">${esc(k)}</td><td style="padding:8px;border-bottom:1px solid #E6E9ED"><b>${esc(v)}</b></td></tr>`)
    .join("")}</table>
<p style="margin:20px 0 6px;color:#4A5670">Message / الرسالة</p>
<div style="white-space:pre-wrap;padding:12px;background:#F5F7F9;border-left:3px solid #00A99D">${esc(input.message)}</div>
<p style="margin-top:20px;font-size:12px;color:#4A5670">Sent from the website quote form. Reply to this email to answer the customer directly.</p></div>`;
  return {
    subject: `Quote request: ${input.name}${input.company ? ` (${input.company})` : ""} — ${interest.split(" / ")[0]}`,
    text,
    html,
    replyName: input.name,
    replyEmail: input.email,
  };
}

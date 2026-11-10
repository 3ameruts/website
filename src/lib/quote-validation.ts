/** Shared by the client form and the API route — one source of truth. */
import { solutions } from "@/content/solutions";

/** Product categories + complete laboratory setup + other. */
export const INTERESTS = [...solutions.map((s) => s.id), "lab-setup", "other"] as const;

export type QuoteInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  consent: boolean;
  locale: string;
  website?: string; // honeypot
};

export type FieldErrors = Partial<Record<"name" | "email" | "phone" | "interest" | "message" | "consent", true>>;

/** Arabic-Indic (٠-٩) and Eastern Arabic-Indic (۰-۹) digits → Western digits. */
export function toWesternDigits(v: string) {
  return v.replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660)).replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
}

const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
const PHONE = /^\+?[0-9\s\-()]{7,20}$/;

export function validateQuote(input: Partial<QuoteInput>): FieldErrors {
  const e: FieldErrors = {};
  if (!input.name || input.name.trim().length < 2 || input.name.length > 120) e.name = true;
  if (!input.email || !EMAIL.test(input.email.trim()) || input.email.length > 160) e.email = true;
  const phone = toWesternDigits(input.phone ?? "").trim();
  if (phone && !PHONE.test(phone)) e.phone = true;
  if (!input.interest || !(INTERESTS as readonly string[]).includes(input.interest)) e.interest = true;
  if (!input.message || input.message.trim().length < 10 || input.message.length > 5000) e.message = true;
  if (!input.consent) e.consent = true;
  return e;
}

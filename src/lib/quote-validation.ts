/** Shared by the client form and the API route — one source of truth. */
export const INTERESTS = [
  "medical",
  "lab-equipment",
  "instruments",
  "consumables",
  "furniture",
  "setup",
  "design",
  "research",
  "other",
] as const;

export type QuoteInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  consent: boolean;
  items: { id: string; name: string; qty: number }[];
  locale: string;
  website?: string; // honeypot
};

export type FieldErrors = Partial<Record<"name" | "email" | "phone" | "interest" | "message" | "consent", true>>;

const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
const PHONE = /^\+?[0-9\s\-()]{7,20}$/;

export function validateQuote(input: Partial<QuoteInput>): FieldErrors {
  const e: FieldErrors = {};
  if (!input.name || input.name.trim().length < 2 || input.name.length > 120) e.name = true;
  if (!input.email || !EMAIL.test(input.email.trim()) || input.email.length > 160) e.email = true;
  if (input.phone && input.phone.trim() && !PHONE.test(input.phone.trim())) e.phone = true;
  if (!input.interest || !(INTERESTS as readonly string[]).includes(input.interest)) e.interest = true;
  if (!input.message || input.message.trim().length < 10 || input.message.length > 5000) e.message = true;
  if (!input.consent) e.consent = true;
  return e;
}

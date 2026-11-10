"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { solutions } from "@/content/solutions";
import { site, whatsappLink } from "@/content/site";
import { INTERESTS, validateQuote, type FieldErrors } from "@/lib/quote-validation";
import { Arrow } from "@/components/ui/Arrow";

type Status = "idle" | "sending" | "success" | "error";
type FieldName = keyof FieldErrors;


export function QuoteForm({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  const dict = getDictionary(locale);
  const f = dict.form;
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState({ name: "", company: "", email: "", phone: "", interest: "", message: "", consent: false, website: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");

  // Preselect the category from links such as /contact?interest=glassware#quote.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("interest");
    if (fromUrl && (INTERESTS as readonly string[]).includes(fromUrl)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL (external source)
      setValues((v) => (v.interest ? v : { ...v, interest: fromUrl }));
    }
  }, []);

  const current = values;
  const set = (name: keyof typeof values, value: string | boolean) => {
    const next = { ...current, [name]: value };
    setValues(next);
    if (touched[name as FieldName]) setErrors(validateQuote(next));
  };
  const blur = (name: FieldName) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validateQuote(current));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateQuote(current);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, interest: true, message: true, consent: true });
    if (Object.keys(errs).length) {
      setStatus("error");
      setServerError(f.errorBody);
      const first = (["name", "email", "phone", "interest", "message", "consent"] as FieldName[]).find((k) => errs[k]);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...current,
          locale,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setValues({ name: "", company: "", email: "", phone: "", interest: "", message: "", consent: false, website: "" });
        setTouched({});
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      setStatus("error");
      setServerError(
        data.error === "validation" ? f.errorBody : data.error === "not_configured" ? f.errorNotConfigured : f.errorNetwork,
      );
    } catch {
      setStatus("error");
      setServerError(f.errorNetwork);
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const dark = tone === "dark";
  const labelCls = `mb-2 block text-[0.95rem] font-semibold ${dark ? "text-white" : "text-navy"}`;
  const errCls = `mt-2 flex items-start gap-2 text-sm font-medium ${dark ? "text-error-light" : "text-error"}`;
  const showErr = (n: FieldName) => touched[n] && errors[n];
  const fieldProps = (n: FieldName) => ({
    id: id(n),
    "aria-invalid": showErr(n) ? (true as const) : undefined,
    "aria-describedby": showErr(n) ? id(`${n}-err`) : undefined,
    onBlur: () => blur(n),
  });
  const renderErr = (n: FieldName) =>
    showErr(n) ? (
      <p id={id(`${n}-err`)} className={errCls}>
        <svg aria-hidden viewBox="0 0 16 16" width="16" height="16" className="mt-0.5 shrink-0"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 4.5v4.5M8 11v.5" stroke="currentColor" strokeWidth="1.6" /></svg>
        {f.errors[n]}
      </p>
    ) : null;

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className={`outline-none ${dark ? "text-white" : ""}`}>
        <div className="flex items-center gap-4">
          <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-teal text-navy">
            <svg viewBox="0 0 20 20" width="20" height="20"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
          </span>
          <h3 className="t-h3">{f.successTitle}</h3>
        </div>
        <p className="t-lead mt-5 max-w-[46ch] opacity-85">{f.successBody}</p>
        <button type="button" className="btn btn-outline mt-8" onClick={() => setStatus("idle")}>
          {f.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={id("intro")} className={dark ? "text-white" : ""}>
      <p id={id("intro")} className={`t-small mb-8 ${dark ? "text-white/75" : "text-slate"}`}>
        {f.intro}
      </p>

      <div ref={statusRef} tabIndex={-1} className="outline-none">
        {status === "error" && serverError && (
          <div role="alert" className={`mb-8 border-s-4 p-4 ${dark ? "border-error-light bg-white/10" : "border-error bg-[#fdf1ef]"}`}>
            <p className="font-semibold">{f.errorTitle}</p>
            <p className="t-small mt-1">{serverError}</p>
            {serverError !== f.errorBody && (
              <p className="t-small mt-3 flex flex-wrap gap-x-5 gap-y-1 font-semibold">
                <a href={`mailto:${site.contact.salesEmail}`} className="link" dir="ltr">
                  {site.contact.salesEmail}
                </a>
                <a href={whatsappLink(f.whatsappGreeting)} className="link" target="_blank" rel="noopener noreferrer">
                  {f.whatsappCta}
                </a>
              </p>
            )}
          </div>
        )}
      </div>


      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={labelCls}>
            {f.name} <span aria-hidden>*</span>
          </label>
          <input {...fieldProps("name")} name="name" autoComplete="name" required className="field" value={current.name} onChange={(e) => set("name", e.target.value)} />
          {renderErr("name")}
        </div>
        <div>
          <label htmlFor={id("company")} className={labelCls}>
            {f.company}
          </label>
          <input id={id("company")} name="company" autoComplete="organization" className="field" value={current.company} onChange={(e) => set("company", e.target.value)} />
        </div>
        <div>
          <label htmlFor={id("email")} className={labelCls}>
            {f.email} <span aria-hidden>*</span>
          </label>
          <input {...fieldProps("email")} name="email" type="email" autoComplete="email" dir="ltr" required className="field rtl:text-end" value={current.email} onChange={(e) => set("email", e.target.value)} />
          {renderErr("email")}
        </div>
        <div>
          <label htmlFor={id("phone")} className={labelCls}>
            {f.phone}
          </label>
          <input {...fieldProps("phone")} name="phone" type="tel" autoComplete="tel" dir="ltr" className="field tabular rtl:text-end" value={current.phone} onChange={(e) => set("phone", e.target.value)} />
          {renderErr("phone")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("interest")} className={labelCls}>
            {f.interest} <span aria-hidden>*</span>
          </label>
          <select {...fieldProps("interest")} name="interest" required className="field" value={current.interest} onChange={(e) => set("interest", e.target.value)}>
            <option value="">{f.interestPlaceholder}</option>
            {INTERESTS.map((k) => (
              <option key={k} value={k}>
                {k === "other" ? f.other : k === "lab-setup" ? f.labSetup : solutions.find((s) => s.id === k)?.title[locale]}
              </option>
            ))}
          </select>
          {renderErr("interest")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className={labelCls}>
            {f.message} <span aria-hidden>*</span>
          </label>
          <textarea {...fieldProps("message")} name="message" rows={5} required placeholder={f.messagePlaceholder} className="field min-h-36 resize-y" value={current.message} onChange={(e) => set("message", e.target.value)} />
          {renderErr("message")}
        </div>
        {/* Honeypot — hidden from people and assistive tech */}
        <div aria-hidden className="absolute -start-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Website</label>
          <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" value={current.website} onChange={(e) => set("website", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              {...fieldProps("consent")}
              type="checkbox"
              name="consent"
              checked={current.consent}
              onChange={(e) => set("consent", e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-teal-ink)]"
            />
            <span>
              {f.consent} <span aria-hidden>*</span>
            </span>
          </label>
          {renderErr("consent")}
        </div>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-5">
        <button type="submit" className={`btn ${dark ? "btn-light" : ""}`} disabled={status === "sending"} aria-disabled={status === "sending"}>
          {status === "sending" ? f.sending : f.submit}
          {status !== "sending" && <Arrow />}
        </button>
      </div>
    </form>
  );
}


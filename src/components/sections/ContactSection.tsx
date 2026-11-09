import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site, whatsappLink } from "@/content/site";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { DemoTag } from "@/components/ui/DemoTag";

export function ContactDetails({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = site.contact;
  const rows = [
    { label: dict.common.email, value: c.email, href: `mailto:${c.email}`, ltr: true },
    { label: dict.common.phone, value: c.phoneDisplay, href: `tel:${c.phoneHref}`, ltr: true },
    { label: dict.common.whatsapp, value: dict.form.whatsappCta, href: whatsappLink(), external: true },
    { label: dict.common.location, value: c.address[locale], href: c.mapUrl ?? undefined, external: true },
    { label: dict.common.hours, value: c.hours[locale] },
  ];
  return (
    <div>
      <DemoTag label={dict.common.demoHint} />
      <dl className="mt-6 divide-y divide-white/15 border-y border-white/15">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4">
            <dt className="t-label">{r.label}</dt>
            <dd className="min-w-0 font-medium">
              {r.href ? (
                <a
                  href={r.href}
                  dir={r.ltr ? "ltr" : undefined}
                  className="link break-words"
                  {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {r.value}
                </a>
              ) : (
                <span>{r.value}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ContactSection({
  locale,
  dict,
  title,
  body,
  chapter,
  headingLevel = "h2",
}: {
  locale: Locale;
  dict: Dictionary;
  title: string;
  body: string;
  chapter?: string;
  headingLevel?: "h1" | "h2";
}) {
  const H = headingLevel;
  return (
    <section
      id="quote"
      data-chapter={chapter}
      data-theme="dark"
      aria-labelledby="quote-title"
      className="grid scroll-mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    >
      <div className="on-dark relative isolate overflow-hidden bg-navy px-[var(--margin)] py-[var(--section)] text-white lg:pe-16">
        <Image src="/media/img/microscope-navy.jpg" alt="" fill sizes="(min-width: 1024px) 42vw, 100vw" className="-z-10 object-cover opacity-25" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-navy)_30%,rgb(11_45_107/0.7))]" />
        <div className="ms-auto max-w-[34rem]">
          <H id="quote-title" className={headingLevel === "h1" ? "t-h1" : "t-h1"}>
            {title}
          </H>
          <p className="t-lead mt-6 text-white/85">{body}</p>
          <div className="mt-12">
            <ContactDetails locale={locale} dict={dict} />
          </div>
        </div>
      </div>
      <div className="bg-white px-[var(--margin)] py-[var(--section)] lg:ps-16" data-theme="light">
        <div className="max-w-[44rem]">
          <h2 className="t-h3 mb-2">{dict.form.title}</h2>
          <QuoteForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

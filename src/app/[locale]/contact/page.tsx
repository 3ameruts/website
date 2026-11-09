import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { contactPage } from "@/content/pages";
import { site, whatsappLink } from "@/content/site";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { lp } from "@/lib/i18n";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { DemoTag } from "@/components/ui/DemoTag";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: "/contact", title: contactPage.meta.title, description: contactPage.meta.description });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  const channels = [
    { title: dict.common.whatsapp, value: dict.form.whatsappCta, href: whatsappLink(), external: true },
    { title: dict.common.email, value: site.contact.salesEmail, href: `mailto:${site.contact.salesEmail}`, ltr: true },
    { title: dict.common.phone, value: site.contact.phoneDisplay, href: `tel:${site.contact.phoneHref}`, ltr: true },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: dict.nav.home, url: lp(locale) }, { name: dict.nav.contact, url: lp(locale, "/contact") }])} />
      <div className="h-[var(--header-h)] bg-navy lg:h-[5.25rem]" aria-hidden />
      <ContactSection
        locale={locale}
        dict={dict}
        title={contactPage.hero.title[locale]}
        body={contactPage.hero.body[locale]}
        headingLevel="h1"
      />
      <section data-theme="light" aria-labelledby="channels-title" className="section-y bg-gray">
        <div className="frame">
          <div className="flex flex-wrap items-center gap-4">
            <h2 id="channels-title" className="t-h2">{dict.form.orReach}</h2>
            <DemoTag label={dict.common.demoHint} />
          </div>
          <ul className="mt-12 grid gap-px bg-navy/15 md:grid-cols-3">
            {channels.map((c) => (
              <li key={c.title} className="bg-gray">
                <a
                  href={c.href}
                  className="group flex h-full flex-col justify-between gap-10 bg-white p-8 transition-colors duration-300 hover:bg-navy hover:text-white"
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="t-label group-hover:text-white/75">{c.title}</span>
                  <span className="t-h3 break-words" dir={c.ltr ? "ltr" : undefined}>{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-px grid gap-px bg-navy/15 md:grid-cols-[1fr_2fr]">
            <div className="bg-white p-8">
              <p className="t-label">{dict.common.location}</p>
              <p className="t-h3 mt-4">{site.contact.address[locale]}</p>
              <p className="mt-3 text-slate">{site.contact.hours[locale]}</p>
            </div>
            {/* Map placeholder — set site.contact.mapUrl and replace with an embed when the address is confirmed. */}
            <div className="relative grid min-h-64 place-items-center overflow-hidden bg-white p-8 text-center">
              <svg aria-hidden className="absolute inset-0 h-full w-full text-navy/[0.07]" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              <div className="relative">
                <svg aria-hidden viewBox="0 0 24 32" width="24" height="32" className="mx-auto text-teal"><path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 32 12 32s12-11.2 12-20.1C24 5.3 18.6 0 12 0z" fill="currentColor" /><circle cx="12" cy="12" r="4.5" fill="#fff" /></svg>
                <p className="mt-4 font-semibold">{locale === "en" ? "Map will appear here once the address is confirmed." : "ستظهر الخريطة هنا بعد تأكيد العنوان."}</p>
                {site.contact.mapUrl && (
                  <a href={site.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-block">
                    {locale === "en" ? "Open in maps" : "افتح في الخرائط"}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

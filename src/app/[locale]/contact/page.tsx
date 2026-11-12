import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { contactPage } from "@/content/pages";
import { mapEmbedUrl, site, whatsappLink } from "@/content/site";
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
  const contactEmail = site.contact.email ?? site.contact.salesEmail;
  const channels = [
    { title: dict.common.whatsapp, value: dict.form.whatsappCta, href: whatsappLink(dict.form.whatsappGreeting), external: true, ltr: false },
    { title: dict.common.phone, value: site.contact.phoneDisplay, href: `tel:${site.contact.phoneHref}`, external: false, ltr: true },
    ...(contactEmail ? [{ title: dict.common.email, value: contactEmail, href: `mailto:${contactEmail}`, external: false, ltr: true }] : []),
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
          <ul className={`mt-12 grid gap-px bg-navy/15 ${channels.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
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
              {site.contact.hours && <p className="mt-3 text-slate">{site.contact.hours[locale]}</p>}
            </div>
            {/* Office map — building pin by coordinates (site.contact.geo). */}
            {mapEmbedUrl(locale) ? (
              <div className="relative min-h-72 bg-white md:min-h-80">
                <iframe
                  src={mapEmbedUrl(locale)!}
                  title={dict.common.mapTitle}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                {site.contact.mapUrl && (
                  <a
                    href={site.contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm absolute bottom-4 start-4 shadow-sm"
                  >
                    {dict.common.openMap}
                  </a>
                )}
              </div>
            ) : (
              <div className="relative grid min-h-64 place-items-center bg-white p-8 text-center">
                <p className="font-semibold">{dict.common.mapPlaceholder}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

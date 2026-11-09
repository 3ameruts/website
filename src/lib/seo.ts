import type { Metadata } from "next";
import { locales, localeMeta, type L, type Locale } from "@/i18n/config";
import { site } from "@/content/site";
import { lp } from "./i18n";

type MetaInput = {
  locale: Locale;
  path: string;
  title: L;
  description: L;
  image?: string;
  /** Home page uses the full brand name as title. */
  absoluteTitle?: boolean;
};

export function buildMetadata({ locale, path, title, description, image, absoluteTitle }: MetaInput): Metadata {
  const brand = site.brand.name[locale];
  const fullTitle = absoluteTitle ? `${brand} — ${title[locale]}` : `${title[locale]} | ${brand}`;
  const url = `${site.url}${lp(locale, path)}`;
  const languages = Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `${site.url}${lp(l, path)}`]));
  const ogImage = image ?? "/brand/og.jpg";
  return {
    title: { absolute: fullTitle },
    description: description[locale],
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": `${site.url}${lp("en", path)}` },
    },
    openGraph: {
      type: "website",
      url,
      siteName: brand,
      title: fullTitle,
      description: description[locale],
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      images: [{ url: ogImage, width: 1200, height: 630, alt: brand }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description[locale],
      images: [ogImage],
    },
  };
}

/** Organization + WebSite structured data. Contact values come from site.ts. */
export function organizationJsonLd(locale: Locale) {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.brand.name.en,
        alternateName: site.brand.name.ar,
        url: site.url,
        logo: `${site.url}${site.brand.logo.full.src}`,
        description: site.brand.descriptor[locale],
        email: site.contact.email,
        telephone: site.contact.phoneHref,
        address: { "@type": "PostalAddress", streetAddress: site.contact.address[locale], addressCountry: "JO" },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: site.contact.salesEmail,
            telephone: site.contact.phoneHref,
            availableLanguage: ["English", "Arabic"],
          },
        ],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.brand.name[locale],
        inLanguage: localeMeta[locale].htmlLang,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}


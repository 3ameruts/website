/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — the single place to put real company information.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every value marked `REPLACE` is a placeholder. Nothing here is real company
 *  data: the brand name, contact details and address must be supplied by the
 *  client before launch.
 *
 *  `demoMode: true` shows small dashed "Demo content" tags on every block that
 *  still contains placeholder material (contact details).
 *  Set it to `false` once real content is in place.
 */
import type { L } from "@/i18n/config";

export const site = {
  demoMode: true,

  /** REPLACE — production URL, used for canonical links, sitemap and Open Graph. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",

  /** Official brand colours (brand sheet). Mirrored as CSS tokens in globals.css. */
  colors: { navy: "#0B2D6B", teal: "#00A99D", gray: "#E6E9ED", white: "#FFFFFF" },

  brand: {
    /** Official company name (from the client's brand sheet). */
    name: {
      en: "Jordanian Advanced Laboratory Equipment",
      ar: "الشركة الأردنية للتجهيزات المخبرية المتطورة",
    } satisfies L,
    descriptor: {
      en: "Medical & laboratory equipment, consumables and complete laboratory fit-outs",
      ar: "أجهزة ومستهلكات طبية ومخبرية، وتجهيز المختبرات المتكاملة",
    } satisfies L,
    /**
     * Official logo artwork, extracted from the brand sheet and repainted with
     * the exact brand hex values (shapes unchanged). Replace these PNGs with the
     * master vector files (SVG) when available — same names, same aspect.
     */
    logo: {
      full: { src: "/brand/logo-full.png", width: 1004, height: 308 },
      fullReversed: { src: "/brand/logo-full-reversed.png", width: 1004, height: 308 },
      mark: { src: "/brand/logo-mark.png", width: 271, height: 308 },
      markReversed: { src: "/brand/logo-mark-reversed.png", width: 271, height: 308 },
    },
  },

  contact: {
    /** REPLACE — all of the following. Format phone numbers in E.164 for links. */
    phoneDisplay: "+000 00 000 0000",
    phoneHref: "+000000000000",
    whatsappNumber: "000000000000", // digits only, international format, no "+"
    email: "info@example.com",
    salesEmail: "sales@example.com",
    address: {
      en: "Street, District, Amman, Jordan", // REPLACE — street/district
      ar: "الشارع، الحي، عمّان، الأردن",
    } satisfies L,
    hours: {
      en: "Sunday – Thursday, 8:00 – 17:00", // REPLACE
      ar: "الأحد – الخميس، 8:00 – 17:00",
    } satisfies L,
    /** REPLACE — a Google Maps / OpenStreetMap share link for the office. */
    mapUrl: null as string | null,
  },

  social: {
    /** REPLACE or leave empty. Only filled entries are rendered. */
    linkedin: "",
    instagram: "",
    x: "",
  },
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

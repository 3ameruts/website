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
  demoMode: false,

  /** REPLACE — production URL, used for canonical links, sitemap and Open Graph. */
  // Temporary Cloudflare address until the company domain is connected.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jor-advanced.young-lake-be44.workers.dev",

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
    /** Phone numbers in E.164 for links. Temporary number — client will confirm. */
    phoneDisplay: "+962 7 8662 9939",
    phoneHref: "+962786629939",
    whatsappNumber: "962786629939", // digits only, no "+"
    /** Set when the company mailboxes exist (e.g. "Info@JorAdvanced.com"). Hidden while null. */
    email: null as string | null,
    salesEmail: null as string | null,
    address: {
      en: "Prince Faisal Bin Al-Hussein Street, Fuheis, Amman, Jordan",
      ar: "شارع الأمير فيصل بن الحسين، الفحيص، عمّان، الأردن",
    } satisfies L,
    /** Opening hours — hidden while null. */
    hours: null as L | null,
    /**
     * Office location (building pin by coordinates only — no business listing).
     * Used for the contact-page map and "Open in maps" links.
     */
    geo: { lat: 32.0220711, lng: 35.7996477 } as { lat: number; lng: number } | null,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=32.0220711,35.7996477" as string | null,
  },

  social: {
    /** REPLACE or leave empty. Only filled entries are rendered. */
    linkedin: "",
    instagram: "",
    x: "",
  },
} as const;

/** Google Maps embed for the office pin (no API key needed). */
export function mapEmbedUrl(locale: string) {
  const g = site.contact.geo;
  return g ? `https://www.google.com/maps?q=${g.lat},${g.lng}&z=17&hl=${locale}&output=embed` : null;
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

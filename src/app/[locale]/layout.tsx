import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { isLocale, localeMeta, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollGauge } from "@/components/layout/ScrollGauge";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  preload: true,
  display: "swap",
});
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-arabic",
  // Arabic glyphs load only when Arabic text renders (unicode-range); no preload on English pages.
  preload: false,
  display: "swap",
});

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: site.colors.navy,
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(site.url),
    applicationName: site.brand.name[locale],
    formatDetection: { telephone: false, email: false, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { dir, htmlLang } = localeMeta[locale];

  return (
    <html lang={htmlLang} dir={dir} className={`${jakarta.variable} ${plexArabic.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed start-4 top-4 z-[100] -translate-y-24 bg-navy px-4 py-3 text-white focus:translate-y-0"
        >
          {dict.skipToContent}
        </a>
        <MotionProvider>
          <Header locale={locale} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale} dict={dict} />
          <ScrollGauge label={dict.gauge.label} />
          <WhatsAppFloat locale={locale} />
        </MotionProvider>
        <JsonLd data={organizationJsonLd(locale)} />
      </body>
    </html>
  );
}

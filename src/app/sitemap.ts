import type { MetadataRoute } from "next";
import { locales, localeMeta } from "@/i18n/config";
import { site } from "@/content/site";

const paths = ["/", "/about", "/products", "/laboratory-solutions", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.flatMap((path) =>
    locales.map((locale) => {
      const url = (l: string) => `${site.url}/${l}${path === "/" ? "" : path}`;
      return {
        url: url(locale),
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "/" ? 1 : 0.8,
        alternates: { languages: { ...Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, url(l)])), "x-default": url("en") } },
      };
    }),
  );
}

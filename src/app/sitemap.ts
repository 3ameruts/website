import type { MetadataRoute } from "next";
import { locales, localeMeta } from "@/i18n/config";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const paths = ["/", "/about", "/products", "/laboratory-solutions", "/projects", "/contact", ...projects.filter((p) => !p.demo).map((p) => `/projects/${p.slug}`)]; // demo case studies are noindex

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.flatMap((path) =>
    locales.map((locale) => {
      const url = (l: string) => `${site.url}/${l}${path === "/" ? "" : path}`;
      return {
        url: url(locale),
        lastModified: now,
        changeFrequency: path.startsWith("/projects/") ? "yearly" : "monthly",
        priority: path === "/" ? 1 : path.startsWith("/projects/") ? 0.5 : 0.8,
        alternates: { languages: Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, url(l)])) },
      };
    }),
  );
}

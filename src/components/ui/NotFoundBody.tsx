"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { site } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";

/** Both languages, with the visitor's current locale first. */
export function NotFoundBody() {
  const pathname = usePathname() ?? "";
  const first: "en" | "ar" = pathname.startsWith("/ar") ? "ar" : "en";
  const order: ("en" | "ar")[] = first === "ar" ? ["ar", "en"] : ["en", "ar"];
  // Nested not-found pages can't export metadata in Next 16, so set the tab title here.
  useEffect(() => {
    document.title = `${getDictionary(first).notFound.metaTitle} | ${site.brand.name[first]}`;
  }, [first]);
  return (
    <div className="frame grid gap-14 md:grid-cols-2">
      {order.map((l, i) => {
        const d = getDictionary(l).notFound;
        const Heading = i === 0 ? "h1" : "p";
        return (
          <div key={l} lang={l} dir={l === "ar" ? "rtl" : "ltr"} className={l === "ar" ? "font-[family-name:var(--font-arabic)]" : ""}>
            <p className="t-label tabular">404</p>
            <Heading className="t-h2 mt-4 max-w-[20ch]">{d.title}</Heading>
            <p className="mt-5 max-w-[44ch] text-white/80">{d.body}</p>
            <Link href={`/${l}`} className="btn btn-light mt-8">
              {d.home}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { solutions } from "@/content/solutions";
import { lp } from "@/lib/i18n";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Product categories as an image mosaic.
 * Grid: 4 columns on desktop — the first category spans 2×2, the other 12 fill
 * the remaining 12 cells exactly (4 full rows). Two columns below lg.
 *
 * - variant "compact" (home): image + title, links to the category on the Products page.
 * - variant "detailed" (products page): image + title + description, links to the
 *   quote form with the category preselected.
 */
export function CategoryMosaic({
  locale,
  variant,
  ctaLabel,
}: {
  locale: Locale;
  variant: "compact" | "detailed";
  ctaLabel: string;
}) {
  const detailed = variant === "detailed";
  return (
    <ul
      className={`grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 ${
        detailed ? "auto-rows-[15rem] sm:auto-rows-[17rem] lg:auto-rows-[19rem]" : "auto-rows-[11rem] sm:auto-rows-[13rem] lg:auto-rows-[15rem]"
      }`}
    >
      {solutions.map((c, i) => {
        const featured = i === 0;
        const href = detailed
          ? `${lp(locale, "/contact")}?interest=${c.id}#quote`
          : `${lp(locale, "/products")}#${c.id}`;
        return (
          <li
            key={c.id}
            id={detailed ? c.id : undefined}
            className={`scroll-mt-28 ${featured ? "col-span-2 lg:row-span-2" : ""} ${detailed && !featured ? "max-sm:col-span-2" : ""}`}
          >
            <Link
              href={href}
              className="group relative isolate flex h-full flex-col justify-end overflow-hidden bg-navy text-white"
            >
              <Image
                src={c.image}
                alt=""
                fill
                quality={70}
                sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="-z-20 object-cover transition-[scale] duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
              />
              {/* legibility scrim, deepens on hover */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(8_34_79/0.92)_0%,rgb(8_34_79/0.45)_45%,rgb(8_34_79/0.05)_75%)] transition-opacity duration-500 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/25"
              />

              <span className={`relative block p-4 sm:p-5 ${featured ? "lg:p-8" : ""}`}>
                <span
                  className={`block font-semibold leading-tight ${
                    featured ? "text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[1.1]" : "text-lg sm:text-xl"
                  }`}
                >
                  {c.title[locale]}
                </span>
                {(detailed || featured) && (
                  <span
                    className={`mt-2 block max-w-[46ch] text-sm leading-relaxed text-white/80 ${
                      detailed ? "" : "max-lg:hidden"
                    } ${featured ? "lg:text-base" : ""}`}
                  >
                    {c.summary[locale]}
                  </span>
                )}
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-light">
                  {detailed ? ctaLabel : <span className="sr-only">{ctaLabel}</span>}
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </span>
              </span>

              {/* brand band rises on hover */}
              <span aria-hidden className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                <span className="band band-light block h-1.5!" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

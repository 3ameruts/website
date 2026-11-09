"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { solutions } from "@/content/solutions";
import { lp } from "@/lib/i18n";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Typographic index of the eight solution areas.
 * Pointer/keyboard: hovering or focusing a row swaps the sticky preview image.
 * Touch / small screens: each row has its own inline image; no hover required.
 */
export function SolutionsIndex({ locale, cta, ctaLab }: { locale: Locale; cta: string; ctaLab: string }) {
  const [active, setActive] = useState(0);
  const pending = useRef<number | null>(null);

  const select = (i: number) => {
    if (pending.current) window.clearTimeout(pending.current);
    pending.current = window.setTimeout(() => setActive(i), 90);
  };
  useEffect(() => () => {
    if (pending.current) window.clearTimeout(pending.current);
  }, []);

  return (
    <div className="grid-12 gap-y-0">
      <ul className="col-span-4 border-t border-line md:col-span-7" onMouseLeave={() => select(active)}>
        {solutions.map((s, i) => {
          const href = s.href === "/products" ? `${lp(locale, "/products")}?category=${s.id}` : lp(locale, s.href);
          return (
            <li key={s.id} className="border-b border-line">
              <Link
                href={href}
                onMouseEnter={() => select(i)}
                onFocus={() => setActive(i)}
                className="group grid grid-cols-[1fr_auto] items-start gap-x-6 py-6 md:py-7"
              >
                <span>
                  <span
                    className={`t-h2 block transition-colors duration-300 ${active === i ? "md:text-navy" : "md:text-navy/60"} group-hover:text-navy`}
                  >
                    {s.title[locale]}
                  </span>
                  <span className="mt-3 block max-w-[54ch] text-slate">{s.summary[locale]}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-ink">
                    {s.href === "/products" ? cta : ctaLab}
                    <Arrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </span>
                </span>
                {/* inline image on small screens */}
                <span className="relative mt-1 block aspect-square w-20 overflow-hidden bg-gray md:hidden">
                  <Image src={s.image} alt="" fill sizes="80px" className="object-cover" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="relative hidden md:col-span-4 md:col-start-9 md:block" aria-hidden>
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden bg-gray">
            {solutions.map((s, i) => (
              <Image
                key={s.id}
                src={s.image}
                alt=""
                fill
                sizes="32vw"
                quality={70}
                className={`object-cover transition-[opacity,scale] duration-700 ease-[var(--ease-out-expo)] ${
                  active === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0">
              <div className="band band-light" />
            </div>
          </div>
          <p className="t-small mt-4 text-slate">{solutions[active].imageAlt[locale]}</p>
        </div>
      </div>
    </div>
  );
}

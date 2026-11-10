"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Chapter = { id: string; label: string; start: number; theme: "light" | "dark" };
type Lenisish = { scrollTo: (target: Element | number, opts?: { offset?: number }) => void };

/**
 * The signature device: a graduated scale on the inline-end edge.
 * Its "liquid" level is the reading progress; its major ticks are the page's
 * chapters (sections marked with data-chapter) and are clickable.
 * Desktop only (≥1280px), and only on pages that declare chapters.
 */
export function ScrollGauge({ label }: { label: string }) {
  const pathname = usePathname();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [active, setActive] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const fillRef = useRef<HTMLDivElement>(null);
  const themeBands = useRef<{ top: number; bottom: number; theme: "light" | "dark" }[]>([]);

  useEffect(() => {
    const measure = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (els.length < 3 || total <= 0) return setChapters([]);
      themeBands.current = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]")).map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, theme: el.dataset.theme === "dark" ? "dark" : "light" };
      });
      setChapters(
        els.map((el) => ({
          id: el.id,
          label: el.dataset.chapter ?? "",
          start: Math.min(1, Math.max(0, (el.getBoundingClientRect().top + window.scrollY) / total)),
          theme: el.dataset.theme === "light" ? "light" : "dark",
        })),
      );
    };
    const t = window.setTimeout(measure, 120);
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    return () => {
      window.clearTimeout(t);
      ro.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!chapters.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? window.scrollY / total : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
      let idx = 0;
      chapters.forEach((c, i) => {
        if (p + 0.0001 >= c.start - 0.02) idx = i;
      });
      setActive(idx);
      // Theme under the gauge, from cached document positions (no layout reads per frame).
      const mid = window.scrollY + window.innerHeight / 2;
      let th: "light" | "dark" = "light";
      for (const b of themeBands.current) if (b.top <= mid && b.bottom >= mid) th = b.theme;
      setTheme(th);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [chapters]);

  if (!chapters.length) return null;

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: Lenisish }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -8 });
    else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };

  const dark = theme === "dark";
  const minor = Array.from({ length: 41 }, (_, i) => i / 40);

  return (
    <nav
      aria-label={label}
      className={`pointer-events-none fixed inset-y-0 end-5 z-30 hidden items-center transition-colors duration-500 xl:flex ${dark ? "text-white" : "text-navy"}`}
    >
      <div className="pointer-events-auto relative h-[56vh] w-10">
        {/* track + liquid */}
        <div aria-hidden className={`absolute inset-y-0 end-0 w-[3px] ${dark ? "bg-white/20" : "bg-navy/15"}`}>
          <div ref={fillRef} className="absolute inset-0 origin-top bg-teal" style={{ transform: "scaleY(0)" }} />
        </div>
        {/* minor graduations */}
        {minor.map((p, i) => (
          <span
            key={i}
            aria-hidden
            className={`absolute end-0 h-px ${i % 5 === 0 ? "w-3" : "w-1.5"} ${dark ? "bg-white/45" : "bg-navy/35"}`}
            style={{ top: `${p * 100}%` }}
          />
        ))}
        {/* chapters */}
        <ol>
          {chapters.map((c, i) => (
            <li key={c.id} className="absolute end-0 -translate-y-1/2" style={{ top: `${c.start * 100}%` }}>
              <button
                type="button"
                onClick={() => go(c.id)}
                aria-current={i === active ? "location" : undefined}
                className="group flex items-center gap-3 py-1.5 ps-2"
              >
                <span
                  className={`whitespace-nowrap text-xs font-semibold transition-all duration-300 ${
                    i === active
                      ? "opacity-100"
                      : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 rtl:-translate-x-1"
                  }`}
                >
                  {c.label}
                </span>
                <span
                  aria-hidden
                  className={`h-[2px] transition-all duration-300 ${i === active ? "w-6 bg-teal" : `w-4 ${dark ? "bg-white" : "bg-navy"}`}`}
                />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

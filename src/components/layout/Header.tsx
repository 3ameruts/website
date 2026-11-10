"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { lp, switchLocalePath } from "@/lib/i18n";
import { Logo } from "./Logo";

type Lenisish = { stop: () => void; start: () => void };

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // The menu is "open at" a pathname: navigating elsewhere closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = useCallback((v: boolean | ((o: boolean) => boolean)) => {
    setOpenAt((cur) => {
      const was = cur !== null;
      const next = typeof v === "function" ? v(was) : v;
      return next ? window.location.pathname : null;
    });
  }, []);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const nav = [
    { href: lp(locale, "/about"), label: dict.nav.about },
    { href: lp(locale, "/products"), label: dict.nav.products },
    { href: lp(locale, "/laboratory-solutions"), label: dict.nav.labSolutions },
    { href: lp(locale, "/projects"), label: dict.nav.projects },
    { href: lp(locale, "/contact"), label: dict.nav.contact },
  ];
  const otherLocale: Locale = locale === "en" ? "ar" : "en";
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Solid header after leaving the hero; hide on scroll-down at ≥1024px only.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      // Direction threshold: smooth-scroll easing emits tiny deltas that must not flip the state.
      if (Math.abs(y - last) < 8) return;
      const wide = window.innerWidth >= 1024;
      setHidden(wide && y > 320 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, [setOpen]);

  // Mobile menu: lock scroll, trap focus, Escape closes.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenisish }).__lenis;
    if (!open) {
      document.body.style.overflow = "";
      lenis?.start();
      return;
    }
    document.body.style.overflow = "hidden";
    lenis?.stop();
    const panel = panelRef.current;
    // The close (toggle) button lives in the header, above the panel: include it in the cycle.
    const focusables = () =>
      [
        toggleRef.current,
        ...Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
      ].filter((el): el is HTMLElement => Boolean(el));
    focusables()[1]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const lastEl = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const solid = scrolled && !open;

  return (
    <>
      <header
        // Keyboard users: never leave a focused link hidden off-screen (WCAG 2.4.11).
        onFocus={() => setHidden(false)}
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[translate,transform,background-color,box-shadow,color] duration-500 ease-[var(--ease-out-expo)]",
          hidden && !open ? "-translate-y-full" : "",
          solid
            ? "bg-white text-navy shadow-[0_1px_0_var(--color-line)]"
            : "bg-transparent text-white on-dark",
        ].join(" ")}
      >
        {!solid && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 h-40 bg-[linear-gradient(to_bottom,rgb(8_34_79/0.55),transparent)]"
          />
        )}
        <div className="frame flex h-[var(--header-h)] items-center justify-between gap-6 lg:h-[5.25rem]">
          <Link
            href={lp(locale)}
            className="relative z-10 block shrink-0"
            aria-label={dict.nav.home}
          >
            <Logo
              locale={locale}
              reversed={!solid}
              preload
              className="h-10 w-auto lg:h-12"
              sizes="(min-width: 1024px) 160px, 132px"
            />
          </Link>

          <nav aria-label={dict.nav.primary} className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative block px-3 py-2 text-[0.95rem] font-medium"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={[
                        "absolute inset-x-3 bottom-0.5 h-[2px] origin-[0%_50%] bg-teal transition-transform duration-500 ease-[var(--ease-out-expo)] rtl:origin-[100%_50%]",
                        isActive(item.href)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      ].join(" ")}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={switchLocalePath(pathname, otherLocale)}
              hrefLang={otherLocale}
              lang={otherLocale}
              title={dict.nav.switchToLabel}
              onClick={(e) => {
                try {
                  document.cookie = `NEXT_LOCALE=${otherLocale};path=/;max-age=31536000;samesite=lax`;
                } catch {}
                // Keep ?query and #hash (e.g. a preselected quote category) when switching language.
                const { search, hash } = window.location;
                if (search || hash) {
                  e.preventDefault();
                  router.push(`${switchLocalePath(pathname, otherLocale)}${search}${hash}`);
                }
              }}
              className="grid h-10 min-w-10 place-items-center px-2 text-[0.95rem] font-semibold"
            >
              {dict.nav.switchTo}
            </Link>
            <Link
              href={lp(locale, "/contact#quote")}
              className={`btn btn-sm hidden sm:inline-flex ${solid ? "" : "btn-light"}`}
            >
              {dict.nav.requestQuote}
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="relative z-10 grid h-11 w-11 place-items-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? dict.nav.close : dict.nav.menu}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={`absolute inset-x-0 top-0 h-[2px] bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-[2px] bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="on-dark fixed inset-0 z-40 flex flex-col bg-navy pt-[var(--header-h)] text-white lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label={dict.nav.menu}
      >
        <nav
          aria-label={dict.nav.primary}
          className="frame flex-1 overflow-y-auto py-8"
        >
          <ul className="space-y-1">
            <li>
              <Link
                href={lp(locale)}
                className="block py-2 text-3xl font-semibold"
                aria-current={pathname === lp(locale) ? "page" : undefined}
              >
                {dict.nav.home}
              </Link>
            </li>
            {nav.map((item, i) => (
              <li
                key={item.href}
                style={{ animationDelay: `${60 + i * 50}ms` }}
                className="page-enter"
              >
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between border-b border-white/15 py-4 text-3xl font-semibold aria-[current=page]:text-teal-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="frame pb-8">
          <Link
            href={lp(locale, "/contact#quote")}
            className="btn btn-light w-full"
          >
            {dict.nav.requestQuote}
          </Link>
        </div>
        <div className="band band-light" aria-hidden />
      </div>
    </>
  );
}

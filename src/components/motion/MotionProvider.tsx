"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Motion system root.
 * - Smooth scrolling (Lenis) only when the user has not asked for reduced motion.
 * - Lenis drives ScrollTrigger so scroll-linked motion stays in sync.
 * - `.fill-reveal` images "fill" upward once when they enter the viewport.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    document.documentElement.classList.add("js-motion");

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.95 });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let alive = true;
    const teardown = () => {
      if (!alive) return;
      alive = false;
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      document.documentElement.classList.remove("js-motion");
    };
    const onChange = () => {
      if (reduce.matches) teardown();
    };
    reduce.addEventListener("change", onChange);
    return () => {
      reduce.removeEventListener("change", onChange);
      teardown();
    };
  }, []);

  // Route change: back to top + re-measure triggers; arm image reveals on the new page.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (!window.location.hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }
    if (!document.documentElement.classList.contains("js-motion")) return;

    const images = Array.from(document.querySelectorAll<HTMLElement>(".fill-reveal:not([data-reveal='done'])"));
    const reveal = (el: HTMLElement) => {
      el.dataset.reveal = "running";
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "expo.out",
          onComplete: () => {
            el.dataset.reveal = "done";
            el.style.clipPath = "";
          },
        },
      );
      const img = el.querySelector("img, video");
      if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: "expo.out" });
    };
    // Only hide images still below the fold — never content already on screen.
    images.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) el.dataset.reveal = "pending";
    });
    // Position check rather than IntersectionObserver: a fast jump (anchor, gauge)
    // can carry an element past the viewport without an intersection change,
    // so anything at or above the reveal line is revealed.
    let raf = 0;
    const check = () => {
      raf = 0;
      const line = window.innerHeight * 0.88;
      images.forEach((el) => {
        if (el.dataset.reveal === "pending" && el.getBoundingClientRect().top < line) reveal(el);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(refresh);
      images.forEach((el) => {
        if (el.dataset.reveal === "pending" || el.dataset.reveal === "running") delete el.dataset.reveal;
        el.style.clipPath = "";
      });
    };
  }, [pathname]);

  return <>{children}</>;
}

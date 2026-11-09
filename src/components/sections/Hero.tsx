"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useMediaQuery, useSaveData } from "@/lib/use-media";
import { Arrow } from "@/components/ui/Arrow";

type Props = {
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  scrollLabel: string;
  playLabel: string;
  pauseLabel: string;
  chapter: string;
};

type VideoSrc = { mp4: string; webm?: string; poster: string };
const VIDEO: { desktop: VideoSrc; mobile: VideoSrc } = {
  desktop: { mp4: "/media/video/hero-desktop.mp4", webm: "/media/video/hero-desktop.webm", poster: "/media/img/hero-poster.jpg" },
  mobile: { mp4: "/media/video/hero-mobile.mp4", poster: "/media/img/hero-poster-mobile.jpg" },
};

/** Split into words, each wrapped in a mask, so lines rise in without breaking Arabic letter joins. */
function MaskedWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} data-hero-word style={{ "--i": i } as React.CSSProperties} className="inline-block overflow-hidden pb-[0.08em] align-top">
          <span className="inline-block will-change-transform">{word}</span>
          {" "}
        </span>
      ))}
    </>
  );
}

export function Hero({ title, body, primary, secondary, scrollLabel, playLabel, pauseLabel, chapter }: Props) {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobile = useMediaQuery("(max-width: 767px) and (orientation: portrait)");
  const saveData = useSaveData();
  const allowVideo = saveData === false;
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !allowVideo || mobile === null) return;
    // Reduced motion: keep the poster; the video loads only if the visitor presses play.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.load();
    v.play().catch(() => {
      /* autoplay blocked — poster remains, play control is available */
    });
  }, [mobile, allowVideo]);

  // Entrance is CSS (globals.css). GSAP only adds the gentle scroll parallax.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-hero-media]", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  };

  const src = mobile ? VIDEO.mobile : VIDEO.desktop;

  return (
    <section
      ref={root}
      id="top"
      data-chapter={chapter}
      data-theme="dark"
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-[max(640px,100svh)] flex-col justify-end overflow-hidden bg-navy pt-[calc(var(--header-h)+2rem)] text-white"
    >
      <div data-hero-media className="absolute inset-0 -z-10 scale-[1.06]">
        {/* Poster renders immediately (and is all that shows with Save-Data). */}
        <picture>
          <source media="(max-width: 767px) and (orientation: portrait)" srcSet={VIDEO.mobile.poster} />
          <img src={VIDEO.desktop.poster} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        {allowVideo && mobile !== null && (
          <video
            ref={videoRef}
            key={mobile ? "m" : "d"}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            poster={src.poster}
            aria-hidden
            tabIndex={-1}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            {src.webm && <source src={src.webm} type="video/webm" />}
            <source src={src.mp4} type="video/mp4" />
          </video>
        )}
      </div>
      {/* Legibility scrim: navy from the bottom and the reading side. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(8_34_79/0.92)_0%,rgb(8_34_79/0.55)_38%,rgb(8_34_79/0.05)_62%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy/35 md:hidden" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(8_34_79/0.55),transparent_60%)] rtl:bg-[linear-gradient(to_left,rgb(8_34_79/0.55),transparent_60%)]"
      />

      <div className="frame grid-12 pb-16 md:pb-20">
        <div className="col-span-4 md:col-span-10 xl:col-span-9">
          <h1 id="hero-title" className="t-display">
            <MaskedWords text={title} />
          </h1>
          <p data-hero-fade style={{ "--i": 0 } as React.CSSProperties} className="t-lead mt-7 max-w-[52ch] text-white/85">
            {body}
          </p>
          <div data-hero-fade style={{ "--i": 1 } as React.CSSProperties} className="mt-9 flex flex-wrap gap-3">
            <Link href={primary.href} className="btn btn-light">
              {primary.label}
              <Arrow />
            </Link>
            <Link href={secondary.href} className="btn btn-outline">
              {secondary.label}
            </Link>
          </div>
        </div>

        {/* Scroll cue: the gauge in miniature */}
        <div
          data-hero-fade
          style={{ "--i": 2 } as React.CSSProperties}
          className="col-span-4 mt-12 flex items-end justify-between md:col-span-2 md:col-start-11 md:mt-0 md:flex-col md:items-end md:justify-end md:gap-8"
        >
          <button
            type="button"
            onClick={toggle}
            className="flex h-11 items-center gap-2 text-sm text-white/80 hover:text-white"
            aria-label={playing ? pauseLabel : playLabel}
          >
            <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full border border-white/40">
              {playing ? (
                <svg viewBox="0 0 10 10" width="10" height="10"><path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" /></svg>
              ) : (
                <svg viewBox="0 0 10 10" width="10" height="10" className="rtl:-scale-x-100"><path d="M2 1l7 4-7 4z" fill="currentColor" /></svg>
              )}
            </span>
          </button>
          <a href="#intro" className="group flex items-end gap-3 text-sm text-white/80 hover:text-white">
            <span>{scrollLabel}</span>
            <span data-hero-scale aria-hidden className="flex h-14 flex-col justify-between">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  style={{ "--i": i } as React.CSSProperties}
                  className={`block h-px origin-[100%_50%] bg-current rtl:origin-[0%_50%] ${i === 7 ? "w-5 bg-teal" : i % 4 === 0 ? "w-4" : "w-2"}`}
                />
              ))}
            </span>
          </a>
        </div>
      </div>
      <div className="band band-light" aria-hidden />
    </section>
  );
}

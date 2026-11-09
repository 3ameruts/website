"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery, useSaveData } from "@/lib/use-media";

/**
 * Decorative looping background video.
 * - Not loaded at all with reduced motion or Save-Data (the poster image shows).
 * - Always has a visible pause/play control (WCAG 2.2.2).
 */
export function AmbientVideo({ src, poster, playLabel, pauseLabel }: { src: string; poster: string; playLabel: string; pauseLabel: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const saveData = useSaveData();
  const enabled = reduce === false && saveData === false;
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || !enabled) return;
    v.play().catch(() => {});
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={() => {
          const v = ref.current;
          if (!v) return;
          if (v.paused) v.play().catch(() => {});
          else v.pause();
        }}
        aria-label={playing ? pauseLabel : playLabel}
        className="absolute bottom-8 end-[var(--margin)] z-10 grid h-11 w-11 place-items-center text-white/85 hover:text-white"
      >
        <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full border border-white/50">
          {playing ? (
            <svg viewBox="0 0 10 10" width="10" height="10"><path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 10 10" width="10" height="10" className="rtl:-scale-x-100"><path d="M2 1l7 4-7 4z" fill="currentColor" /></svg>
          )}
        </span>
      </button>
    </>
  );
}

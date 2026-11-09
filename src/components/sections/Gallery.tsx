"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Img = { src: string; alt: string };

/** Editorial gallery + accessible lightbox (dialog, focus return, arrows, Escape). */
export function Gallery({ images, locale }: { images: Img[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const labels = {
    open: dict.projects.openImage,
    close: dict.common.close,
    previous: dict.common.previous,
    next: dict.common.next,
    title: dict.projects.gallery,
  };
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const rtl = typeof document !== "undefined" && document.documentElement.dir === "rtl";

  const open = (i: number, el: HTMLButtonElement) => {
    triggerRef.current = el;
    setIndex(i);
  };
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (index !== null && !dlg.open) dlg.showModal();
    if (index === null && dlg.open) {
      dlg.close();
      triggerRef.current?.focus();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step, rtl]);

  return (
    <>
      <ul className="grid-12 gap-y-[var(--gutter)]">
        {images.map((img, i) => (
          <li key={img.src + i} className={i % 3 === 0 ? "col-span-4 md:col-span-12" : "col-span-4 md:col-span-6"}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className={`group relative block w-full overflow-hidden bg-gray ${i % 3 === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}
              aria-label={`${labels.open(i + 1)}: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes={i % 3 === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                quality={70}
                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              />
            </button>
            <p className="t-small mt-3 text-slate">{img.alt}</p>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === dialogRef.current && close()}
        aria-label={labels.title}
        className="on-dark m-0 h-full max-h-none w-full max-w-none bg-navy/97 p-0 text-white backdrop:bg-navy/80"
      >
        {index !== null && (
          <div className="flex h-full flex-col">
            <div className="frame flex items-center justify-between py-4">
              <p className="tabular text-sm text-white/80" aria-live="polite">
                {index + 1} / {images.length}
              </p>
              <button type="button" onClick={close} className="btn btn-sm btn-outline" autoFocus>
                {labels.close}
              </button>
            </div>
            <figure className="relative mx-[var(--margin)] flex-1">
              <Image src={images[index].src} alt={images[index].alt} fill sizes="100vw" quality={80} className="object-contain" />
            </figure>
            <div className="frame flex items-center justify-between gap-4 py-5">
              <button type="button" onClick={() => step(-1)} className="btn btn-sm btn-outline">
                {labels.previous}
              </button>
              <p className="t-small hidden text-center text-white/80 sm:block">{images[index].alt}</p>
              <button type="button" onClick={() => step(1)} className="btn btn-sm btn-outline">
                {labels.next}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

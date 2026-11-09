"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Step = { title: string; body: string; image: string };

/**
 * Six stages — a true sequence, so they are numbered.
 * Desktop: a sticky image swaps as each stage reaches the middle of the screen.
 * Mobile: each stage carries its own image.
 */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid-12">
      <div className="relative hidden md:col-span-6 md:block" aria-hidden>
        <div className="sticky top-[12vh] h-[76vh] overflow-hidden bg-gray">
          {steps.map((s, i) => (
            <Image
              key={s.image}
              src={s.image}
              alt=""
              fill
              sizes="50vw"
              quality={70}
              className={`object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)] ${
                i === active ? "scale-100 opacity-100" : "scale-[1.05] opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-[linear-gradient(to_top,rgb(8_34_79/0.8),transparent)] p-6 text-white">
            <span className="tabular text-5xl font-semibold">{String(active + 1).padStart(2, "0")}</span>
            <span className="tabular text-sm text-white/80">/ {String(steps.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      <ol className="col-span-4 md:col-span-5 md:col-start-8">
        {steps.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className="flex min-h-[auto] flex-col justify-center border-t border-line py-10 md:min-h-[76vh] md:py-0"
          >
            <div className="relative mb-6 aspect-[16/10] overflow-hidden bg-gray md:hidden">
              <Image src={s.image} alt="" fill sizes="100vw" quality={70} className="object-cover" />
            </div>
            <p className={`tabular text-sm font-semibold transition-colors ${i === active ? "text-teal-ink" : "text-slate"}`}>
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="t-h2 mt-3">{s.title}</h3>
            <p className="t-lead mt-5 max-w-[44ch] text-slate">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

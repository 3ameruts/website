import type { Locale } from "@/i18n/config";
import { home } from "@/content/pages";
import { Media } from "@/components/ui/Media";

/** Dark chapter: full-bleed vertical panels, one idea each. */
export function Showcase({ locale }: { locale: Locale }) {
  const c = home.showcase;
  return (
    <section
      id="showcase"
      data-chapter={c.title[locale]}
      data-theme="dark"
      aria-labelledby="showcase-title"
      className="on-dark bg-navy pt-[var(--section)] text-white"
    >
      <div className="frame grid-12">
        <h2 id="showcase-title" className="t-h1 col-span-4 md:col-span-8">
          {c.title[locale]}
        </h2>
      </div>
      <ol className="mt-14 space-y-3 md:mt-20 md:space-y-4">
        {c.panels.map((p, i) => (
          <li key={p.image} className="relative">
            <figure className="relative">
              <Media
                src={p.image}
                alt={p.alt[locale]}
                sizes="100vw"
                reveal
                className="h-[78svh] min-h-[460px] w-full md:h-[88svh]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(8_34_79/0.85),rgb(8_34_79/0.15)_45%,transparent_70%)]"
              />
              <figcaption className="frame absolute inset-x-0 bottom-0 grid-12 pb-10 md:pb-16">
                <div className="col-span-4 md:col-span-6">
                  <p className="t-label tabular" aria-hidden>
                    {String(i + 1).padStart(2, "0")} / {String(c.panels.length).padStart(2, "0")}
                  </p>
                  <h3 className="t-h2 mt-3">{p.title[locale]}</h3>
                  <p className="t-lead mt-4 max-w-[44ch] text-white/85">{p.body[locale]}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
      <div className="h-3 md:h-4" aria-hidden />
    </section>
  );
}

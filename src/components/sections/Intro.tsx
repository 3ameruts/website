import type { Locale } from "@/i18n/config";
import { home } from "@/content/pages";
import { Media } from "@/components/ui/Media";

export function Intro({ locale }: { locale: Locale }) {
  const c = home.intro;
  return (
    <section
      id="intro"
      data-chapter={c.label[locale]}
      data-theme="light"
      aria-labelledby="intro-title"
      className="section-y bg-white"
    >
      <div className="frame grid-12 gap-y-10">
        <p className="t-label col-span-4 md:col-span-3">{c.label[locale]}</p>
        <h2 id="intro-title" className="t-h2 col-span-4 font-medium md:col-span-9 md:max-w-[26ch]">
          {c.statement[locale]}
        </h2>
      </div>

      <div className="frame grid-12 mt-16 gap-y-6 md:mt-24">
        <Media
          src="/media/img/facility-review.jpg"
          alt={locale === "en" ? "Engineers reviewing a laboratory facility" : "مهندسان يراجعان منشأة مخبرية"}
          sizes="(min-width: 768px) 58vw, 100vw"
          className="col-span-4 md:col-span-7"
          ratio="4 / 3"
          reveal
        />
        <div className="col-span-4 flex flex-col justify-end gap-6 md:col-span-4 md:col-start-9">
          <Media
            src="/media/img/microscopy-closeup.jpg"
            alt={locale === "en" ? "Specialist examining a sample under a microscope" : "مختص يفحص عيّنة تحت المجهر"}
            sizes="(min-width: 768px) 32vw, 100vw"
            ratio="4 / 5"
            reveal
          />
        </div>
      </div>

      <div className="frame mt-16 md:mt-24">
        <dl className="grid grid-cols-1 gap-x-[var(--gutter)] gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {c.columns.map((col) => (
            <div key={col.title.en}>
              <dt className="t-h3">{col.title[locale]}</dt>
              <dd className="mt-3 text-slate">{col.body[locale]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

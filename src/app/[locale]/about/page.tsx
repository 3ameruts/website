import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { about } from "@/content/pages";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { lp } from "@/lib/i18n";
import { PageHero } from "@/components/sections/PageHero";
import { Media } from "@/components/ui/Media";
import { SectionHead } from "@/components/ui/SectionHead";
import { JsonLd } from "@/components/ui/JsonLd";
import { Arrow } from "@/components/ui/Arrow";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: "/about", title: about.meta.title, description: about.meta.description });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  const a = about;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: dict.nav.home, url: lp(locale) }, { name: dict.nav.about, url: lp(locale, "/about") }])} />
      <PageHero
        title={a.hero.title[locale]}
        body={a.hero.body[locale]}
        image="/media/img/microscope-eyepiece.jpg"
        chapter={dict.nav.about}
        crumbs={[{ href: lp(locale), label: dict.nav.home }, { href: lp(locale, "/about"), label: dict.nav.about }]}
      />

      {/* Overview */}
      <section id="overview" data-chapter={a.overview.title[locale]} data-theme="light" className="section-y bg-white" aria-labelledby="overview-title">
        <div className="frame grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-6">
            <h2 id="overview-title" className="t-label">{a.overview.title[locale]}</h2>
            <div className="mt-6 space-y-6">
              {a.overview.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "t-h3 font-medium" : "t-lead text-slate"}>
                  {p[locale]}
                </p>
              ))}
            </div>
          </div>
          <Media
            src="/media/img/sample-slide.jpg"
            alt={locale === "en" ? "Specialist holding a microscope slide" : "مختص يحمل شريحة مجهرية"}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="col-span-4 md:col-span-5 md:col-start-8"
            ratio="4 / 5"
            reveal
          />
        </div>
      </section>

      {/* Vision & mission — two statements, set large */}
      <section id="vision" data-chapter={`${a.vision.title[locale]} · ${a.mission.title[locale]}`} data-theme="dark" className="on-dark section-y bg-navy text-white" aria-label={`${a.vision.title[locale]} / ${a.mission.title[locale]}`}>
        <div className="frame grid gap-16 md:grid-cols-2 md:gap-[var(--gutter)]">
          {[a.vision, a.mission].map((block) => (
            <div key={block.title.en} className="border-t-2 border-teal pt-8">
              <h2 className="t-label">{block.title[locale]}</h2>
              <p className="t-h2 mt-6 font-medium">{block.body[locale]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section id="values" data-chapter={a.values.title[locale]} data-theme="light" className="section-y bg-white" aria-labelledby="values-title">
        <div className="frame">
          <SectionHead id="values-title" title={a.values.title[locale]} />
          <dl className="mt-14 grid gap-x-[var(--gutter)] gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.items.map((v) => (
              <div key={v.title.en} className="border-t border-navy pt-6">
                <dt className="t-h3">{v.title[locale]}</dt>
                <dd className="mt-3 text-slate">{v.body[locale]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Quality commitment */}
      <section id="quality" data-chapter={a.quality.title[locale]} data-theme="light" className="section-y bg-gray" aria-labelledby="quality-title">
        <div className="frame grid-12 items-center gap-y-10">
          <div className="col-span-4 md:col-span-6">
            <Media src="/media/img/microscope-detail.jpg" alt={locale === "en" ? "Microscope objectives" : "عدسات مجهر"} sizes="(min-width: 768px) 48vw, 100vw" ratio="16 / 11" reveal />
          </div>
          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <h2 id="quality-title" className="t-h1">{a.quality.title[locale]}</h2>
            <p className="t-lead mt-6 text-slate">{a.quality.body[locale]}</p>
          </div>
        </div>
      </section>

      {/* Capabilities — a real sequence (consultation → service), so numbered */}
      <section id="capabilities" data-chapter={a.capabilities.title[locale]} data-theme="light" className="section-y bg-white" aria-labelledby="capabilities-title">
        <div className="frame">
          <SectionHead
            id="capabilities-title"
            title={a.capabilities.title[locale]}
            aside={
              <Link href={lp(locale, "/laboratory-solutions")} className="link inline-flex items-center gap-2 font-semibold">
                {dict.nav.labSolutions}
                <Arrow />
              </Link>
            }
          />
          <ol className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {a.capabilities.items.map((c, i) => (
              <li key={c.title.en} className="bg-white p-8 md:p-10">
                <span className="tabular text-sm font-semibold text-teal-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mt-6">{c.title[locale]}</h3>
                <p className="mt-3 text-slate">{c.body[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

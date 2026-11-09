import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { labPage } from "@/content/pages";
import { products } from "@/content/products";
import { site } from "@/content/site";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { lp } from "@/lib/i18n";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHead } from "@/components/ui/SectionHead";
import { JsonLd } from "@/components/ui/JsonLd";
import { Arrow } from "@/components/ui/Arrow";

export async function generateMetadata({ params }: PageProps<"/[locale]/laboratory-solutions">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: "/laboratory-solutions", title: labPage.meta.title, description: labPage.meta.description });
}

export default async function LabSolutionsPage({ params }: PageProps<"/[locale]/laboratory-solutions">) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  const packages = products.filter((p) => p.category === "setup");
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: labPage.meta.title[locale],
    description: labPage.meta.description[locale],
    provider: { "@id": `${site.url}/#organization` },
    serviceType: "Laboratory design, supply and installation",
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: dict.nav.home, url: lp(locale) }, { name: dict.nav.labSolutions, url: lp(locale, "/laboratory-solutions") }])} />
      <JsonLd data={service} />
      <PageHero
        title={labPage.hero.title[locale]}
        body={labPage.hero.body[locale]}
        video={{ src: "/media/video/lab-corridor.mp4", poster: "/media/img/lab-corridor-poster.jpg", playLabel: dict.common.playVideo, pauseLabel: dict.common.pauseVideo }}
        chapter={dict.nav.labSolutions}
        crumbs={[{ href: lp(locale), label: dict.nav.home }, { href: lp(locale, "/laboratory-solutions"), label: dict.nav.labSolutions }]}
      >
        <Link href={lp(locale, "/contact#quote")} className="btn btn-light mt-9">
          {dict.common.discussProject}
          <Arrow />
        </Link>
      </PageHero>

      <section id="process" data-chapter={labPage.processTitle[locale]} data-theme="light" aria-labelledby="process-title" className="section-y bg-white">
        <div className="frame">
          <SectionHead id="process-title" title={labPage.processTitle[locale]} />
          <div className="mt-14 md:mt-20">
            <ProcessSteps steps={labPage.steps.map((s) => ({ title: s.title[locale], body: s.body[locale], image: s.image }))} />
          </div>
        </div>
      </section>

      <section id="types" data-chapter={labPage.typesTitle[locale]} data-theme="light" aria-labelledby="types-title" className="section-y bg-gray">
        <div className="frame">
          <SectionHead id="types-title" title={labPage.typesTitle[locale]} />
          <ul className="mt-14 border-t border-navy/20">
            {packages.map((p) => (
              <li key={p.id} className="border-b border-navy/20">
                <Link
                  href={`${lp(locale, "/products")}?category=setup`}
                  className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-5 py-6 md:grid-cols-[8rem_minmax(0,1fr)_minmax(0,1.2fr)_auto] md:gap-8"
                >
                  <span className="relative block aspect-square overflow-hidden bg-white md:aspect-[4/3]">
                    <Image src={p.image} alt="" fill sizes="128px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </span>
                  <span className="t-h3">{p.name[locale]}</span>
                  <span className="col-span-3 hidden text-slate md:col-span-1 md:block">{p.summary[locale]}</span>
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-theme="dark" className="on-dark section-y bg-navy text-white" aria-labelledby="lab-cta">
        <div className="frame grid-12 gap-y-8">
          <h2 id="lab-cta" className="t-h1 col-span-4 md:col-span-7">{labPage.ctaTitle[locale]}</h2>
          <div className="col-span-4 self-end md:col-span-4 md:col-start-9">
            <p className="t-lead text-white/85">{labPage.ctaBody[locale]}</p>
            <Link href={lp(locale, "/contact#quote")} className="btn btn-light mt-8">
              {dict.common.discussProject}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

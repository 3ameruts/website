import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { home } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { lp } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { SolutionsIndex } from "@/components/sections/SolutionsIndex";
import { Showcase } from "@/components/sections/Showcase";
import { Commitments } from "@/components/sections/Commitments";
import { Partners } from "@/components/sections/Partners";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHead } from "@/components/ui/SectionHead";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: "/", title: home.meta.title, description: home.meta.description, absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero
        title={home.hero.title[locale]}
        body={home.hero.body[locale]}
        primary={{ href: lp(locale, "/contact#quote"), label: dict.common.requestQuote }}
        secondary={{ href: lp(locale, "/products"), label: dict.common.viewProducts }}
        scrollLabel={dict.common.scroll}
        playLabel={dict.common.playVideo}
        pauseLabel={dict.common.pauseVideo}
        chapter={dict.nav.home}
      />
      <Intro locale={locale} />
      <section
        id="solutions"
        data-chapter={home.solutions.title[locale]}
        data-theme="light"
        aria-labelledby="solutions-title"
        className="section-y border-t border-line bg-white"
      >
        <div className="frame">
          <SectionHead id="solutions-title" title={home.solutions.title[locale]} body={home.solutions.body[locale]} />
          <div className="mt-14 md:mt-20">
            <SolutionsIndex locale={locale} cta={dict.common.viewProducts} ctaLab={dict.nav.labSolutions} />
          </div>
        </div>
      </section>
      <Showcase locale={locale} />
      <Commitments locale={locale} />
      <Partners locale={locale} demoLabel={dict.common.demo} />
      <FeaturedProjects locale={locale} dict={dict} />
      <ContactSection
        locale={locale}
        dict={dict}
        title={home.contact.title[locale]}
        body={home.contact.body[locale]}
        chapter={dict.nav.contact}
      />
    </>
  );
}

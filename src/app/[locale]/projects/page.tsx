import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projectsPage } from "@/content/pages";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { lp } from "@/lib/i18n";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { JsonLd } from "@/components/ui/JsonLd";
import { DemoTag } from "@/components/ui/DemoTag";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: "/projects", title: projectsPage.meta.title, description: projectsPage.meta.description });
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: dict.nav.home, url: lp(locale) }, { name: dict.nav.projects, url: lp(locale, "/projects") }])} />
      <PageHero
        title={projectsPage.hero.title[locale]}
        body={projectsPage.hero.body[locale]}
        image="/media/img/lab-bench-microscopy.jpg"
        crumbs={[{ href: lp(locale), label: dict.nav.home }, { href: lp(locale, "/projects"), label: dict.nav.projects }]}
      >
        <DemoTag label={dict.common.demoHint} className="mt-6" />
      </PageHero>
      <section aria-label={dict.nav.projects} data-theme="light" className="section-y bg-white">
        <div className="frame">
          <ProjectsGrid locale={locale} />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projectBySlug, projects, projectSectors } from "@/content/projects";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { lp } from "@/lib/i18n";
import { PageHero } from "@/components/sections/PageHero";
import { Gallery } from "@/components/sections/Gallery";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { DemoTag } from "@/components/ui/DemoTag";
import { Arrow } from "@/components/ui/Arrow";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projectBySlug(slug);
  if (!isLocale(locale) || !project) return {};
  return {
    ...buildMetadata({ locale, path: `/projects/${slug}`, title: project.title, description: project.summary, image: project.cover }),
    // Demo case studies must not be indexed as real work.
    ...(project.demo ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  const project = projectBySlug(slug);
  if (!project) notFound();
  const dict = getDictionary(locale);
  const d = dict.projects;
  const others = projects.filter((p) => p.slug !== slug).slice(0, 2);
  const meta = [
    { k: d.client, v: project.client[locale] },
    { k: d.sector, v: projectSectors[project.sector][locale] },
    { k: d.location, v: project.location[locale] },
    { k: d.year, v: project.year },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.nav.home, url: lp(locale) },
          { name: dict.nav.projects, url: lp(locale, "/projects") },
          { name: project.title[locale], url: lp(locale, `/projects/${slug}`) },
        ])}
      />
      <PageHero
        title={project.title[locale]}
        body={project.summary[locale]}
        image={project.cover}
        crumbs={[
          { href: lp(locale), label: dict.nav.home },
          { href: lp(locale, "/projects"), label: dict.nav.projects },
          { href: lp(locale, `/projects/${slug}`), label: project.title[locale] },
        ]}
      >
        {project.demo && <DemoTag label={dict.common.demoHint} className="mt-6" />}
      </PageHero>

      <section data-theme="light" className="section-y bg-white" aria-labelledby="project-details">
        <div className="frame grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-4">
            <h2 id="project-details" className="sr-only">{dict.catalog.details}</h2>
            <dl className="divide-y divide-line border-y border-line">
              {meta.map((m) => (
                <div key={m.k} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
                  <dt className="t-label">{m.k}</dt>
                  <dd className="font-medium">{m.v}</dd>
                </div>
              ))}
              <div className="py-4">
                <dt className="t-label">{d.scope}</dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {project.scope.map((s) => (
                      <li key={s.en} className="rounded-[2px] bg-gray px-3 py-1.5 text-sm font-medium">{s[locale]}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
          <div className="col-span-4 space-y-6 md:col-span-7 md:col-start-6">
            {project.body.map((p, i) => (
              <p key={i} className={i === 0 ? "t-h3 font-medium" : "t-lead text-slate"}>{p[locale]}</p>
            ))}
          </div>
        </div>
      </section>

      <section data-theme="light" className="bg-white pb-[var(--section)]" aria-labelledby="gallery-title">
        <div className="frame">
          <h2 id="gallery-title" className="t-h2 mb-10">{d.gallery}</h2>
          <Gallery
            images={project.gallery.map((g) => ({ src: g.src, alt: g.alt[locale] }))}
            locale={locale}
          />
        </div>
      </section>

      <section data-theme="light" className="section-y border-t border-line bg-mist" aria-labelledby="more-projects">
        <div className="frame">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="more-projects" className="t-h2">{d.more}</h2>
            <Link href={lp(locale, "/projects")} className="link inline-flex items-center gap-2 font-semibold">
              {dict.common.allProjects}
              <Arrow />
            </Link>
          </div>
          <div className="mt-12 grid gap-x-[var(--gutter)] gap-y-14 md:grid-cols-2">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} locale={locale} demoLabel={dict.common.demo} ctaLabel={dict.common.viewProject} sizes="(min-width: 768px) 50vw, 100vw" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

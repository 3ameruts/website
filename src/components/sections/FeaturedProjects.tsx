import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { home } from "@/content/pages";
import { projects } from "@/content/projects";
import { lp } from "@/lib/i18n";
import { SectionHead } from "@/components/ui/SectionHead";
import { Arrow } from "@/components/ui/Arrow";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = home.projects;
  const [first, second, third] = projects;
  return (
    <section
      id="projects"
      data-chapter={c.title[locale]}
      data-theme="light"
      aria-labelledby="projects-title"
      className="section-y bg-white"
    >
      <div className="frame">
        <SectionHead
          id="projects-title"
          title={c.title[locale]}
          body={c.body[locale]}
          aside={
            <Link href={lp(locale, "/projects")} className="link mt-5 inline-flex items-center gap-2 font-semibold">
              {dict.common.allProjects}
              <Arrow />
            </Link>
          }
        />
        <div className="grid-12 mt-14 gap-y-14 md:mt-20">
          <div className="col-span-4 md:col-span-7">
            <ProjectCard project={first} locale={locale} demoLabel={dict.common.demo} ctaLabel={dict.common.viewProject} size="large" sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
          <div className="col-span-4 flex flex-col gap-14 md:col-span-4 md:col-start-9 md:pt-32">
            {[second, third].map((p) => (
              <ProjectCard key={p.slug} project={p} locale={locale} demoLabel={dict.common.demo} ctaLabel={dict.common.viewProject} sizes="(min-width: 768px) 33vw, 100vw" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

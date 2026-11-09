"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projects, projectSectors, type ProjectSector } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [sector, setSector] = useState<ProjectSector | "all">("all");
  const list = projects.filter((p) => sector === "all" || p.sector === sector);
  const sectors = Object.keys(projectSectors) as ProjectSector[];
  const chip = (active: boolean) =>
    `inline-flex min-h-10 items-center rounded-[2px] border px-4 text-sm font-medium transition-colors ${
      active ? "border-navy bg-navy text-white" : "border-control text-navy hover:border-navy"
    }`;
  return (
    <>
      <div role="group" aria-label={dict.projects.sector} className="flex flex-wrap gap-2">
        <button type="button" className={chip(sector === "all")} aria-pressed={sector === "all"} onClick={() => setSector("all")}>
          {dict.projects.filterAll}
        </button>
        {sectors.map((s) => (
          <button key={s} type="button" className={chip(sector === s)} aria-pressed={sector === s} onClick={() => setSector(s)}>
            {projectSectors[s][locale]}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {list.length}
      </p>
      <ul className="grid-12 mt-12 gap-y-16 md:mt-16">
        {list.map((p, i) => {
          // Editorial rhythm: wide, then narrow offset, repeating.
          const wide = i % 3 === 0;
          return (
            <li
              key={p.slug}
              className={
                wide
                  ? "col-span-4 md:col-span-8"
                  : i % 3 === 1
                    ? "col-span-4 md:col-span-4 md:mt-40"
                    : "col-span-4 md:col-span-5 md:col-start-4"
              }
            >
              <ProjectCard
                project={p}
                locale={locale}
                demoLabel={dict.common.demo}
                ctaLabel={dict.common.viewProject}
                size={wide ? "large" : "default"}
                sizes={wide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

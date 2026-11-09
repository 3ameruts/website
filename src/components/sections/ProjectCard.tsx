import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { projectSectors, type Project } from "@/content/projects";
import { lp } from "@/lib/i18n";
import { Arrow } from "@/components/ui/Arrow";
import { DemoTag } from "@/components/ui/DemoTag";

export function ProjectCard({
  project,
  locale,
  demoLabel,
  ctaLabel,
  size = "default",
  sizes,
}: {
  project: Project;
  locale: Locale;
  demoLabel: string;
  ctaLabel: string;
  size?: "large" | "default";
  sizes: string;
}) {
  return (
    <article className="group relative">
      <div className={`relative overflow-hidden bg-gray ${size === "large" ? "aspect-[4/3] md:aspect-[5/4]" : "aspect-[16/10]"}`}>
        <Image
          src={project.cover}
          alt=""
          fill
          sizes={sizes}
          quality={70}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        {project.demo && (
          <span className="absolute start-3 top-3">
            <DemoTag label={demoLabel} />
          </span>
        )}
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="t-label">{projectSectors[project.sector][locale]}</p>
          <h3 className={`${size === "large" ? "t-h2" : "t-h3"} mt-2`}>
            <Link href={lp(locale, `/projects/${project.slug}`)} className="after:absolute after:inset-0">
              {project.title[locale]}
            </Link>
          </h3>
          <p className="mt-3 max-w-[52ch] text-slate">{project.summary[locale]}</p>
        </div>
        <span
          aria-hidden
          className="mt-8 hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-navy/25 transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white sm:grid"
        >
          <Arrow />
        </span>
      </div>
      <span className="sr-only">{ctaLabel}</span>
    </article>
  );
}

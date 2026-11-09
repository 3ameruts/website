import type { Locale } from "@/i18n/config";
import { site } from "@/content/site";
import { home } from "@/content/pages";
import { DemoTag } from "@/components/ui/DemoTag";

/**
 * Manufacturers & partners.
 * ADD REAL PARTNERS HERE: { name, logo: "/brand/partners/<file>.svg" }.
 * Only list brands the company is authorised to represent.
 * While the list is empty, placeholder slots show in demo mode only;
 * with demoMode=false and no partners, the section is not rendered.
 */
export const partners: { name: string; logo: string }[] = [];

export function Partners({ locale, demoLabel }: { locale: Locale; demoLabel: string }) {
  const c = home.partners;
  if (!partners.length && !site.demoMode) return null;
  const slots = partners.length ? partners : Array.from({ length: 6 }, () => null);
  return (
    <section
      id="partners"
      data-chapter={c.title[locale]}
      data-theme="light"
      aria-labelledby="partners-title"
      className="bg-white py-[calc(var(--section)*0.7)]"
    >
      <div className="frame grid-12 gap-y-8">
        <div className="col-span-4 md:col-span-4">
          <h2 id="partners-title" className="t-h3">
            {c.title[locale]}
          </h2>
          <p className="mt-3 text-slate">{c.body[locale]}</p>
          {!partners.length && <DemoTag label={demoLabel} className="mt-4" />}
        </div>
        <ul className="col-span-4 grid grid-cols-2 border-s border-t border-line sm:grid-cols-3 md:col-span-8">
          {slots.map((p, i) => (
            <li key={p?.name ?? i} className="grid aspect-[3/2] place-items-center border-b border-e border-line p-6">
              {p ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.logo} alt={p.name} className="max-h-12 w-auto object-contain" loading="lazy" />
              ) : (
                <span className="flex flex-col items-center gap-2 text-center text-sm text-slate">
                  <span aria-hidden className="h-8 w-20 border border-dashed border-slate/50" />
                  {c.slot[locale]}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

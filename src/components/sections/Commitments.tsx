import type { Locale } from "@/i18n/config";
import { home } from "@/content/pages";
import { commitments } from "@/content/solutions";
import { SectionHead } from "@/components/ui/SectionHead";

/** Laid out like a specification sheet: commitment / what it means in practice. */
export function Commitments({ locale }: { locale: Locale }) {
  const c = home.commitments;
  return (
    <section
      id="commitments"
      data-chapter={c.title[locale]}
      data-theme="light"
      aria-labelledby="commitments-title"
      className="section-y bg-gray"
    >
      <div className="frame">
        <SectionHead id="commitments-title" title={c.title[locale]} body={c.body[locale]} />
        <table className="mt-14 w-full border-collapse text-start md:mt-20">
          <caption className="sr-only">{c.title[locale]}</caption>
          <thead className="hidden md:table-header-group">
            <tr className="border-b-2 border-navy">
              <th scope="col" className="t-label w-[42%] pb-4 text-start font-semibold">
                {c.colCommitment[locale]}
              </th>
              <th scope="col" className="t-label pb-4 text-start font-semibold">
                {c.colPractice[locale]}
              </th>
            </tr>
          </thead>
          <tbody>
            {commitments.map((row) => (
              <tr key={row.title.en} className="group block border-b border-navy/20 py-7 md:table-row md:py-0">
                <th scope="row" className="block text-start align-top md:table-cell md:py-9 md:pe-10">
                  <span className="t-h3 flex items-start gap-4">
                    <span aria-hidden className="mt-[0.55em] h-[2px] w-5 shrink-0 bg-teal transition-[width] duration-500 group-hover:w-9" />
                    {row.title[locale]}
                  </span>
                </th>
                <td className="mt-3 block ps-9 align-top text-slate md:table-cell md:py-9 md:ps-0">
                  <p className="t-lead measure">{row.practice[locale]}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

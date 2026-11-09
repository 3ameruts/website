import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";

/** not-found cannot read route params, so it speaks both languages. */
export default function NotFound() {
  const en = getDictionary("en").notFound;
  const ar = getDictionary("ar").notFound;
  return (
    <section data-theme="dark" className="on-dark flex min-h-[85svh] items-end bg-navy pb-24 pt-40 text-white">
      <div className="frame grid gap-14 md:grid-cols-2">
        <div lang="en" dir="ltr">
          <p className="t-label tabular">404</p>
          <h1 className="t-h2 mt-4 max-w-[20ch]">{en.title}</h1>
          <p className="mt-5 max-w-[44ch] text-white/80">{en.body}</p>
          <Link href="/en" className="btn btn-light mt-8">{en.home}</Link>
        </div>
        <div lang="ar" dir="rtl" className="font-[family-name:var(--font-arabic)]">
          <p className="t-label tabular">٤٠٤</p>
          <p className="t-h2 mt-4 max-w-[20ch]">{ar.title}</p>
          <p className="mt-5 max-w-[44ch] text-white/80">{ar.body}</p>
          <Link href="/ar" className="btn btn-light mt-8">{ar.home}</Link>
        </div>
      </div>
    </section>
  );
}

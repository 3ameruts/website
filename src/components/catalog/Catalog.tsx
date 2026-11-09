"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useId, useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { solutions, type SolutionId } from "@/content/solutions";
import { products, specLabels, subcategories, type Product } from "@/content/products";
import { lp } from "@/lib/i18n";
import { quoteStore, useQuoteList } from "@/lib/quote-store";
import { Arrow } from "@/components/ui/Arrow";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[ً-ٰٟ]/g, "") // Arabic diacritics
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[̀-ͯ]/g, "");

export function Catalog({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.catalog;
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const initialCat = params.get("category");
  const [category, setCategory] = useState<SolutionId | "all">(
    solutions.some((s) => s.id === initialCat) ? (initialCat as SolutionId) : "all",
  );
  const [sub, setSub] = useState<string>("all");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const deferred = useDeferredValue(query);
  const quote = useQuoteList();
  const searchId = useId();

  // Keep the URL shareable (category + query) without adding history entries.
  useEffect(() => {
    const sp = new URLSearchParams();
    if (category !== "all") sp.set("category", category);
    if (query.trim()) sp.set("q", query.trim());
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [category, query, pathname, router]);

  const subs = subcategories.filter((s) => s.category === category);

  const results = useMemo(() => {
    const q = normalize(deferred.trim());
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (sub !== "all" && p.subcategory !== sub) return false;
      if (!q) return true;
      const hay = normalize(`${p.name.en} ${p.name.ar} ${p.summary.en} ${p.summary.ar} ${p.keywords ?? ""}`);
      return q.split(/\s+/).every((term) => hay.includes(term));
    });
  }, [category, sub, deferred]);

  const reset = () => {
    setCategory("all");
    setSub("all");
    setQuery("");
  };

  const chip = (active: boolean) =>
    `inline-flex min-h-10 items-center rounded-[2px] border px-4 text-sm font-medium transition-colors ${
      active ? "border-navy bg-navy text-white" : "border-line bg-white text-navy hover:border-navy"
    }`;

  return (
    <div className="grid-12 gap-y-10">
      {/* Filters */}
      <div className="col-span-4 min-w-0 md:col-span-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div role="group" aria-label={c.category} className="min-w-0">
            <p className="t-label mb-3" aria-hidden>
              {c.category}
            </p>
            <div className="-mx-[var(--margin)] flex gap-2 overflow-x-auto px-[var(--margin)] pb-1 md:mx-0 md:flex-wrap md:px-0">
              <button type="button" className={`${chip(category === "all")} shrink-0 whitespace-nowrap`} aria-pressed={category === "all"} onClick={() => { setCategory("all"); setSub("all"); }}>
                {c.allCategories}
              </button>
              {solutions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`${chip(category === s.id)} shrink-0 whitespace-nowrap`}
                  aria-pressed={category === s.id}
                  onClick={() => {
                    setCategory(s.id);
                    setSub("all");
                  }}
                >
                  {s.title[locale]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor={searchId} className="t-label mb-3 block">
              {c.search}
            </label>
            <div className="relative">
              <svg aria-hidden viewBox="0 0 20 20" width="18" height="18" className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-slate">
                <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M13 13l5 5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={c.searchPlaceholder}
                className="field ps-11"
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        {subs.length > 1 && (
          <div role="group" aria-label={c.subcategory} className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
            <button type="button" className={chip(sub === "all")} aria-pressed={sub === "all"} onClick={() => setSub("all")}>
              {c.allSub}
            </button>
            {subs.map((s) => (
              <button key={s.id} type="button" className={chip(sub === s.id)} aria-pressed={sub === s.id} onClick={() => setSub(s.id)}>
                {s.title[locale]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="col-span-4 min-w-0 md:col-span-12 lg:col-span-9">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-line pb-4">
          <p className="tabular font-semibold" role="status" aria-live="polite">
            {c.results(results.length)}
          </p>
          {(category !== "all" || query) && (
            <button type="button" onClick={reset} className="link text-sm font-medium">
              {c.clear}
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="border border-dashed border-line px-6 py-16 text-center">
            <p className="t-h3">{c.empty}</p>
            <p className="mx-auto mt-3 max-w-[44ch] text-slate">{c.emptyHint}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={reset} className="btn btn-outline">
                {c.clear}
              </button>
              <Link href={lp(locale, "/contact#quote")} className="btn">
                {dict.common.requestQuote}
              </Link>
            </div>
          </div>
        ) : (
          <ul className="grid gap-x-[var(--gutter)] gap-y-10 sm:grid-cols-2 sm:gap-y-12 xl:grid-cols-3">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} dict={dict} inQuote={quote.some((q) => q.id === p.id)} />
            ))}
          </ul>
        )}
      </div>

      {/* Quote list */}
      <aside className="col-span-4 min-w-0 md:col-span-12 lg:col-span-3" aria-labelledby="quote-list-title">
        <div className="border border-line bg-mist p-6 lg:sticky lg:top-28">
          <h2 id="quote-list-title" className="t-h3 flex items-center justify-between">
            {c.quoteList}
            <span className="tabular grid h-7 min-w-7 place-items-center rounded-full bg-navy px-2 text-sm text-white">{quote.length}</span>
          </h2>
          {quote.length === 0 ? (
            <p className="t-small mt-4 text-slate">{c.quoteEmpty}</p>
          ) : (
            <>
              <ul className="mt-4 divide-y divide-line">
                {quote.map((q) => {
                  const p = products.find((x) => x.id === q.id);
                  if (!p) return null;
                  return (
                    <li key={q.id} className="flex items-start justify-between gap-3 py-3 text-sm">
                      <span className="font-medium">{p.name[locale]}</span>
                      <button type="button" onClick={() => quoteStore.remove(q.id)} className="shrink-0 text-slate underline-offset-2 hover:text-navy hover:underline">
                        {c.remove}
                        <span className="sr-only"> {p.name[locale]}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <Link href={lp(locale, "/contact#quote")} className="btn mt-6 w-full">
                {c.requestForList}
              </Link>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

function ProductCard({ product: p, locale, dict, inQuote }: { product: Product; locale: Locale; dict: Dictionary; inQuote: boolean }) {
  const c = dict.catalog;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const cat = solutions.find((s) => s.id === p.category);
  const sub = subcategories.find((s) => s.id === p.subcategory);
  return (
    <li className="group grid grid-cols-[5.5rem_minmax(0,1fr)] content-start gap-x-4 border-b border-line pb-8 sm:flex sm:flex-col sm:border-0 sm:pb-0">
      <div className="relative row-span-4 aspect-square overflow-hidden bg-gray sm:aspect-[4/3]">
        <Image
          src={p.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
          quality={70}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
      </div>
      <p className="t-label sm:mt-4">
        {cat?.title[locale]}
        {sub && sub.title.en !== cat?.title.en ? ` / ${sub.title[locale]}` : ""}
      </p>
      <h3 className="t-h3 mt-1.5">{p.name[locale]}</h3>
      <p className="t-small mt-2 flex-1 text-slate sm:text-base">{p.summary[locale]}</p>

      <div className="col-span-2 mt-4 border-t border-line">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between py-3 text-sm font-semibold"
        >
          {c.specs}
          <span aria-hidden className={`text-lg leading-none transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
        </button>
        <div id={panelId} hidden={!open}>
          <dl className="tabular divide-y divide-line border-t border-line text-sm">
            {p.specFields.map((k) => {
              const real = p.specs?.find((s) => s.key === k);
              return (
                <div key={k} className="grid grid-cols-2 gap-3 py-2">
                  <dt className="text-slate">{specLabels[k][locale]}</dt>
                  <dd className={real ? "font-medium" : "text-slate italic"}>{real ? real.value[locale] : c.specPending}</dd>
                </div>
              );
            })}
          </dl>
          <p className="t-small mt-3 text-slate">{c.specsNote}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => (inQuote ? quoteStore.remove(p.id) : quoteStore.add(p.id))}
        aria-pressed={inQuote}
        className={`btn btn-sm col-span-2 mt-4 w-full ${inQuote ? "" : "btn-outline"}`}
      >
        {inQuote ? (
          <>
            <svg aria-hidden viewBox="0 0 16 16" width="14" height="14"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
            {c.added}
          </>
        ) : (
          <>
            {c.addToQuote}
            <Arrow />
          </>
        )}
        <span className="sr-only">: {p.name[locale]}</span>
      </button>
    </li>
  );
}

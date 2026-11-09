"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { lp } from "@/lib/i18n";
import { useQuoteList } from "@/lib/quote-store";

/** Persistent mobile bar once the visitor has items in their quote list. */
export function MobileQuoteBar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const items = useQuoteList();
  const pathname = usePathname();
  if (!items.length || pathname.startsWith(lp(locale, "/contact"))) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden">
      <div className="frame flex items-center justify-between gap-3 py-3">
        <p className="text-sm font-medium" aria-live="polite">
          {dict.catalog.quoteList} · <span className="tabular">{items.length}</span>
        </p>
        <Link href={lp(locale, "/contact#quote")} className="btn btn-sm">
          {dict.nav.requestQuote}
        </Link>
      </div>
    </div>
  );
}

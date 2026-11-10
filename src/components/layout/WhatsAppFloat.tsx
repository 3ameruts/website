"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/**
 * Floating WhatsApp contact — understated, brand-coloured (navy + teal ring),
 * not the stock green bubble. Appears once the visitor has scrolled past the
 * top of the page; on pointer devices it opens out on hover/focus to show a label.
 */
export function WhatsAppFloat({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(dict.form.whatsappGreeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.common.whatsappFloatLabel}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={[
        "group fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] end-[max(1rem,calc(var(--margin)-0.5rem))] z-30 print:hidden",
        "flex h-14 items-center gap-0 overflow-hidden rounded-full bg-navy p-1.5 text-white",
        "shadow-[0_18px_40px_-14px_rgb(8_34_79/0.65)] ring-1 ring-white/15",
        "transition-[opacity,translate,gap,padding] duration-500 ease-[var(--ease-out-expo)]",
        "hover:gap-3 hover:pe-5 focus-visible:gap-3 focus-visible:pe-5",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      ].join(" ")}
    >
      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full ring-1 ring-teal/80 transition-colors duration-300 group-hover:bg-teal group-hover:text-navy-deep">
        <WhatsAppIcon size={21} />
      </span>
      <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[var(--ease-out-expo)] group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
        <span className="overflow-hidden whitespace-nowrap text-[0.95rem] font-semibold">{dict.common.whatsappFloat}</span>
      </span>
    </a>
  );
}

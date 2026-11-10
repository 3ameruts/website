import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site, whatsappLink } from "@/content/site";
import { lp } from "@/lib/i18n";
import { Logo } from "./Logo";
import { Arrow } from "@/components/ui/Arrow";
import { DemoTag } from "@/components/ui/DemoTag";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const links = [
    { href: lp(locale, "/about"), label: dict.nav.about },
    { href: lp(locale, "/products"), label: dict.nav.products },
    { href: lp(locale, "/laboratory-solutions"), label: dict.nav.labSolutions },
    { href: lp(locale, "/contact"), label: dict.nav.contact },
  ];
  return (
    <footer className="on-dark bg-navy text-white" data-chapter-end>
      <div className="frame grid-12 gap-y-14 pb-14 pt-20 md:pt-28">
        <div className="footer-cta col-span-4 md:col-span-12 lg:col-span-6">
          <p className="t-h2 max-w-[18ch]">{dict.footer.cta}</p>
          <p className="t-lead mt-5 max-w-[46ch] text-white/75">{dict.footer.ctaBody}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={lp(locale, "/contact#quote")} className="btn btn-light">
              {dict.common.requestQuote}
              <Arrow />
            </Link>
            <a href={whatsappLink()} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
              {dict.form.whatsappCta}
            </a>
          </div>
        </div>

        <div className="col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2 lg:col-start-8">
          <h2 className="t-label">{dict.footer.explore}</h2>
          <ul className="mt-4 space-y-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-teal-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-4 sm:col-span-2 md:col-span-6 lg:col-span-3 lg:col-start-10">
          <h2 className="t-label flex flex-wrap items-center gap-2">
            {dict.footer.contact}
            {site.demoMode && <DemoTag label={dict.common.demo} />}
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={`mailto:${site.contact.email}`} className="[overflow-wrap:anywhere] hover:text-teal-light">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.contact.phoneHref}`} dir="ltr" className="tabular whitespace-nowrap hover:text-teal-light">
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li className="text-white/75">{site.contact.address[locale]}</li>
          </ul>
        </div>
      </div>

      <div className="frame flex flex-col gap-8 border-t border-white/15 py-10 md:flex-row md:items-end md:justify-between">
        <Link href={lp(locale)} aria-label={dict.nav.home} className="block">
          <Logo locale={locale} reversed className="h-16 w-auto md:h-20" sizes="260px" />
        </Link>
        <div className="t-small max-w-[52ch] space-y-1 text-white/70 md:text-end">
          <p>
            © {year} {site.brand.name[locale]}. {dict.footer.rights}
          </p>
          <p>{dict.footer.imagery}</p>
        </div>
      </div>
      <div className="band band-light" aria-hidden />
    </footer>
  );
}

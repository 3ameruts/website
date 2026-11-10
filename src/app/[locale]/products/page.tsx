import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { productsPage } from "@/content/pages";
import { solutions } from "@/content/solutions";
import { site } from "@/content/site";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { lp } from "@/lib/i18n";
import { PageHero } from "@/components/sections/PageHero";
import { CategoryMosaic } from "@/components/sections/CategoryMosaic";
import { JsonLd } from "@/components/ui/JsonLd";
import { Arrow } from "@/components/ui/Arrow";

export async function generateMetadata({ params }: PageProps<"/[locale]/products">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: "/products", title: productsPage.meta.title, description: productsPage.meta.description });
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: productsPage.meta.title[locale],
    itemListElement: solutions.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title[locale],
      url: `${site.url}${lp(locale, "/products")}#${c.id}`,
    })),
  };
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: dict.nav.home, url: lp(locale) }, { name: dict.nav.products, url: lp(locale, "/products") }])} />
      <JsonLd data={itemList} />
      <PageHero
        title={productsPage.hero.title[locale]}
        body={productsPage.hero.body[locale]}
        image="/media/img/instrument-microscope.jpg"
        crumbs={[{ href: lp(locale), label: dict.nav.home }, { href: lp(locale, "/products"), label: dict.nav.products }]}
      />
      <section aria-labelledby="categories-title" data-theme="light" className="bg-white py-14 md:py-20">
        <div className="frame">
          <h2 id="categories-title" className="sr-only">{dict.catalog.category}</h2>
          <CategoryMosaic locale={locale} variant="detailed" ctaLabel={dict.common.requestQuote} />
        </div>
      </section>
      <section data-theme="dark" aria-labelledby="setup-cta" className="on-dark section-y bg-navy text-white">
        <div className="frame grid-12 gap-y-8">
          <h2 id="setup-cta" className="t-h1 col-span-4 md:col-span-7">{productsPage.setupTitle[locale]}</h2>
          <div className="col-span-4 self-end md:col-span-4 md:col-start-9">
            <p className="t-lead text-white/85">{productsPage.setupBody[locale]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={lp(locale, "/laboratory-solutions")} className="btn btn-light">
                {dict.nav.labSolutions}
                <Arrow />
              </Link>
              <Link href={`${lp(locale, "/contact")}?interest=lab-setup#quote`} className="btn btn-outline">
                {dict.common.discussProject}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { productsPage } from "@/content/pages";
import { products } from "@/content/products";
import { site } from "@/content/site";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { lp } from "@/lib/i18n";
import { PageHero } from "@/components/sections/PageHero";
import { Catalog } from "@/components/catalog/Catalog";
import { JsonLd } from "@/components/ui/JsonLd";

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
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Product", name: p.name[locale], description: p.summary[locale], image: `${site.url}${p.image}`, brand: { "@type": "Brand", name: site.brand.name.en } },
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
      <section aria-label={dict.nav.products} data-theme="light" className="bg-white pb-[var(--section)] pt-14 md:pt-20">
        <div className="frame">
          <Catalog locale={locale} />
        </div>
      </section>
    </>
  );
}

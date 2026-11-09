import type { L, Locale } from "@/i18n/config";

/** Pick the string for the active locale. */
export const t = (value: L, locale: Locale) => value[locale];

/** Build a locale-prefixed internal path. `lp("ar", "/products")` → `/ar/products`. */
export function lp(locale: Locale, path = "/") {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** Swap the locale segment of a pathname. */
export function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  parts[1] = to;
  return parts.join("/") || `/${to}`;
}

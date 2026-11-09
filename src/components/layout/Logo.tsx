import Image from "next/image";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";

/**
 * Official logo artwork (see public/brand/). Never re-typeset or recoloured
 * beyond the supplied reversed version.
 */
export function Logo({
  locale,
  variant = "full",
  reversed = false,
  className,
  preload,
  sizes = "180px",
}: {
  locale: Locale;
  variant?: "full" | "mark";
  reversed?: boolean;
  className?: string;
  preload?: boolean;
  sizes?: string;
}) {
  const key = variant === "full" ? (reversed ? "fullReversed" : "full") : reversed ? "markReversed" : "mark";
  const asset = site.brand.logo[key];
  return (
    <Image
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={site.brand.name[locale]}
      className={className}
      preload={preload}
      sizes={sizes}
      unoptimized={false}
    />
  );
}

import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brand.name.en,
    short_name: site.brand.shortName,
    description: site.brand.descriptor.en,
    start_url: "/en",
    display: "browser",
    background_color: "#FFFFFF",
    theme_color: site.colors.navy,
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

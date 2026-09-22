import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F5F9FC",
    theme_color: "#031B3D",
    icons: [
      {
        src: siteConfig.brand.icon,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

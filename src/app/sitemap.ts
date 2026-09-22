import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticPaths = [
    "/",
    "/services",
    "/solutions",
    "/industries",
    "/case-studies",
    "/about",
    "/insights",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...caseStudies.map((study) => ({
      url: `${base}/case-studies/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...articles.map((article) => ({
      url: `${base}/insights/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}

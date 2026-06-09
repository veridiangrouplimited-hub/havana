import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import { news } from "@/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/consular-services",
    "/relations",
    "/diaspora",
    "/news",
    "/public-notices",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/accessibility",
    "/sitemap",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${site.url}/consular-services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const newsRoutes = news.map((n) => ({
    url: `${site.url}/news/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...newsRoutes];
}

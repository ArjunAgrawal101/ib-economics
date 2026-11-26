import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.9 },
    { path: "/ecosystem", priority: 0.9 },
    { path: "/work", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
  ];
  return pages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}

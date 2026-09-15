// This file generates the site's sitemap.xml automatically — a list of pages
// that tells search engines like Google what exists on the site so they can
// crawl it. Next.js serves whatever this function returns at /sitemap.xml.
import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.NEXT_PUBLIC_SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

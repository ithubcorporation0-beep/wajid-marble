// This file generates the site's robots.txt automatically — the file that
// tells search engine crawlers which parts of the site they're allowed to
// visit, and where to find the sitemap. Next.js serves whatever this
// function returns at /robots.txt.
import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /api/quote has nothing worth indexing (it only accepts POST
      // requests) and no reason to spend crawl budget on it.
      disallow: "/api/",
    },
    sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}

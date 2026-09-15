// This file generates the site's robots.txt automatically — the file that
// tells search engine crawlers which parts of the site they're allowed to
// visit. Next.js serves whatever this function returns at /robots.txt.
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}

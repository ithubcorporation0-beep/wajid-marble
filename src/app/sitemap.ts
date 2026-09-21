// This file generates the site's sitemap.xml automatically — a list of pages
// that tells search engines like Google what exists on the site so they can
// crawl it. Next.js serves whatever this function returns at /sitemap.xml.
//
// The list of pages comes from src/content/pages/index.ts, not a hard-coded
// array here — adding a new service page to that file is enough to get it
// into the sitemap too, with no risk of a page shipping and the sitemap
// forgetting about it (or listing a page that no longer exists).
import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { allRoutePaths } from "@/content/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return allRoutePaths.map((path) => ({
    // path is already "/" or "/some-slug" — appending it directly to the
    // site's base URL avoids a double slash for the homepage.
    url: path === "/" ? env.NEXT_PUBLIC_SITE_URL : `${env.NEXT_PUBLIC_SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    // The homepage is the most important page; every other page gets an
    // equal, slightly lower priority since none of them is more important
    // than the others.
    priority: path === "/" ? 1 : 0.8,
  }));
}

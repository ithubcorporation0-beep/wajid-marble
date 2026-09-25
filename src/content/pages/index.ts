// The single source of truth for every SEO landing page's content and
// route. This file is what src/app/sitemap.ts reads to build the sitemap
// automatically, and what the footer/mobile drawer read to link to every
// page — so adding a new page here is enough to get it into the sitemap
// and the nav without editing either of those files by hand.
//
// To add a new service page: create its content file next to this one
// (copy the shape of marble-in-mardan.ts), add it to `servicePages` below,
// and create the matching src/app/<slug>/page.tsx route (copy the shape of
// an existing one, e.g. src/app/marble-in-mardan/page.tsx).
import type { NavLink, ServicePageContent } from "@/types";
import { marbleInMardan } from "./marble-in-mardan";
import { graniteInMardan } from "./granite-in-mardan";
import { onyxInMardan } from "./onyx-in-mardan";
import { marbleFlooringMardan } from "./marble-flooring-mardan";
import { graniteKitchenCountertopsMardan } from "./granite-kitchen-countertops-mardan";

export const servicePages: ServicePageContent[] = [
  marbleInMardan,
  graniteInMardan,
  onyxInMardan,
  marbleFlooringMardan,
  graniteKitchenCountertopsMardan,
];

/** The Contact page isn't a ServicePageContent (it reuses the homepage's
 * existing Contact section rather than ServicePageLayout — see
 * src/app/contact/page.tsx), but it still needs a slug/label so it can
 * appear in the same nav list and sitemap as the service pages. Labeled
 * "Request a Quote" rather than plain "Contact" so it doesn't read as a
 * duplicate of the existing homepage-anchor "Contact" link that already
 * appears in the footer/drawer nav (see navLinks in src/content/site.ts). */
export const contactPageLink: NavLink = { label: "Request a Quote", href: "/contact" };

/** The /materials catalog (src/app/materials/) isn't a ServicePageContent
 * either — it's built directly from products.items in site.ts — but it
 * needs a nav entry the same way the contact page does. The per-stone
 * detail pages (/materials/<id>) aren't listed individually in nav; they're
 * reached by clicking through from here or from a homepage hexagon. */
export const materialsPageLink: NavLink = { label: "Materials", href: "/materials" };

/** Every non-homepage page's nav entry, in the order they should appear in
 * the footer and mobile drawer. */
export const pageNavLinks: NavLink[] = [
  ...servicePages.map((page) => ({ label: page.navLabel, href: `/${page.slug}` })),
  materialsPageLink,
  contactPageLink,
];

/** Every route's URL path (relative, no leading domain), homepage first —
 * what sitemap.ts turns into absolute URLs. The /materials/<id> detail
 * pages aren't ServicePageContent-based, so sitemap.ts adds those itself
 * from products.items rather than listing them here. */
export const allRoutePaths: string[] = [
  "/",
  ...servicePages.map((page) => `/${page.slug}`),
  "/materials",
  "/contact",
];

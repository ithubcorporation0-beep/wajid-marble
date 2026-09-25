// Renders a marble/stone texture as a pre-generated static image instead of
// a live SVG feTurbulence filter. feTurbulence is one of the most
// CPU-expensive SVG filters there is, and the homepage used to render up to
// 11 of them at once (4 product cards + 7 gallery tiles) — cheap on a
// desktop, but a real cost to First Paint and interaction responsiveness on
// the budget Android phones most of this site's visitors use.
//
// Each texture recipe in src/content/site.ts is unchanged — it's still the
// single source of truth for what a texture looks like. It's just rendered
// to a static JPEG once (see scripts/generate-textures.mjs) and checked
// into public/textures/<texture.id>.jpg, so the browser just paints an
// <img> instead of computing noise on every page load.
//
// That generation step deliberately does NOT run as part of `npm run
// build`: it needs a real browser (Playwright/Chromium) to render the
// filter, and there's no guarantee the host running the production build
// (this project's Cloudflare Workers Builds included) has one available —
// the same class of problem that broke NEXT_PUBLIC_SITE_URL earlier. So
// this is a manual step, run from a machine that has a browser, whenever a
// texture recipe in site.ts changes. See scripts/generate-textures.mjs.
//
// The hero background is a separate, hand-written one-off SVG filter
// (see Hero.tsx) rather than a MarbleTexture — a single filter there is
// cheap, and keeping it as inline SVG avoids an extra network request for
// the page's LCP element, so it's intentionally left as live SVG.
//
// Plain <img>, not next/image, is deliberate too: these are already
// pre-sized, pre-compressed static files (tens of KB each), so there's
// nothing left for next/image's runtime resizing to do — and Next's image
// optimizer needs either Node's `sharp` or a host-specific loader to work
// on Cloudflare Workers, which is exactly the kind of host-dependent
// config this project avoids after the NEXT_PUBLIC_SITE_URL incident.
//
// Also renders a real photo directly (via `src`) for products that have
// one — see the `photoSrc` field on Product in src/types/index.ts. Same
// <img> element and loading behavior either way; only where the source
// file comes from differs.
import type { MarbleTexture } from "@/types";

export default function MarbleImage({
  texture,
  src,
  alt,
  eager = false,
}: {
  /** A procedural texture recipe — omit when `src` is given instead. */
  texture?: MarbleTexture;
  /** A real photo path under /public, e.g. "/products/red-marble.jpg" —
   * takes priority over `texture` when both are given. */
  src?: string;
  /** Accessible description. Omit for a texture that's purely decorative
   * because visible text next to it already describes it (e.g. a product
   * card's name/tag) — this then renders alt="", which screen readers
   * skip over. */
  alt?: string;
  /** True for anything above the fold (product cards) so the browser
   * fetches it with the initial page instead of waiting until it's near
   * the viewport. Gallery tiles (below the fold) default to lazy. */
  eager?: boolean;
}) {
  const resolvedSrc = src ?? (texture ? `/textures/${texture.id}.jpg` : undefined);
  if (!resolvedSrc) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- see file header
    <img src={resolvedSrc} alt={alt ?? ""} loading={eager ? "eager" : "lazy"} decoding="async" />
  );
}

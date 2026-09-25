// This file describes the *shape* of the site's content — not the content
// itself (that lives in src/content/site.ts), just the rules for what fields
// each piece of content must have. TypeScript uses these to catch mistakes
// like a missing product name or a typo'd field before the site ever runs.

/** A color as [red, green, blue, alpha], each a number from 0 to 1. */
export type RGBA = [number, number, number, number];

/**
 * The recipe for one procedurally-drawn marble/stone texture (an SVG
 * feTurbulence filter), instead of a real photo. Every product card and
 * gallery tile picks one of these. `id` must be unique across the whole
 * page, because SVG filter ids are global — two textures sharing an id
 * would make the browser render the wrong filter on one of them.
 */
export interface MarbleTexture {
  /** Unique across the entire page. Used as the SVG <filter id="...">. */
  id: string;
  /** The flat base color behind the texture, as a CSS hex color. */
  baseColor: string;
  /** feTurbulence's baseFrequency attribute, e.g. "0.02 0.06". */
  baseFrequency: string;
  /** feTurbulence's numOctaves attribute. */
  numOctaves: number;
  /** feTurbulence's seed attribute — makes the pattern reproducible. */
  seed: number;
  /** The color the "veins" are tinted, read off the feColorMatrix. */
  veinColor: RGBA;
  /** Opacity of the vein layer painted over the base color. */
  veinOpacity: number;
}

/** One link in the header navigation, mobile drawer, or footer. */
export interface NavLink {
  label: string;
  href: string;
}

/** The two phone numbers the business is reachable on, digits-only with
 * country code (e.g. "923136146176"), never formatted for display. */
export interface PhoneNumbers {
  primary: string;
  secondary: string;
}

export interface BusinessOwner {
  name: string;
  role: string;
}

/** Facts about the business itself, used across headers, footers, SEO, etc. */
export interface Business {
  name: string;
  /** The plain part of the header logo text, e.g. "Wajid". */
  brandPrefix: string;
  /** The gold-colored part of the header logo text, e.g. "Marble". */
  brandEmphasis: string;
  /** Small text under the logo, e.g. "Factory · Mardan". */
  tagline: string;
  city: string;
  addressRegion: string;
  /** Display form, e.g. "Pakistan". */
  country: string;
  /** ISO 3166-1 alpha-2 form, e.g. "PK" — used in structured data. */
  countryCode: string;
  /** Street address for the factory/showroom — TODO: not yet provided by
   * the business owner, left as an empty string until then. Consuming
   * code (LocalBusinessJsonLd, the Contact section's location line) skips
   * it entirely while blank rather than showing/emitting an empty value. */
  streetAddress: string;
  /** GPS coordinates for the factory/showroom, for Google Maps matching
   * in structured data — TODO: not yet provided, left as empty strings.
   * Kept as strings (not numbers) since an empty numeric field has no
   * clean "unset" representation; LocalBusinessJsonLd omits the whole
   * `geo` block while either is blank; a fabricated coordinate pair
   * would be worse than none. */
  geo: { latitude: string; longitude: string };
  owner: BusinessOwner;
  phones: PhoneNumbers;
  /** Which number WhatsApp chats go to (same value as one of the phones
   * above — never a separately-typed-out number). */
  whatsappNumber: string;
  /** Public contact address, shown in the Contact section and used to
   * build its mailto: link. Separate from QUOTE_NOTIFY_EMAIL (see
   * src/lib/env.ts) — that's the private address quote form submissions
   * are emailed to, which may or may not be the same address. */
  email: string;
  /** Cities/towns the business serves, `city` first. Used for the
   * LocalBusiness JSON-LD `areaServed` field (see
   * src/components/seo/LocalBusinessJsonLd.tsx) — not shown anywhere on
   * the page yet, but real data crawlers can read. */
  serviceAreas: string[];
  /** The one canonical marketing description for this business — under
   * 155 characters, mentions the core products/services and location.
   * Used for both the homepage <meta name="description"> (see
   * src/app/layout.tsx) and the JSON-LD `description` field, so the two
   * never drift apart into two slightly different sentences. */
  seoDescription: string;
}

/** The eyebrow/heading/description trio most sections open with. */
export interface SectionIntro {
  eyebrow: string;
  heading: string;
  description?: string;
}

export interface HeroAction {
  label: string;
  href: string;
  variant: "solid" | "ghost";
  /** True for links that leave the site (opens in a new tab). */
  external?: boolean;
}

export interface HeroContent {
  eyebrow: string;
  /** The plain first line of the big headline. */
  headingLead: string;
  /** The italic gold second line of the big headline. */
  headingAccent: string;
  lead: string;
  actions: HeroAction[];
  /** The two small lines in the bottom-right corner on wide screens. */
  meta: string[];
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutContent extends SectionIntro {
  paragraphs: string[];
  owner: BusinessOwner & {
    label: string;
    bio: string;
    stats: AboutStat[];
  };
}

export interface Product {
  id: string;
  name: string;
  tag: string;
  /** A procedural feTurbulence recipe — omit when `photoSrc` is set
   * instead. Every product needs exactly one of `texture`/`photoSrc`. */
  texture?: MarbleTexture;
  /** Path to a real photo of this stone under /public (e.g.
   * "/products/red-marble.jpg"), for products with an actual photo
   * instead of a procedural texture. Takes priority over `texture`. */
  photoSrc?: string;
  /** Which page this stone links to — its own materials detail page,
   * e.g. "/materials/deep-red-marble" (see src/app/materials/[slug]). */
  href: string;
  /** Broad stone type, used to group/filter the /materials catalog. */
  category: "Marble" | "Granite" | "Onyx";
  /** Plain color description (e.g. "Red", "Charcoal Grey") — not a
   * specific commercial/quarry name, just what it visibly looks like. */
  color: string;
  /** A longer paragraph for the /materials/[slug] detail page — `tag` is
   * the short caption shown under the homepage hexagon. */
  description: string;
}

/** One image in a material's detail-page gallery. Every product has
 * exactly 3 (see scripts/generate-textures.mjs and public/materials/) —
 * a full view plus 2 detail crops of the same real photo or texture
 * render, not 3 separate photos (there's only one source image per
 * stone). Path convention: /materials/<product.id>/<1|2|3>.jpg. */
export interface MaterialGalleryImage {
  src: string;
  alt: string;
}

export interface ProductsContent extends SectionIntro {
  items: Product[];
}

export interface GalleryTile {
  id: string;
  /** Matches one of the .g1–.g7 classes in sections.css that size the tile
   * in the mosaic grid. */
  gridClass: string;
  viewBox: string;
  texture: MarbleTexture;
  /** Describes the stone shown in this tile for screen readers — the tile
   * is otherwise a purely decorative procedural texture with no visible
   * text of its own, unlike a product card. */
  alt: string;
}

export interface GalleryContent extends SectionIntro {
  tiles: GalleryTile[];
}

export interface Reason {
  idx: string;
  title: string;
  body: string;
}

export interface ReasonsContent extends SectionIntro {
  items: Reason[];
}

export type ContactMethodIcon = "phone" | "whatsapp" | "pin" | "email";

export interface ContactMethod {
  id: string;
  icon: ContactMethodIcon;
  label: string;
  value: string;
  /** Absent for methods that aren't a clickable action, like the address. */
  href?: string;
  action?: string;
}

/** Label + placeholder text for one text/textarea field in the quote form. */
export interface QuoteFormFieldCopy {
  label: string;
  placeholder: string;
}

/** Every status message QuoteForm can show after a submit attempt. */
export interface QuoteFormMessages {
  validationError: string;
  genericError: string;
  networkError: string;
  success: string;
}

export interface ContactFormCopy {
  title: string;
  subtitle: string;
  fields: {
    name: QuoteFormFieldCopy;
    phone: QuoteFormFieldCopy;
    /** The stone dropdown has no placeholder — it always shows a real
     * option — so it only needs a label. */
    stone: { label: string };
    details: QuoteFormFieldCopy;
  };
  submitLabel: string;
  /** Shown on the submit button while a request is in flight. */
  submitLabelPending: string;
  note: string;
  messages: QuoteFormMessages;
}

export interface ContactContent extends SectionIntro {
  lead: string;
  form: ContactFormCopy;
}

export interface HeaderContent {
  callNowLabel: string;
  quoteLabel: string;
  menuOpenAriaLabel: string;
  menuCloseAriaLabel: string;
  drawerCallLabel: string;
}

export interface FooterContent {
  rightsSuffix: string;
  /** Link to the machine-readable /sitemap.xml, shown alongside the other
   * footer links for visitors/crawlers that go looking for it directly. */
  sitemapLink: NavLink;
}

export interface FloatingWhatsAppContent {
  ariaLabel: string;
}

// `stoneOptions` (the dropdown choices in the quote form) is declared as a
// `const` tuple in src/content/site.ts, right next to the data itself, and
// its literal union type is derived there with `typeof stoneOptions[number]`
// — that keeps the exact list of allowed strings in one place instead of
// repeating them here.

// ============================================================================
// Service pages — the SEO landing pages under src/content/pages/, one file
// per route (marble-in-mardan, granite-in-mardan, etc). Each is rendered
// through the shared src/components/sections/ServicePageLayout.tsx.
// ============================================================================

/** One question/answer pair in a page's FAQ section. */
export interface FaqItem {
  question: string;
  answer: string;
}

/** One thing this page says the factory supplies — a stone type, a finish,
 * a size option. Reuses the same "idx/title/body"-shaped card grid as the
 * homepage's Why Us section (see .why-grid in src/styles/primitives.css). */
export interface SupplyItem {
  name: string;
  description: string;
}

/** One place/building type this page says the factory installs into. Kept
 * as plain strings (not objects) since each is just a short label rendered
 * in the same card grid as SupplyItem, with no separate description. */
export type InstallLocation = string;

/** All the content one service/location landing page needs — the shape
 * every file in src/content/pages/ must match, and what
 * ServicePageLayout.tsx renders. */
export interface ServicePageContent {
  /** URL segment, e.g. "marble-in-mardan" — the page lives at
   * /marble-in-mardan. Must match the folder name under src/app/. */
  slug: string;
  /** Short label used in the breadcrumb trail and in nav/footer links —
   * not the same as the full <title> tag, which is longer and keyword-led. */
  navLabel: string;
  seo: {
    /** Full <title> tag text — unique per page, leads with the page's own
     * keyword + "Mardan", not the business name (matches the homepage's
     * title pattern — see src/app/layout.tsx). */
    title: string;
    /** <meta name="description"> — unique per page, under ~155 characters. */
    description: string;
  };
  hero: {
    eyebrow: string;
    /** Becomes this page's one <h1>. */
    heading: string;
    lead: string;
  };
  intro: {
    heading: string;
    paragraphs: string[];
  };
  supply: {
    heading: string;
    intro: string;
    items: SupplyItem[];
  };
  installations: {
    heading: string;
    intro: string;
    items: InstallLocation[];
  };
  faq: {
    heading: string;
    items: FaqItem[];
  };
}

/** One crumb in a breadcrumb trail — see src/components/ui/Breadcrumbs.tsx
 * and src/components/seo/BreadcrumbJsonLd.tsx. `href` is omitted for the
 * current page, which renders as plain text rather than a link. */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

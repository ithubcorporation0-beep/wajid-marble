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
  owner: BusinessOwner;
  phones: PhoneNumbers;
  /** Which number WhatsApp chats go to (same value as one of the phones
   * above — never a separately-typed-out number). */
  whatsappNumber: string;
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
  /** Two short lines shown under the actions on wide screens. */
  meta: string[];
  /** The texture behind the book-matched marble panel on the hero's right
   * side (see ui/MarblePanel.tsx). Broader, lower-frequency veining than
   * the product/gallery textures, since it's shown much larger. */
  visualTexture: MarbleTexture;
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
  texture: MarbleTexture;
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

export type ContactMethodIcon = "phone" | "whatsapp" | "pin";

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
}

export interface FloatingWhatsAppContent {
  ariaLabel: string;
}

// `stoneOptions` (the dropdown choices in the quote form) is declared as a
// `const` tuple in src/content/site.ts, right next to the data itself, and
// its literal union type is derived there with `typeof stoneOptions[number]`
// — that keeps the exact list of allowed strings in one place instead of
// repeating them here.

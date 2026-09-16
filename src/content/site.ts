// ============================================================================
//  THIS IS THE ONE FILE TO EDIT WHEN CHANGING WEBSITE TEXT.
//
//  Every word, phone number, product name and color shown on the site lives
//  in this file. If you want to change a heading, fix a typo, add a product,
//  or update a phone number, do it here — never inside a component file in
//  src/components. Components only decide how this content is laid out and
//  styled; they should never contain the words themselves.
// ============================================================================
import type {
  AboutContent,
  Business,
  ContactContent,
  ContactMethod,
  FloatingWhatsAppContent,
  FooterContent,
  GalleryContent,
  HeaderContent,
  HeroContent,
  MarbleTexture,
  NavLink,
  ProductsContent,
  ReasonsContent,
} from "@/types";

// ----------------------------------------------------------------------------
// Business facts
// ----------------------------------------------------------------------------

/**
 * Both phone numbers, stored exactly once, digits-only with country code.
 * Every tel: link, wa.me link and on-screen phone number is built FROM these
 * two values below (see `formatLocalPhone` and the exports further down) —
 * the raw digits are never re-typed anywhere else in the codebase.
 */
const phones = {
  primary: "923136146176",
  secondary: "923018197466",
} as const;

/** Turns "923136146176" into the familiar local "0313-6146176" for display. */
function formatLocalPhone(internationalDigits: string): string {
  const withoutCountryCode = internationalDigits.replace(/^92/, "");
  const local = `0${withoutCountryCode}`;
  return `${local.slice(0, 4)}-${local.slice(4)}`;
}

export const business: Business = {
  name: "Wajid Marble Factory",
  brandPrefix: "Wajid",
  brandEmphasis: "Marble",
  tagline: "Factory · Mardan",
  city: "Mardan",
  addressRegion: "Khyber Pakhtunkhwa",
  country: "Pakistan",
  countryCode: "PK",
  owner: {
    name: "Nihad Ali",
    role: "Zonal Vice Chairman, Mardan",
  },
  phones,
  whatsappNumber: phones.secondary,
};

// ----------------------------------------------------------------------------
// Navigation (shared by the header, the mobile drawer, and the footer)
// ----------------------------------------------------------------------------

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Gallery", href: "#gallery" },
  { label: "Why Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

// ----------------------------------------------------------------------------
// Header / mobile drawer / footer / floating button chrome text
// ----------------------------------------------------------------------------

export const header: HeaderContent = {
  callNowLabel: "Call Now",
  quoteLabel: "Get a Quote",
  menuOpenAriaLabel: "Open menu",
  menuCloseAriaLabel: "Close menu",
  drawerCallLabel: `Call: ${formatLocalPhone(business.phones.primary)}`,
};

export const footer: FooterContent = {
  rightsSuffix: "All rights reserved.",
};

export const floatingWhatsApp: FloatingWhatsAppContent = {
  ariaLabel: "Chat on WhatsApp",
};

// ----------------------------------------------------------------------------
// Hero
// ----------------------------------------------------------------------------

export const hero: HeroContent = {
  eyebrow: `${business.name} — ${business.city}, ${business.country}`,
  headingLead: "Marble & stone,",
  headingAccent: "carved for permanence.",
  lead: `From block to polished slab — premium marble, granite and onyx cut, finished and installed under the direct supervision of ${business.owner.name}, ${business.owner.role}.`,
  actions: [
    { label: "Request a Quote", href: "#contact", variant: "solid" },
    {
      label: "Chat on WhatsApp",
      href: `https://wa.me/${business.whatsappNumber}`,
      variant: "ghost",
      external: true,
    },
  ],
  meta: ["Est. craftsmanship · Mardan Region", "Slabs polished on site"],
  visualTexture: {
    id: "texture-hero-visual",
    baseColor: "#F1ECE0",
    baseFrequency: "0.006 0.018",
    numOctaves: 6,
    seed: 314,
    // Matches --gold (#A9803F) so the veining reads as the same gold used
    // throughout the site, not an arbitrary color.
    veinColor: [0.66, 0.5, 0.25, 0.6],
    veinOpacity: 0.75,
  },
};

// ----------------------------------------------------------------------------
// About
// ----------------------------------------------------------------------------

export const about: AboutContent = {
  eyebrow: "About the Factory",
  heading: "Built on stone, run on trust.",
  paragraphs: [
    "Wajid Marble Factory has grown into a trusted name across Mardan for sourcing, cutting and finishing marble, granite and onyx for homes, mosques, offices and commercial spaces.",
    `Every slab that leaves the yard is checked by hand — for veining, tone and finish — before it reaches a client's site. That standard is set personally by the owner, ${business.owner.name}.`,
  ],
  owner: {
    ...business.owner,
    label: "Owner",
    bio: "Overseeing sourcing, quality control and client relationships across every order placed with Wajid Marble Factory.",
    stats: [
      { value: "100%", label: "Hand-checked slabs" },
      { value: "Mardan", label: "Factory & showroom" },
    ],
  },
};

// ----------------------------------------------------------------------------
// Products — the marble/stone textures are recipes for the feTurbulence SVG
// filter in ui/MarbleSwatch.tsx, not real photos. Each `id` is unique across
// the whole page (SVG filter ids are global), and the numbers underneath are
// copied exactly from the original design so the look doesn't change.
// ----------------------------------------------------------------------------

const whiteCarraraTexture: MarbleTexture = {
  id: "texture-product-white-carrara",
  baseColor: "#EFEBE1",
  baseFrequency: "0.02 0.06",
  numOctaves: 4,
  seed: 2,
  veinColor: [0.55, 0.52, 0.47, 0.4],
  veinOpacity: 0.8,
};

const blackMarbleTexture: MarbleTexture = {
  id: "texture-product-black-marble",
  baseColor: "#17130F",
  baseFrequency: "0.015 0.05",
  numOctaves: 4,
  seed: 19,
  veinColor: [0.75, 0.6, 0.3, 0.55],
  veinOpacity: 0.9,
};

const goldenOnyxTexture: MarbleTexture = {
  id: "texture-product-golden-onyx",
  baseColor: "#E7D9BE",
  baseFrequency: "0.008 0.03",
  numOctaves: 5,
  seed: 41,
  veinColor: [0.85, 0.65, 0.25, 0.6],
  veinOpacity: 0.85,
};

const greyGraniteTexture: MarbleTexture = {
  id: "texture-product-grey-granite",
  baseColor: "#4B4B47",
  baseFrequency: "0.03 0.03",
  numOctaves: 3,
  seed: 8,
  veinColor: [0.35, 0.36, 0.34, 0.5],
  veinOpacity: 0.9,
};

export const products: ProductsContent = {
  eyebrow: "What We Offer",
  heading: "Stone for every surface.",
  description:
    "White, black and onyx marble alongside granite — cut, polished and finished to order for floors, walls and countertops.",
  items: [
    {
      id: "white-carrara-marble",
      name: "White Carrara Marble",
      tag: "Floors · Walls · Vanities",
      texture: whiteCarraraTexture,
    },
    {
      id: "black-marble",
      name: "Black Marble",
      tag: "Countertops · Feature Walls",
      texture: blackMarbleTexture,
    },
    {
      id: "golden-onyx",
      name: "Golden Onyx",
      tag: "Feature Panels · Reception",
      texture: goldenOnyxTexture,
    },
    {
      id: "grey-granite",
      name: "Grey Granite",
      tag: "Flooring · Outdoor Cladding",
      texture: greyGraniteTexture,
    },
  ],
};

// ----------------------------------------------------------------------------
// Gallery — same texture-recipe approach as products. `gridClass` matches the
// .g1–.g7 rules in src/styles/sections.css that size each mosaic tile.
// ----------------------------------------------------------------------------

export const gallery: GalleryContent = {
  eyebrow: "From the Factory Floor",
  heading: "Slabs, cuts & finished work.",
  description: "A look at the range of stone we cut, polish and install across Mardan.",
  tiles: [
    {
      id: "gallery-1",
      gridClass: "g1",
      viewBox: "0 0 400 260",
      texture: {
        id: "texture-gallery-1",
        baseColor: "#EDE7DB",
        baseFrequency: "0.012 0.04",
        numOctaves: 5,
        seed: 3,
        veinColor: [0.5, 0.47, 0.42, 0.45],
        veinOpacity: 0.85,
      },
    },
    {
      id: "gallery-2",
      gridClass: "g2",
      viewBox: "0 0 400 400",
      texture: {
        id: "texture-gallery-2",
        baseColor: "#0F0D0C",
        baseFrequency: "0.01 0.035",
        numOctaves: 5,
        seed: 55,
        veinColor: [0.15, 0.14, 0.13, 0.9],
        veinOpacity: 1,
      },
    },
    {
      id: "gallery-3",
      gridClass: "g3",
      viewBox: "0 0 300 260",
      texture: {
        id: "texture-gallery-3",
        baseColor: "#D8C7A2",
        baseFrequency: "0.02 0.05",
        numOctaves: 4,
        seed: 12,
        veinColor: [0.7, 0.55, 0.3, 0.5],
        veinOpacity: 0.85,
      },
    },
    {
      id: "gallery-4",
      gridClass: "g4",
      viewBox: "0 0 300 260",
      texture: {
        id: "texture-gallery-4",
        baseColor: "#57544C",
        baseFrequency: "0.025 0.06",
        numOctaves: 3,
        seed: 27,
        veinColor: [0.4, 0.4, 0.38, 0.4],
        veinOpacity: 0.85,
      },
    },
    {
      id: "gallery-5",
      gridClass: "g5",
      viewBox: "0 0 300 260",
      texture: {
        id: "texture-gallery-5",
        baseColor: "#F2EEE4",
        baseFrequency: "0.015 0.045",
        numOctaves: 4,
        seed: 63,
        veinColor: [0.85, 0.82, 0.74, 0.4],
        veinOpacity: 0.85,
      },
    },
    {
      id: "gallery-6",
      gridClass: "g6",
      viewBox: "0 0 400 260",
      texture: {
        id: "texture-gallery-6",
        baseColor: "#E9D8B8",
        baseFrequency: "0.01 0.03",
        numOctaves: 5,
        seed: 71,
        veinColor: [0.78, 0.6, 0.28, 0.55],
        veinOpacity: 0.85,
      },
    },
    {
      id: "gallery-7",
      gridClass: "g7",
      viewBox: "0 0 400 260",
      texture: {
        id: "texture-gallery-7",
        baseColor: "#181513",
        baseFrequency: "0.018 0.05",
        numOctaves: 4,
        seed: 90,
        veinColor: [0.2, 0.19, 0.17, 0.7],
        veinOpacity: 0.9,
      },
    },
  ],
};

// ----------------------------------------------------------------------------
// Why Us
// ----------------------------------------------------------------------------

export const reasons: ReasonsContent = {
  eyebrow: "Why Wajid Marble",
  heading: "Quality you can run your hand over.",
  description: "Four reasons builders and homeowners across Mardan keep coming back.",
  items: [
    {
      idx: "Quality",
      title: "Hand-checked stone",
      body: "Every slab is inspected for veining, tone and structural soundness before it leaves the yard.",
    },
    {
      idx: "Pricing",
      title: "Fair, direct rates",
      body: "Factory-direct pricing with no unnecessary middlemen — quoted clearly before work begins.",
    },
    {
      idx: "Delivery",
      title: "On-time installation",
      body: "Cutting, polishing and on-site fitting scheduled and delivered to the timeline you're given.",
    },
    {
      idx: "Craft",
      title: "Skilled hands",
      body: "Experienced cutters and polishers working under close supervision on every single order.",
    },
  ],
};

// ----------------------------------------------------------------------------
// Contact
// ----------------------------------------------------------------------------

export const contact: ContactContent = {
  eyebrow: "Get In Touch",
  heading: "Let's talk about your stone.",
  lead: `Call, message on WhatsApp, or send the details of your project below — ${business.owner.name}'s team will get back to you with a quote.`,
  form: {
    title: "Request a quote",
    subtitle: "Tell us about your project — we'll reply with pricing and timelines.",
    fields: {
      name: { label: "Full name", placeholder: "Your name" },
      phone: { label: "Phone number", placeholder: "03XX-XXXXXXX" },
      stone: { label: "Stone type" },
      details: { label: "Project details", placeholder: "Area, location, timeline..." },
    },
    submitLabel: "Send Request",
    submitLabelPending: "Sending…",
    note: `Or call ${formatLocalPhone(business.phones.primary)} directly for a faster response.`,
    messages: {
      validationError: "Please fix the highlighted fields below.",
      genericError: "Something went wrong. Please call or WhatsApp us instead.",
      networkError: "Couldn't reach the server. Please call or WhatsApp us instead.",
      success: "Request sent — we'll be in touch shortly.",
    },
  },
};

export const contactMethods: ContactMethod[] = [
  {
    id: "call-primary",
    icon: "phone",
    label: "Call — Primary",
    value: formatLocalPhone(business.phones.primary),
    href: `tel:+${business.phones.primary}`,
    action: "Call",
  },
  {
    id: "call-secondary",
    icon: "phone",
    label: "Call — Alternate",
    value: formatLocalPhone(business.phones.secondary),
    href: `tel:+${business.phones.secondary}`,
    action: "Call",
  },
  {
    id: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    value: "Chat directly",
    href: `https://wa.me/${business.whatsappNumber}`,
    action: "Open",
  },
  {
    id: "location",
    icon: "pin",
    label: "Factory & Showroom",
    value: `${business.city}, KP`,
  },
];

// ----------------------------------------------------------------------------
// Quote form — the dropdown of stone types a visitor can pick from. Declared
// as a `const` tuple (rather than in src/types/index.ts) so its exact string
// values can double as a literal TypeScript type and as the zod enum used to
// validate quote submissions server-side.
// ----------------------------------------------------------------------------

export const stoneOptions = [
  "White Marble",
  "Black Marble",
  "Golden Onyx",
  "Grey Granite",
  "Not sure yet",
] as const;

export type StoneOption = (typeof stoneOptions)[number];

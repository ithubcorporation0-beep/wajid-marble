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
  FaqItem,
  FloatingWhatsAppContent,
  FooterContent,
  GalleryContent,
  HeaderContent,
  HeroContent,
  MarbleTexture,
  NavLink,
  ProductsContent,
  ReasonsContent,
  SectionIntro,
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
  // TODO: get the exact street address from Nihad Ali and fill this in —
  // structured data and the Contact section's location line both pick it
  // up automatically the moment it's set, no other code changes needed.
  streetAddress: "",
  // TODO: get exact GPS coordinates for the factory/showroom (e.g.
  // long-press the location in Google Maps and copy the lat/long shown)
  // and fill these in — same auto-pickup as streetAddress above.
  geo: { latitude: "", longitude: "" },
  owner: {
    name: "Nihad Ali",
    role: "Zonal Vice Chairman, Mardan",
  },
  phones,
  whatsappNumber: phones.secondary,
  email: "nihadali6146176@gmail.com",
  serviceAreas: ["Mardan", "Nowshera", "Charsadda", "Swabi", "Peshawar"],
  seoDescription:
    "Marble, granite and golden onyx supplied and installed across Mardan, Khyber Pakhtunkhwa — factory-direct installation, every slab hand-checked.",
};

// ----------------------------------------------------------------------------
// Navigation (shared by the header, the mobile drawer, and the footer)
// ----------------------------------------------------------------------------

// These start with "/" (not just "#about") because SiteHeader/SiteFooter/
// MobileDrawer render on every page now, not just the homepage — a bare
// "#about" href would silently do nothing when clicked from, say,
// /marble-in-mardan, since that page has no #about element to scroll to.
// "/#about" always navigates to the homepage's section first, from
// anywhere on the site.
export const navLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Products", href: "/#products" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Why Us", href: "/#why" },
  { label: "Contact", href: "/#contact" },
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
  sitemapLink: { label: "Sitemap", href: "/sitemap.xml" },
};

export const floatingWhatsApp: FloatingWhatsAppContent = {
  ariaLabel: "Chat on WhatsApp",
};

// ----------------------------------------------------------------------------
// Hero
// ----------------------------------------------------------------------------

export const hero: HeroContent = {
  eyebrow: `${business.name} — ${business.city}, ${business.country}`,
  headingLead: "Premium marble & granite in Mardan —",
  headingAccent: "carved for permanence.",
  lead: `${business.name} is a marble, granite and onyx supplier in ${business.city}, cutting, polishing and installing every slab under the direct supervision of ${business.owner.name}, ${business.owner.role}.`,
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
};

// ----------------------------------------------------------------------------
// About
// ----------------------------------------------------------------------------

export const about: AboutContent = {
  eyebrow: "Marble Factory in Mardan",
  heading: "A marble factory in Mardan, built on trust.",
  paragraphs: [
    "Wajid Marble Factory has grown into a trusted name across Mardan for sourcing, cutting and finishing marble, granite and onyx for homes, mosques, offices and commercial spaces.",
    `Every slab that leaves the yard is checked by hand — for veining, tone and finish — before it reaches a client's site. That standard is set personally by the owner, ${business.owner.name}.`,
    `Supplying and installing marble and granite across ${business.serviceAreas.slice(0, -1).join(", ")} and ${business.serviceAreas[business.serviceAreas.length - 1]}.`,
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
// Products — the marble/stone textures are recipes for an feTurbulence SVG
// filter, not real photos. They're pre-rendered to static images (see
// ui/MarbleImage.tsx and scripts/generate-textures.mjs) rather than drawn as
// a live filter on every page load. Each `id` doubles as the generated
// image's filename (public/textures/<id>.jpg) — rename one here and
// regenerate, don't just edit the recipe underneath it. The numbers below
// are copied exactly from the original design so the look doesn't change.
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
  eyebrow: "Our Materials",
  heading: "Natural Stone Collection",
  description:
    "Explore our curated collection of premium marble, granite and natural stone, selected for timeless architectural and interior applications.",
  items: [
    {
      id: "white-carrara-marble",
      name: "White Carrara Marble",
      tag: "Marble flooring, walls & vanities",
      texture: whiteCarraraTexture,
      href: "/materials/white-carrara-marble",
      featured: true,
      category: "Marble",
      color: "White",
      description:
        "A bright white marble with soft grey veining, cut and polished for flooring, wall cladding and bathroom vanities. Works well in both bright, modern interiors and more traditional rooms.",
    },
    {
      id: "black-marble",
      name: "Black Marble",
      tag: "Kitchen countertops & feature walls",
      texture: blackMarbleTexture,
      href: "/materials/black-marble",
      featured: true,
      category: "Marble",
      color: "Black",
      description:
        "A deep black marble with fine gold-toned veining, finished to a high polish. Popular for kitchen countertops and feature walls where a striking contrast is wanted.",
    },
    {
      id: "golden-onyx",
      name: "Golden Onyx",
      tag: "Onyx feature panels & reception",
      texture: goldenOnyxTexture,
      href: "/materials/golden-onyx",
      featured: true,
      category: "Onyx",
      color: "Golden",
      description:
        "A warm, golden-toned onyx with rich, layered veining. Onyx is naturally translucent, so panels of this stone are often backlit for feature walls and reception counters.",
    },
    {
      id: "grey-granite",
      name: "Grey Granite",
      tag: "Granite flooring & outdoor cladding",
      texture: greyGraniteTexture,
      href: "/materials/grey-granite",
      featured: true,
      category: "Granite",
      color: "Grey",
      description:
        "A hard-wearing grey granite, cut and finished for flooring and outdoor cladding where durability and low maintenance matter more than a light color.",
    },
    // The 5 items below use real photos of Wajid Marble Factory's own
    // stone slabs (public/products/) instead of a procedural texture —
    // see MarbleImage.tsx. Names, category and color are a plain visual
    // description of each stone, not a specific commercial/quarry trade
    // name — TODO: confirm with Nihad Ali what each is actually sold as
    // and swap in the real name/category if it differs.
    {
      id: "white-veined-marble",
      name: "White Veined Marble",
      tag: "Flooring, walls & vanities",
      photoSrc: "/products/white-veined-marble.jpg",
      href: "/materials/white-veined-marble",
      featured: true,
      category: "Marble",
      color: "White",
      description:
        "A white marble with a fine, sugary crystalline texture and soft grey linear veining, polished for flooring, wall cladding and vanities.",
    },
    {
      id: "green-granite",
      name: "Green Granite",
      tag: "Countertops & flooring",
      photoSrc: "/products/green-granite.jpg",
      href: "/materials/green-granite",
      featured: true,
      category: "Granite",
      color: "Green",
      description:
        "A green-grey granite flecked with black mineral spots and pale yellow-green patches, polished for countertops and flooring.",
    },
    {
      id: "beige-travertine",
      name: "Beige Travertine",
      tag: "Flooring & wall cladding",
      photoSrc: "/products/beige-travertine.jpg",
      href: "/materials/beige-travertine",
      featured: true,
      category: "Marble",
      color: "Beige",
      description:
        "A classic beige travertine, with the natural linear banding and small surface pores characteristic of travertine, finished for flooring and wall cladding.",
    },
    {
      id: "charcoal-grey-marble",
      name: "Charcoal Grey Marble",
      tag: "Feature walls & flooring",
      photoSrc: "/products/dark-grey-marble.jpg",
      href: "/materials/charcoal-grey-marble",
      featured: true,
      category: "Marble",
      color: "Charcoal Grey",
      description:
        "A dark charcoal-grey marble with bold, cloud-like white veining, polished to a high gloss for feature walls and flooring.",
    },
    {
      id: "deep-red-marble",
      name: "Deep Red Marble",
      tag: "Feature walls & accents",
      photoSrc: "/products/red-marble.jpg",
      href: "/materials/deep-red-marble",
      // Not in the homepage's 8-item showcase grid (kept to a clean 4x2
      // layout) — still fully live on /materials and its own detail page.
      featured: false,
      category: "Marble",
      color: "Red",
      description:
        "A deep maroon-red marble with dark veining and occasional white mineral patches, polished for feature walls and decorative accents.",
    },
  ],
};

// ----------------------------------------------------------------------------
// Materials catalog — the /materials and /materials/[slug] pages built
// from products.items above (see src/app/materials/). This is just the
// intro copy for the listing page; each material's own name/category/
// color/description already lives on its Product entry.
// ----------------------------------------------------------------------------

export const materialsPageIntro = {
  eyebrow: "Our Materials",
  heading: "Browse our stone materials.",
  lead: "Every marble, granite and onyx we cut, polish and install — organized by stone type. Open one for a closer look, or call for a current quote.",
};

// ----------------------------------------------------------------------------
// Gallery — same texture-recipe approach as products. `gridClass` matches the
// .g1–.g7 rules in src/styles/sections.css that size each mosaic tile.
// ----------------------------------------------------------------------------

export const gallery: GalleryContent = {
  eyebrow: "Our Work Across Mardan",
  heading: "Marble and granite work across Mardan.",
  description: "A look at the range of stone we cut, polish and install across Mardan.",
  tiles: [
    {
      id: "gallery-1",
      gridClass: "g1",
      viewBox: "0 0 400 260",
      alt: "White marble slab with natural veining, cut and finished in Mardan",
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
      alt: "Polished black marble slab, supplied by Wajid Marble Factory in Mardan",
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
      alt: "Golden onyx stone texture with warm veining, Mardan",
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
      alt: "Grey granite slab finish, cut for flooring in Mardan",
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
      alt: "Light-toned marble slab close-up, polished in Mardan",
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
      alt: "Golden onyx feature stone with rich veining, Mardan",
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
      alt: "Dark polished black marble slab, finished in Mardan",
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
  eyebrow: "Why Choose Wajid Marble",
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
// FAQ — eyebrow/heading kept separate from `faqs` itself so `faqs` stays
// exactly the { question, answer }[] shape used both by the visible Faq
// section and by FaqJsonLd's structured data (see src/types#FaqItem).
// ----------------------------------------------------------------------------

export const faqSection: SectionIntro = {
  eyebrow: "Common Questions",
  heading: "Marble and granite questions we get asked.",
};

export const faqs: FaqItem[] = [
  {
    question: "What is the current marble rate in Mardan?",
    answer:
      "Rates depend on the stone type, slab thickness and finish, so we don't publish a fixed price list. Call or WhatsApp us with your project details and we'll get back to you with a current quote.",
  },
  {
    question: "Which marble is best for flooring in Pakistani homes?",
    answer:
      "White Carrara-style marble and grey granite are the most requested choices for home flooring — marble for its light, classic look, granite for its added resistance to scratching in high-traffic rooms. The right pick depends on your budget and how the room is used.",
  },
  {
    question: "What is the difference between marble and granite for a kitchen countertop?",
    answer:
      "Granite is harder and more resistant to heat and scratching, which is why most kitchen countertops we install are granite. Marble is softer and can stain or etch from acidic foods, so it suits lower-traffic surfaces like feature walls and vanities better than a busy kitchen counter.",
  },
  {
    question: "Do you deliver and install outside Mardan?",
    answer: `Yes — we supply and install marble, granite and onyx across ${business.serviceAreas.slice(0, -1).join(", ")} and ${business.serviceAreas[business.serviceAreas.length - 1]}. Contact us with your location and we'll confirm delivery and installation timelines.`,
  },
  {
    question: "How long does marble flooring installation take?",
    answer:
      "It depends on the size of the area, how much cutting is needed and site access — a single room is often finished in a few days, a full house takes longer. We'll give you a realistic timeline once we know the project details.",
  },
  {
    question: "Do you supply marble for mosques?",
    answer:
      "Yes — alongside homes, offices and commercial spaces, we've supplied and installed marble, granite and onyx for mosques across the region. Get in touch with the dimensions and design requirements and we'll quote it.",
  },
  {
    question: "Is onyx suitable for wall panels?",
    answer:
      "Yes — onyx is a popular choice for feature walls and reception panels because of its translucency and rich veining, especially when backlit. It's softer than granite, so we recommend it for walls and decorative panels rather than high-traffic floors.",
  },
  {
    question: "How do I get a quote from Wajid Marble Factory?",
    answer: `Call one of our numbers, message us on WhatsApp, or fill in the quote request form on this site with your project details. ${business.owner.name}'s team will get back to you with pricing and timelines.`,
  },
];

// ----------------------------------------------------------------------------
// Contact
// ----------------------------------------------------------------------------

export const contact: ContactContent = {
  eyebrow: "Marble Rates & Quotes",
  heading: "Ask for a marble rate in Mardan.",
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
    id: "email",
    icon: "email",
    label: "Email",
    value: business.email,
    href: `mailto:${business.email}`,
    action: "Email",
  },
  {
    id: "location",
    icon: "pin",
    label: "Factory & Showroom",
    // Picks up business.streetAddress automatically once it's filled in —
    // see the TODO on that field.
    value: business.streetAddress ? `${business.streetAddress}, ${business.city}, KP` : `${business.city}, KP`,
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

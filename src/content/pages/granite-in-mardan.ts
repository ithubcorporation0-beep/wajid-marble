// Content for the /granite-in-mardan page. See marble-in-mardan.ts for
// notes on how these page files work, and src/content/pages/index.ts for
// the full page list. Fields marked // TODO are placeholder copy safe to
// publish as-is, but should be replaced with real detail from Nihad Ali.
import type { ServicePageContent } from "@/types";
import { business } from "@/content/site";

export const graniteInMardan: ServicePageContent = {
  slug: "granite-in-mardan",
  navLabel: "Granite in Mardan",
  seo: {
    title: "Granite Supplier in Mardan | Wajid Marble Factory",
    description:
      "Grey granite cut, polished and installed across Mardan by Wajid Marble Factory — flooring, countertops and outdoor cladding, factory-direct.",
  },
  hero: {
    eyebrow: "Granite in Mardan",
    heading: "Granite supply & installation in Mardan",
    lead: `Durable grey granite, cut and polished at our own yard in ${business.city}, and installed by ${business.name}'s own team.`,
  },
  intro: {
    heading: "A harder-wearing stone for busy surfaces",
    paragraphs: [
      "Granite holds up to heat, scratching and daily wear better than marble, which is why it's the finish most contractors ask for on kitchen counters and outdoor flooring.",
      // TODO: confirm real granite origin/sourcing details with Nihad Ali
      // to replace this general durability claim with something more
      // specific to the stock this factory actually carries.
      `Every slab is cut to size at the ${business.city} yard and checked for consistent tone before it's scheduled for installation.`,
    ],
  },
  supply: {
    heading: "Granite we supply",
    intro: "One primary finish, stocked and cut to order.",
    items: [
      { name: "Grey Granite", description: "Flooring and outdoor cladding — built for surfaces that take daily wear." },
      // TODO: confirm whether other granite colours (black, brown, etc.)
      // are available to order, even if not stocked — if so, add them
      // here rather than implying grey is the only option.
    ],
  },
  installations: {
    heading: "Where we install granite",
    intro: `Serving ${business.serviceAreas.join(", ")}.`,
    items: ["Kitchen countertops", "Outdoor flooring & steps", "Commercial flooring", "Boundary walls & cladding"],
  },
  faq: {
    heading: "Granite in Mardan — questions we get asked",
    items: [
      {
        question: "Is granite better than marble for kitchen countertops?",
        answer: "Granite generally resists heat and scratching better than marble, which is why it's a common choice for kitchen counters. Marble is often preferred for its look in lower-wear areas like vanities and feature walls.",
      },
      {
        question: "What colour granite do you stock?",
        // TODO: confirm current colour range with Nihad Ali.
        answer: "Grey granite is our standard stocked finish. Ask our team if you're looking for a different colour for a larger order.",
      },
      {
        question: `Do you deliver granite outside ${business.city}?`,
        answer: `Yes — we regularly supply and install across ${business.serviceAreas.join(", ")}.`,
      },
      {
        question: "How is granite priced?",
        // TODO: replace with real pricing structure/guidance once agreed
        // with the client — never invent a number here.
        answer: "Pricing depends on the area, thickness and finish required. Contact us for a quote based on your project.",
      },
    ],
  },
};

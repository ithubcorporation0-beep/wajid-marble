// Content for the /onyx-in-mardan page. See marble-in-mardan.ts for notes
// on how these page files work. Fields marked // TODO are placeholder
// copy safe to publish as-is, but should be replaced with real detail
// from Nihad Ali.
import type { ServicePageContent } from "@/types";
import { business } from "@/content/site";

export const onyxInMardan: ServicePageContent = {
  slug: "onyx-in-mardan",
  navLabel: "Onyx in Mardan",
  seo: {
    title: "Golden Onyx Marble in Mardan | Wajid Marble Factory",
    description:
      "Golden onyx marble supplied and installed in Mardan by Wajid Marble Factory — feature panels and reception walls, cut and polished to order.",
  },
  hero: {
    eyebrow: "Golden Onyx in Mardan",
    heading: "Golden onyx marble in Mardan",
    lead: `A warmer, more distinctive stone for spaces that are meant to be noticed — supplied and installed by ${business.name}.`,
  },
  intro: {
    heading: "A feature stone, not a background one",
    paragraphs: [
      "Golden onyx has a warmer tone and a more visible pattern than standard marble, which is why it's usually chosen for one feature — a reception wall, a mihrab, a single accent panel — rather than an entire floor.",
      // TODO: confirm whether onyx can be backlit (a common onyx
      // installation technique that highlights the stone's translucency)
      // — if this factory offers that, it's worth a dedicated mention.
      "Because it's used in smaller quantities than marble or granite, we cut golden onyx to order rather than holding large stock — ask us what's available before planning a project around it.",
    ],
  },
  supply: {
    heading: "Onyx we supply",
    intro: "Cut to order for feature installations.",
    items: [
      { name: "Golden Onyx", description: "Feature panels and reception walls — a warmer, higher-contrast finish than standard marble." },
    ],
  },
  installations: {
    heading: "Where onyx works best",
    intro: `Serving ${business.serviceAreas.join(", ")}.`,
    items: ["Reception & lobby walls", "Mosque mihrabs & feature panels", "Office feature walls", "Bar & counter fronts"],
  },
  faq: {
    heading: "Golden onyx — questions we get asked",
    items: [
      {
        question: "What is golden onyx marble used for?",
        answer: "It's typically used as a feature stone — one accent wall, panel or counter front — rather than across a whole floor, because of its warmer tone and more visible pattern.",
      },
      {
        question: "Is golden onyx more expensive than regular marble?",
        // TODO: confirm real relative pricing before publishing a firm
        // claim — this is a reasonable general statement but should be
        // checked against this factory's actual price list.
        answer: "Onyx is generally supplied in smaller quantities than marble or granite, so pricing is usually quoted per project rather than a standard rate. Contact us for a quote.",
      },
      {
        question: "Can I see golden onyx before ordering?",
        // TODO: confirm whether there's a showroom/yard visit option —
        // if so, describe it here (address, hours) instead of this
        // generic placeholder.
        answer: "Yes — contact our team to arrange a look at current stock before committing to a project.",
      },
    ],
  },
};

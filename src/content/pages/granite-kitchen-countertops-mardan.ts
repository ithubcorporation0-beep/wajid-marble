// Content for the /granite-kitchen-countertops-mardan page — an
// application-specific landing page. See marble-in-mardan.ts for notes on
// how these page files work. Fields marked // TODO are placeholder copy
// safe to publish as-is, but should be replaced with real detail from
// Nihad Ali.
import type { ServicePageContent } from "@/types";
import { business } from "@/content/site";

export const graniteKitchenCountertopsMardan: ServicePageContent = {
  slug: "granite-kitchen-countertops-mardan",
  navLabel: "Granite Countertops",
  seo: {
    title: "Granite Kitchen Countertops in Mardan | Wajid Marble",
    description:
      "Granite kitchen countertops cut, polished and fitted across Mardan by Wajid Marble Factory. Heat- and scratch-resistant, factory-direct pricing.",
  },
  hero: {
    eyebrow: "Granite Kitchen Countertops",
    heading: "Granite kitchen countertops in Mardan",
    lead: `Cut to your kitchen's exact layout and fitted by ${business.name}'s own team — not measured by one company and installed by another.`,
  },
  intro: {
    heading: "The counter your kitchen actually uses every day",
    paragraphs: [
      "A kitchen counter takes more daily wear than almost any other surface in the house — hot pans, knives, spills — which is why granite, not marble, is what we recommend for most kitchens.",
      // TODO: confirm real edge-profile and sink-cutout options available
      // (bullnose, bevel, undermount sink cutouts, etc.) so this can be a
      // concrete spec list rather than omitted.
      "We cut to the kitchen's exact template, not a standard size, so seams land where they're least visible and cutouts for the sink and hob are measured before the slab is cut, not after.",
    ],
  },
  supply: {
    heading: "Countertop stone we supply",
    intro: "One finish, cut to your kitchen's exact template.",
    items: [
      { name: "Grey Granite", description: "The standard countertop finish — resists heat, scratching and daily wear." },
      // TODO: if other granite colours or marble countertop options are
      // offered for buyers who want a different look, list them here.
    ],
  },
  installations: {
    heading: "Where we fit countertops",
    intro: `Serving ${business.serviceAreas.join(", ")}.`,
    items: ["Home kitchens", "Kitchen islands", "Utility & laundry counters", "Commercial kitchen counters"],
  },
  faq: {
    heading: "Granite countertops — questions we get asked",
    items: [
      {
        question: "How do you measure for a granite countertop?",
        // TODO: confirm the real process (site visit + template, or
        // measurements provided by the client/contractor) so this
        // reflects how the factory actually works.
        answer: "We take exact measurements — or a template — of your kitchen layout before cutting, so the counter fits precisely, including any sink or hob cutouts.",
      },
      {
        question: "Is granite safe to put hot pans on?",
        answer: "Granite handles heat significantly better than laminate or most engineered stone, which is one of the main reasons it's chosen for kitchen counters. We'd still recommend a trivet for anything straight off the stove.",
      },
      {
        question: "How long does a countertop installation take?",
        // TODO: replace with a real typical timeline once confirmed.
        answer: "Once measurements are confirmed, cutting and polishing is scheduled, then fitted on-site — we'll give you a specific timeline when you request a quote.",
      },
    ],
  },
};

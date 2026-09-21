// Content for the /marble-in-mardan page — one of the SEO landing pages
// described in src/components/sections/ServicePageLayout.tsx. Edit the
// text here, not in any component file. Fields with a // TODO comment
// above them are placeholder copy: safe to publish as-is, but should be
// replaced with real detail from Nihad Ali before this page is treated as
// finished. See src/content/pages/index.ts for the full page list.
import type { ServicePageContent } from "@/types";
import { business } from "@/content/site";

export const marbleInMardan: ServicePageContent = {
  slug: "marble-in-mardan",
  navLabel: "Marble in Mardan",
  seo: {
    title: "Marble Suppliers in Mardan | Wajid Marble Factory",
    description:
      "White Carrara and black marble cut, polished and installed across Mardan by Wajid Marble Factory. Factory-direct pricing, every slab hand-checked.",
  },
  hero: {
    eyebrow: "Marble in Mardan",
    heading: "Marble supply & installation in Mardan",
    lead: `Premium white and black marble, cut, polished and installed by ${business.name} — under the direct supervision of ${business.owner.name}, ${business.owner.role}.`,
  },
  intro: {
    heading: "Marble finished the way Mardan builds",
    paragraphs: [
      `${business.name} sources, cuts and polishes marble at our own yard in ${business.city}, rather than reselling slabs cut elsewhere. That means every piece that reaches a client's site has already been checked by hand for veining, tone and finish.`,
      // TODO: confirm with Nihad Ali whether the marble is sourced locally
      // (which quarry/region) or imported, and name it here — "sourced
      // the way Mardan builds" currently avoids the question rather than
      // answering it, which is a missed trust signal once we know.
      "Whether it's a single vanity top or a full house of flooring, the same standard applies: nothing leaves the yard until it's been inspected against the piece next to it.",
    ],
  },
  supply: {
    heading: "Marble we supply",
    intro: "Two marble finishes, stocked and cut to order.",
    items: [
      { name: "White Carrara Marble", description: "Floors, walls and vanities — the most requested finish for homes and mosques alike." },
      { name: "Black Marble", description: "Countertops and feature walls, for a sharper, more formal finish." },
      // TODO: confirm exact slab sizes/thicknesses available so this can
      // be a real spec line rather than omitted.
    ],
  },
  installations: {
    heading: "Where we install marble",
    intro: `Serving ${business.serviceAreas.join(", ")}.`,
    items: ["Home flooring", "Staircases", "Wall cladding", "Vanities & countertops", "Mosque interiors"],
  },
  faq: {
    heading: "Marble in Mardan — questions we get asked",
    items: [
      {
        question: "What marble types does Wajid Marble Factory supply?",
        answer: "White Carrara marble and black marble, both cut and polished at our Mardan yard. See our full stone range, including granite and golden onyx, on the homepage.",
      },
      {
        question: `Do you install marble outside ${business.city}?`,
        answer: `Yes — we regularly install across ${business.serviceAreas.join(", ")}. Call or WhatsApp us to confirm delivery for your specific area.`,
      },
      {
        question: "How long does a marble installation take?",
        // TODO: replace with a real typical turnaround (e.g. "a standard
        // living room floor takes X–Y days") once confirmed with Nihad Ali.
        answer: "Turnaround depends on the size of the area and how much cutting/polishing it needs — we confirm a timeline with you at the quote stage.",
      },
      {
        question: "Do you offer a warranty on marble installation?",
        // TODO: state the real policy here, if one exists — remove this
        // question entirely if the factory doesn't offer a formal warranty.
        answer: "Ask our team about the guarantee that applies to your specific project when you request a quote.",
      },
    ],
  },
};

// Content for the /marble-flooring-mardan page — an application-specific
// landing page (as opposed to marble-in-mardan.ts, which is product-led).
// See marble-in-mardan.ts for notes on how these page files work. Fields
// marked // TODO are placeholder copy safe to publish as-is, but should be
// replaced with real detail from Nihad Ali.
import type { ServicePageContent } from "@/types";
import { business } from "@/content/site";

export const marbleFlooringMardan: ServicePageContent = {
  slug: "marble-flooring-mardan",
  navLabel: "Marble Flooring",
  seo: {
    title: "Marble Flooring Installation in Mardan | Wajid Marble",
    description:
      "Marble flooring cut, polished and installed across Mardan by Wajid Marble Factory. White and black marble, factory-direct, hand-checked slabs.",
  },
  hero: {
    eyebrow: "Marble Flooring",
    heading: "Marble flooring, cut and installed in Mardan",
    lead: `From measuring the room to the final polish, ${business.name} handles marble flooring as one job — not a slab sale followed by someone else's installation.`,
  },
  intro: {
    heading: "Flooring is where fit matters most",
    paragraphs: [
      "A flooring job lives or dies on how well the pieces match at every joint — tone, veining and cut all have to line up across a whole room, not just look good as individual slabs.",
      // TODO: describe the actual installation process/team here if
      // there's something specific worth mentioning (e.g. how many
      // installers, how flooring is laid out/matched before cutting).
      "That's the part of the job we do in-house: slabs are selected and laid out together before a single cut is made, so the veining reads as one continuous floor rather than a row of mismatched pieces.",
    ],
  },
  supply: {
    heading: "Marble for flooring",
    intro: "Two finishes commonly used for floors.",
    items: [
      { name: "White Carrara Marble", description: "The most requested flooring finish — bright, classic, and forgiving of a busy room." },
      { name: "Black Marble", description: "A bolder floor finish, often used for entryways or a single contrasting room." },
    ],
  },
  installations: {
    heading: "Where we install marble flooring",
    intro: `Serving ${business.serviceAreas.join(", ")}.`,
    items: ["Living rooms & lounges", "Entryways & lobbies", "Staircases", "Mosque prayer halls"],
  },
  faq: {
    heading: "Marble flooring — questions we get asked",
    items: [
      {
        question: "How much marble do I need for an average room?",
        // TODO: this needs a real, checked answer — either a rule of
        // thumb from Nihad Ali or a note that it's confirmed on-site
        // during a measurement visit. Do not leave a made-up figure.
        answer: "It depends on the room's exact dimensions and any cutting around fixtures. We confirm the amount needed during a site visit or from the measurements you provide.",
      },
      {
        question: "Does marble flooring need special maintenance?",
        // TODO: confirm real maintenance guidance to give here — this is
        // a generally true but generic answer.
        answer: "Marble is a natural stone and benefits from being cleaned with a pH-neutral cleaner rather than harsh acidic products, which can dull the polish over time.",
      },
      {
        question: "Can marble flooring be installed over existing tile?",
        // TODO: confirm real answer — this varies by installer and
        // substrate, and shouldn't be stated as a blanket yes/no without
        // checking.
        answer: "It depends on the condition of the existing floor. Our team can advise after seeing the space.",
      },
    ],
  },
};

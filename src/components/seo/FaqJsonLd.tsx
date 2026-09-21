// Renders FAQPage structured data for a page's FAQ section — the block
// that lets Google show a page's questions directly in search results as
// expandable "People also ask"-style entries, instead of a visitor having
// to click through to find the answer. Takes the same FaqItem list the
// visible FAQ block on the page renders, so the structured data and the
// visible text can never say something different from each other.
import type { FaqItem } from "@/types";

export default function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

// Renders BreadcrumbList structured data — tells Google the page's place
// in the site's hierarchy (Home > Marble in Mardan), which is what lets
// search results show that trail under the page's title instead of just
// the raw URL. Pairs with the visible src/components/ui/Breadcrumbs.tsx,
// built from the same list of crumbs so the two can't disagree.
import type { BreadcrumbItem } from "@/types";
import { env } from "@/lib/env";

export default function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      // Google's own guidance treats the last crumb's `item` URL as
      // optional, since it's just the page the breadcrumb is already on
      // — so it's left out entirely rather than guessed at.
      ...(item.href ? { item: `${env.NEXT_PUBLIC_SITE_URL}${item.href}` } : {}),
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

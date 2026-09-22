// Renders the site's structured data — a block of machine-readable facts
// about the business, invisible to visitors, that search engines read to
// power richer results: a Maps listing, a knowledge-panel-style info box,
// the business's service area, and its product range. Everything here is
// built from src/content/site.ts, never re-typed — so if a phone number,
// address or product ever changes, this stays correct automatically
// instead of silently drifting out of sync with the rest of the site.
import { business, products } from "@/content/site";
import { env } from "@/lib/env";

function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    // A subtype of LocalBusiness for businesses supplying/installing
    // construction and home-improvement materials — a closer match than
    // the generic LocalBusiness type for a marble and granite factory.
    "@type": "HomeAndConstructionBusiness",
    // schema.org's additionalType expects a URL to an external type
    // definition. Rather than link to an unverified third-party taxonomy
    // entry, this uses a plain descriptive string, which structured-data
    // validators accept and which never risks pointing somewhere wrong.
    additionalType: "Marble, Granite and Onyx Supplier",
    name: business.name,
    description: business.seoDescription,
    url: env.NEXT_PUBLIC_SITE_URL,
    telephone: [`+${business.phones.primary}`, `+${business.phones.secondary}`],
    address: {
      "@type": "PostalAddress",
      // Omitted while business.streetAddress is still the empty-string
      // TODO placeholder — a blank streetAddress is worse than none.
      ...(business.streetAddress ? { streetAddress: business.streetAddress } : {}),
      addressLocality: business.city,
      addressRegion: business.addressRegion,
      addressCountry: business.countryCode,
    },
    // Omitted entirely while business.geo is still its empty-string TODO
    // placeholder, for the same reason — see the field's own comment.
    ...(business.geo.latitude && business.geo.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: business.geo.latitude,
            longitude: business.geo.longitude,
          },
        }
      : {}),
    areaServed: business.serviceAreas,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${business.name} Stone Range`,
      itemListElement: products.items.map((product) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: product.name,
          description: product.tag,
        },
      })),
    },
  };
}

export default function LocalBusinessJsonLd() {
  const jsonLd = buildLocalBusinessJsonLd();

  return (
    // All of this comes from our own trusted content (src/content/site.ts)
    // and environment variables, never from visitor input, so embedding it
    // directly is safe.
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

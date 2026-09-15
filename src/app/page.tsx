// This is the homepage — what visitors see at the site's root address ("/").
// It assembles the section components in the same order the original
// single-page design used, plus the JSON-LD block below. The header, footer
// and floating WhatsApp button aren't repeated here because they live in
// layout.tsx, which wraps every page (there's currently only this one).
import { business, products } from "@/content/site";
import { env } from "@/lib/env";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import VeinDivider from "@/components/ui/VeinDivider";
import Products from "@/components/sections/Products";
import Gallery from "@/components/sections/Gallery";
import WhyUs from "@/components/sections/WhyUs";
import Contact from "@/components/sections/Contact";

// JSON-LD is a block of structured data search engines read (but visitors
// never see) to understand what this page is about in a machine-readable
// way. A "LocalBusiness" block like this one is what lets a business show
// up with its address, phone number and hours directly in Google search
// results and Google Maps, instead of just as a plain blue link.
function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: `Premium marble, granite and onyx cut, polished and installed by ${business.name} in ${business.city}, ${business.addressRegion}.`,
    url: env.NEXT_PUBLIC_SITE_URL,
    telephone: [`+${business.phones.primary}`, `+${business.phones.secondary}`],
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressRegion: business.addressRegion,
      addressCountry: business.countryCode,
    },
    makesOffer: products.items.map((product) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: product.name,
        description: product.tag,
      },
    })),
  };
}

export default function HomePage() {
  const jsonLd = buildLocalBusinessJsonLd();

  return (
    <>
      {/* All of this comes from our own trusted content (src/content/site.ts)
          and environment variables, never from visitor input, so embedding
          it directly is safe. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <VeinDivider />
      <Products />
      <Gallery />
      <WhyUs />
      <Contact />
    </>
  );
}

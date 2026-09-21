// The /contact route. Reuses the exact same Contact section the homepage
// shows at #contact (contact methods + quote form, from
// src/components/sections/Contact.tsx) rather than duplicating that
// content on a second page — the only difference is this page renders its
// heading as an <h1> instead of an <h2>, since here it's the whole page's
// only heading, not one section among several.
import type { Metadata } from "next";
import type { BreadcrumbItem } from "@/types";
import Contact from "@/components/sections/Contact";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: "Contact" }];

const title = "Contact Wajid Marble Factory | Marble in Mardan";
const description =
  "Get a marble, granite or onyx quote from Wajid Marble Factory in Mardan. Call, WhatsApp or send your project details — we reply with pricing.";

export function generateMetadata(): Metadata {
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description },
  };
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Contact headingTag="h1" breadcrumbs={breadcrumbs} />
    </>
  );
}

// The /granite-kitchen-countertops-mardan route. All the actual text lives
// in src/content/pages/granite-kitchen-countertops-mardan.ts — this file
// just wires that content into the shared ServicePageLayout and sets this
// page's own metadata + structured data.
import type { Metadata } from "next";
import type { BreadcrumbItem } from "@/types";
import { env } from "@/lib/env";
import { graniteKitchenCountertopsMardan } from "@/content/pages/granite-kitchen-countertops-mardan";
import ServicePageLayout from "@/components/sections/ServicePageLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FaqJsonLd from "@/components/seo/FaqJsonLd";

const breadcrumbs: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: graniteKitchenCountertopsMardan.navLabel },
];

export function generateMetadata(): Metadata {
  return {
    title: { absolute: graniteKitchenCountertopsMardan.seo.title },
    description: graniteKitchenCountertopsMardan.seo.description,
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/${graniteKitchenCountertopsMardan.slug}` },
    openGraph: {
      title: graniteKitchenCountertopsMardan.seo.title,
      description: graniteKitchenCountertopsMardan.seo.description,
    },
  };
}

export default function GraniteKitchenCountertopsMardanPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd items={graniteKitchenCountertopsMardan.faq.items} />
      <ServicePageLayout content={graniteKitchenCountertopsMardan} breadcrumbs={breadcrumbs} />
    </>
  );
}

// The /granite-in-mardan route. All the actual text lives in
// src/content/pages/granite-in-mardan.ts — this file just wires that
// content into the shared ServicePageLayout and sets this page's own
// metadata + structured data.
import type { Metadata } from "next";
import type { BreadcrumbItem } from "@/types";
import { graniteInMardan } from "@/content/pages/granite-in-mardan";
import ServicePageLayout from "@/components/sections/ServicePageLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FaqJsonLd from "@/components/seo/FaqJsonLd";

const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: graniteInMardan.navLabel }];

export function generateMetadata(): Metadata {
  return {
    title: { absolute: graniteInMardan.seo.title },
    description: graniteInMardan.seo.description,
    openGraph: { title: graniteInMardan.seo.title, description: graniteInMardan.seo.description },
  };
}

export default function GraniteInMardanPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd items={graniteInMardan.faq.items} />
      <ServicePageLayout content={graniteInMardan} breadcrumbs={breadcrumbs} />
    </>
  );
}

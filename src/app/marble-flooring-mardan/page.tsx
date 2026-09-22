// The /marble-flooring-mardan route. All the actual text lives in
// src/content/pages/marble-flooring-mardan.ts — this file just wires that
// content into the shared ServicePageLayout and sets this page's own
// metadata + structured data.
import type { Metadata } from "next";
import type { BreadcrumbItem } from "@/types";
import { env } from "@/lib/env";
import { marbleFlooringMardan } from "@/content/pages/marble-flooring-mardan";
import ServicePageLayout from "@/components/sections/ServicePageLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FaqJsonLd from "@/components/seo/FaqJsonLd";

const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: marbleFlooringMardan.navLabel }];

export function generateMetadata(): Metadata {
  return {
    title: { absolute: marbleFlooringMardan.seo.title },
    description: marbleFlooringMardan.seo.description,
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/${marbleFlooringMardan.slug}` },
    openGraph: { title: marbleFlooringMardan.seo.title, description: marbleFlooringMardan.seo.description },
  };
}

export default function MarbleFlooringMardanPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd items={marbleFlooringMardan.faq.items} />
      <ServicePageLayout content={marbleFlooringMardan} breadcrumbs={breadcrumbs} />
    </>
  );
}

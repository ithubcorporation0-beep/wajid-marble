// The /onyx-in-mardan route. All the actual text lives in
// src/content/pages/onyx-in-mardan.ts — this file just wires that content
// into the shared ServicePageLayout and sets this page's own metadata +
// structured data.
import type { Metadata } from "next";
import type { BreadcrumbItem } from "@/types";
import { env } from "@/lib/env";
import { onyxInMardan } from "@/content/pages/onyx-in-mardan";
import ServicePageLayout from "@/components/sections/ServicePageLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FaqJsonLd from "@/components/seo/FaqJsonLd";

const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: onyxInMardan.navLabel }];

export function generateMetadata(): Metadata {
  return {
    title: { absolute: onyxInMardan.seo.title },
    description: onyxInMardan.seo.description,
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/${onyxInMardan.slug}` },
    openGraph: { title: onyxInMardan.seo.title, description: onyxInMardan.seo.description },
  };
}

export default function OnyxInMardanPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd items={onyxInMardan.faq.items} />
      <ServicePageLayout content={onyxInMardan} breadcrumbs={breadcrumbs} />
    </>
  );
}

// The /marble-in-mardan route. All the actual text lives in
// src/content/pages/marble-in-mardan.ts — this file just wires that
// content into the shared ServicePageLayout and sets this page's own
// metadata + structured data.
import type { Metadata } from "next";
import type { BreadcrumbItem } from "@/types";
import { env } from "@/lib/env";
import { marbleInMardan } from "@/content/pages/marble-in-mardan";
import ServicePageLayout from "@/components/sections/ServicePageLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FaqJsonLd from "@/components/seo/FaqJsonLd";

const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: marbleInMardan.navLabel }];

export function generateMetadata(): Metadata {
  return {
    // `absolute` renders exactly this string, bypassing the root layout's
    // title template — needed because marbleInMardan.seo.title already
    // ends with "| Wajid Marble Factory", so letting the template append
    // the business name again would show it twice.
    title: { absolute: marbleInMardan.seo.title },
    description: marbleInMardan.seo.description,
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/${marbleInMardan.slug}` },
    openGraph: { title: marbleInMardan.seo.title, description: marbleInMardan.seo.description },
  };
}

export default function MarbleInMardanPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd items={marbleInMardan.faq.items} />
      <ServicePageLayout content={marbleInMardan} breadcrumbs={breadcrumbs} />
    </>
  );
}

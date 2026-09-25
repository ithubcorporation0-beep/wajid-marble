// The /materials route: a catalog grid of every stone Wajid Marble Factory
// supplies, each linking through to its own detail page
// (src/app/materials/[slug]/page.tsx).
import type { Metadata } from "next";
import Link from "next/link";
import type { BreadcrumbItem } from "@/types";
import { business, products, materialsPageIntro } from "@/content/site";
import { env } from "@/lib/env";
import { getMaterialGalleryImages } from "@/lib/materials";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: "Materials" }];

const title = `Stone Materials | ${business.name}`;
const description = `Browse every marble, granite and onyx ${business.name} supplies and installs in ${business.city} — organized by stone type.`;

export function generateMetadata(): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/materials` },
    openGraph: { title, description },
  };
}

export default function MaterialsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      <section className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={breadcrumbs} />
          <div className="eyebrow">{materialsPageIntro.eyebrow}</div>
          <h1>{materialsPageIntro.heading}</h1>
          <p className="page-hero-lead">{materialsPageIntro.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="materials-grid">
            {products.items.map((product) => (
              <Link key={product.id} href={product.href} className="material-card">
                <div className="material-card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static local asset, see MarbleImage.tsx */}
                  <img src={getMaterialGalleryImages(product)[0].src} alt="" />
                </div>
                <div className="material-card-category">{product.category}</div>
                <div className="material-card-name">{product.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

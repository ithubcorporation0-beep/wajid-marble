// The /materials/[slug] route: one detail page per stone in
// products.items (src/content/site.ts) — a photo gallery, its category/
// color, a longer description, and the same quote-request form every
// service page ends with.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { BreadcrumbItem } from "@/types";
import { business, products, contact } from "@/content/site";
import { env } from "@/lib/env";
import { getMaterialGalleryImages } from "@/lib/materials";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import MaterialGallery from "@/components/materials/MaterialGallery";
import Reveal from "@/components/ui/Reveal";
import QuoteForm from "@/components/forms/QuoteForm";

function findProduct(slug: string) {
  return products.items.find((product) => product.id === slug);
}

export function generateStaticParams() {
  return products.items.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};

  const title = `${product.name} | ${business.name}`;
  return {
    title: { absolute: title },
    description: product.description,
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/materials/${product.id}` },
    openGraph: { title, description: product.description },
  };
}

export default async function MaterialDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Materials", href: "/materials" },
    { label: product.name },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      <section className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={breadcrumbs} />
          <div className="eyebrow">{product.category}</div>
          <h1>{product.name}</h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap material-detail-grid">
          <MaterialGallery images={getMaterialGalleryImages(product)} materialName={product.name} />
          <div>
            <dl className="material-specs">
              <div>
                <dt>Category</dt>
                <dd>{product.category}</dd>
              </div>
              <div>
                <dt>Color</dt>
                <dd>{product.color}</dd>
              </div>
              <div>
                <dt>Typical use</dt>
                <dd>{product.tag}</dd>
              </div>
            </dl>
            <p className="material-description">{product.description}</p>
          </div>
        </div>
      </section>

      <section className="contact section">
        <div className="wrap">
          <div className="eyebrow">{contact.eyebrow}</div>
          <h2>{contact.heading}</h2>
          <p className="lead">{contact.lead}</p>
          <div style={{ maxWidth: 560, marginTop: 50 }}>
            <Reveal className="form-card">
              <h3>{contact.form.title}</h3>
              <div className="sub">{contact.form.subtitle}</div>
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

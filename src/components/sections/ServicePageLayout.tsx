// The shared skeleton every SEO landing page (src/app/<slug>/page.tsx) is
// built from: a page header with the h1, an intro, a "what we supply"
// grid, a "where we install" grid, an FAQ list, and a quote request form
// at the bottom. Each page just passes its own content object (see
// src/content/pages/) — nothing here is page-specific, so a new page is
// just a new content file plus a new route, not new layout code.
import { contact } from "@/content/site";
import type { BreadcrumbItem, ServicePageContent } from "@/types";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import QuoteForm from "@/components/forms/QuoteForm";

export default function ServicePageLayout({
  content,
  breadcrumbs,
}: {
  content: ServicePageContent;
  breadcrumbs: BreadcrumbItem[];
}) {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={breadcrumbs} />
          <div className="eyebrow">{content.hero.eyebrow}</div>
          <h1>{content.hero.heading}</h1>
          <p className="page-hero-lead">{content.hero.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2>{content.intro.heading}</h2>
            {content.intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <div className="eyebrow">Supply</div>
              <h2>{content.supply.heading}</h2>
            </div>
            <p>{content.supply.intro}</p>
          </Reveal>
          <div className="info-grid">
            {content.supply.items.map((item) => (
              <div className="info-card" key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <div className="eyebrow">Installations</div>
              <h2>{content.installations.heading}</h2>
            </div>
            <p>{content.installations.intro}</p>
          </Reveal>
          <div className="info-grid">
            {content.installations.items.map((location) => (
              <div className="info-card" key={location}>
                <h3>{location}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2>{content.faq.heading}</h2>
            <div className="faq-list">
              {content.faq.items.map((item) => (
                <div className="faq-item" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </Reveal>
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

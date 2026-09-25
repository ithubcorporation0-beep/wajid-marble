// The "Get In Touch" section: the list of ways to reach the business next to
// the quote request form (QuoteForm, a client component — everything else
// on this page stays server-rendered).
import type { ReactNode } from "react";
import { contact, contactMethods } from "@/content/site";
import type { BreadcrumbItem, ContactMethodIcon } from "@/types";
import Reveal from "@/components/ui/Reveal";
import QuoteForm from "@/components/forms/QuoteForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const ICONS: Record<ContactMethodIcon, ReactNode> = {
  phone: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-soft)" strokeWidth="1.6" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  whatsapp: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-soft)" strokeWidth="1.6" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  pin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-soft)" strokeWidth="1.6" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  email: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-soft)" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  ),
};

export default function Contact({
  headingTag: HeadingTag = "h2",
  breadcrumbs,
}: {
  /** The homepage renders this section after the real <h1> in Hero, so its
   * own heading is an <h2> by default. The standalone /contact page (see
   * src/app/contact/page.tsx) reuses this exact component as the whole
   * page, and needs that same heading to BE the page's one <h1> instead —
   * passing headingTag="h1" swaps just the tag, not the text or styling. */
  headingTag?: "h1" | "h2";
  /** Only the standalone /contact page passes this — the homepage doesn't,
   * so nothing renders there and its layout is unchanged. */
  breadcrumbs?: BreadcrumbItem[];
} = {}) {
  return (
    <section className="contact section" id="contact">
      <div className="wrap">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="eyebrow">{contact.eyebrow}</div>
        <HeadingTag>{contact.heading}</HeadingTag>
        <p className="lead">{contact.lead}</p>

        <div className="contact-grid" style={{ marginTop: 50 }}>
          <Reveal>
            <div className="contact-methods">
              {contactMethods.map((method) => (
                <div className="contact-method" key={method.id}>
                  <div className="cm-left">
                    <div className="cm-icon">{ICONS[method.icon]}</div>
                    <div>
                      <div className="cm-label">{method.label}</div>
                      <div className="cm-value">{method.value}</div>
                    </div>
                  </div>
                  {method.href && method.action ? (
                    <a
                      href={method.href}
                      className="cm-action"
                      {...(method.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                    >
                      {method.action}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="form-card">
            <h3>{contact.form.title}</h3>
            <div className="sub">{contact.form.subtitle}</div>
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

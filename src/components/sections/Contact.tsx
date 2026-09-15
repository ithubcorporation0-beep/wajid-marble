// The "Get In Touch" section: the list of ways to reach the business next to
// the quote request form. The form itself (QuoteForm, a client component)
// is deliberately not wired in yet — this section renders a plain
// placeholder in its place until the form is built.
import type { ReactNode } from "react";
import { contact, contactMethods } from "@/content/site";
import type { ContactMethodIcon } from "@/types";
import Reveal from "@/components/ui/Reveal";

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
};

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="wrap">
        <div className="eyebrow">{contact.eyebrow}</div>
        <h2>{contact.heading}</h2>
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
            <p style={{ color: "rgba(237,232,222,0.4)", fontSize: "0.85rem" }}>
              The quote request form goes here — built in the next step.
            </p>
            <div className="form-note">{contact.form.note}</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

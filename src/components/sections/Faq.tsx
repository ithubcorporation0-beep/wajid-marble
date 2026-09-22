// The "Common Questions" section: reuses the same .faq-list/.faq-item
// styling already built for the SEO service pages (see
// ServicePageLayout.tsx), paired with FaqJsonLd so the same questions can
// also show up as a rich result in Google search.
import { faqSection, faqs } from "@/content/site";
import Reveal from "@/components/ui/Reveal";

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="eyebrow">{faqSection.eyebrow}</div>
              <h2>{faqSection.heading}</h2>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((item) => (
              <div className="faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

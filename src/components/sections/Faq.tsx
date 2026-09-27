// The "Common Questions" section: reuses the same FaqAccordion component
// built for the SEO service pages (see ServicePageLayout.tsx), paired
// with FaqJsonLd so the same questions can also show up as a rich result
// in Google search.
import { faqSection, faqs } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import FaqAccordion from "@/components/ui/FaqAccordion";

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

          <FaqAccordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}

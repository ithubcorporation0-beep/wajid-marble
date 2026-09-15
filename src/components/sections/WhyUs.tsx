// The "Why Choose Us" section: a four-column grid of reasons clients keep
// coming back. The whole grid reveals together as one block, matching the
// original design (individual cards inside it don't animate separately).
import { reasons } from "@/content/site";
import Reveal from "@/components/ui/Reveal";

export default function WhyUs() {
  return (
    <section className="why section" id="why">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="eyebrow">{reasons.eyebrow}</div>
            <h2>{reasons.heading}</h2>
          </div>
          <p>{reasons.description}</p>
        </Reveal>
      </div>

      <Reveal className="why-grid">
        {reasons.items.map((reason) => (
          <div key={reason.idx} className="why-item">
            <div className="idx">{reason.idx}</div>
            <h3>{reason.title}</h3>
            <p>{reason.body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

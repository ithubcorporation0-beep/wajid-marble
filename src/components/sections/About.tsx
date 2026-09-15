// The "About the Factory" section: an introduction to the business next to
// the owner's info card and stats. Server component — the only client-side
// behavior on the page (the scroll-reveal animation) is delegated to Reveal.
import { about } from "@/content/site";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="wrap about-grid">
        <Reveal>
          <div className="eyebrow">{about.eyebrow}</div>
          <h2>{about.heading}</h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal className="owner-card">
          <div className="label">{about.owner.label}</div>
          <div className="name">{about.owner.name}</div>
          <div className="role">{about.owner.role}</div>
          <p style={{ color: "rgba(237,232,222,0.68)", fontSize: "0.92rem", lineHeight: 1.7 }}>
            {about.owner.bio}
          </p>
          <div className="stat-row">
            {about.owner.stats.map((stat) => (
              <div key={stat.label}>
                <div className="num">{stat.value}</div>
                <div className="lab">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

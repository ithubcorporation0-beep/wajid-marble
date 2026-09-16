// The full-height introduction visitors see first: a two-column layout with
// the headline/copy/actions on the left and a large book-matched marble
// panel (MarblePanel) filling the right side. Nothing here is interactive,
// so this stays a server component.
import { hero } from "@/content/site";
import MarblePanel from "@/components/ui/MarblePanel";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-text">
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1>
            {hero.headingLead}
            <br />
            <span className="accent">{hero.headingAccent}</span>
          </h1>
          <p className="lead">{hero.lead}</p>
          <div className="hero-actions">
            {hero.actions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                className={`btn btn-${action.variant}`}
                {...(action.external ? { target: "_blank", rel: "noopener" } : {})}
              >
                {action.label}
              </a>
            ))}
          </div>
          <div className="hero-meta">
            {hero.meta[0]}
            <br />
            {hero.meta[1]}
          </div>
        </div>

        <div className="hero-visual">
          <MarblePanel texture={hero.visualTexture} />
        </div>
      </div>
    </section>
  );
}

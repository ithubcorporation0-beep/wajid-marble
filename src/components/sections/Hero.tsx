// The full-height introduction visitors see first. The turbulent
// marble-texture background here is a one-off (a gradient plus a filter
// region that's shaped differently from the reusable MarbleSwatch recipe),
// so — unlike the product/gallery textures — it's just written directly as
// markup rather than modeled as content data. Nothing here is interactive,
// so this stays a server component.
import { hero } from "@/content/site";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-marble-bg" aria-hidden="true">
        <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="marbleHero" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.010 0.028" numOctaves={5} seed={7} result="noise" />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 0.90
                        0 0 0 0 0.87
                        0 0 0 0 0.79
                        0 0 0 0.85 0"
                result="veins"
              />
              <feComposite in="veins" in2="SourceGraphic" operator="over" />
            </filter>
            <linearGradient id="baseFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a352c" />
              <stop offset="100%" stopColor="#141210" />
            </linearGradient>
          </defs>
          <rect width="1400" height="900" fill="url(#baseFade)" />
          <rect width="1400" height="900" filter="url(#marbleHero)" opacity="0.9" />
        </svg>
      </div>
      <div className="hero-fade" />

      <div className="hero-content">
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
      </div>

      <div className="hero-meta">
        {hero.meta[0]}
        <br />
        {hero.meta[1]}
      </div>
    </section>
  );
}

// The header bar pinned to the top of every page: the logo, the desktop
// navigation links, and the "Call Now" / "Get a Quote" buttons. It's a
// plain server component — nothing here needs to run in the browser. The
// mobile hamburger menu (which does need browser state) lives entirely
// inside MobileDrawer, rendered here in place of where that button sits.
import { business, header, navLinks } from "@/content/site";
import MobileDrawer from "./MobileDrawer";

export default function SiteHeader() {
  return (
    <header>
      <div className="nav">
        <a href="#top" className="brand">
          <span className="mark">
            {business.brandPrefix} <em>{business.brandEmphasis}</em>
          </span>
          <span className="sub">{business.tagline}</span>
        </a>

        <nav className="links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <a href={`tel:+${business.phones.primary}`} className="btn btn-ghost">
            {header.callNowLabel}
          </a>
          <a href="#contact" className="btn btn-solid">
            {header.quoteLabel}
          </a>
          <MobileDrawer />
        </div>
      </div>
    </header>
  );
}

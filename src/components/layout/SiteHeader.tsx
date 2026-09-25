// The header bar pinned to the top of every page: the logo, the desktop
// navigation links, and the "Call Now" / "Get a Quote" buttons. It's a
// plain server component — nothing here needs to run in the browser. The
// mobile hamburger menu (which does need browser state) lives entirely
// inside MobileDrawer, rendered here in place of where that button sits.
import Link from "next/link";
import { business, header, navLinks } from "@/content/site";
import MobileDrawer from "./MobileDrawer";

export default function SiteHeader() {
  return (
    <header>
      <div className="nav">
        {/* "/#top" (not "#top") so this still lands on the homepage's very
            top when clicked from one of the service/contact pages. */}
        <Link href="/#top" className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element -- a single small static asset, not worth next/image's runtime resizing */}
          <img src="/brand/wm-logo.jpg" alt="" className="brand-mark" />
          <span className="brand-text">
            <span className="mark">
              {business.brandPrefix} <em>{business.brandEmphasis}</em>
            </span>
            <span className="sub">{business.tagline}</span>
          </span>
        </Link>

        <nav className="links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-cta">
          <a href={`tel:+${business.phones.primary}`} className="btn btn-ghost">
            {header.callNowLabel}
          </a>
          <Link href="/#contact" className="btn btn-solid">
            {header.quoteLabel}
          </Link>
          <MobileDrawer />
        </div>
      </div>
    </header>
  );
}

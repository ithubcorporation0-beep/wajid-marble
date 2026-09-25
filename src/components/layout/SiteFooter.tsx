// The footer shown at the bottom of every page: the business name, a short
// set of links, and the copyright line. Static and server-rendered — the
// current year is computed at render time so the copyright line never goes
// stale.
import Link from "next/link";
import { business, footer, navLinks } from "@/content/site";
import { pageNavLinks } from "@/content/pages";

const FOOTER_LINK_HREFS = new Set(["/#about", "/#products", "/#contact"]);

export default function SiteFooter() {
  const footerLinks = navLinks.filter((link) => FOOTER_LINK_HREFS.has(link.href));
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap footer-row">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element -- a single small static asset, not worth next/image's runtime resizing */}
          <img src="/brand/wm-logo.png" alt="" className="footer-brand-mark" />
          <span>
            <span className="fmark">{business.name}</span> — {business.city}, {business.country}
          </span>
        </div>
        <div className="footer-links">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          {/* The service/location pages and the dedicated quote page —
              see src/content/pages/index.ts, the one place that lists
              every page besides the homepage. */}
          {pageNavLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          {/* Plain <a>, not <Link> — /sitemap.xml is a raw XML file, not a
              Next.js page, so there's nothing for client-side routing to do. */}
          <a href={footer.sitemapLink.href}>{footer.sitemapLink.label}</a>
        </div>
        <div>
          © {year} {business.name}. {footer.rightsSuffix}
        </div>
      </div>
    </footer>
  );
}

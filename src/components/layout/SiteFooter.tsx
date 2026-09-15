// The footer shown at the bottom of every page: the business name, a short
// set of links, and the copyright line. Static and server-rendered — the
// current year is computed at render time so the copyright line never goes
// stale.
import { business, footer, navLinks } from "@/content/site";

const FOOTER_LINK_HREFS = new Set(["#about", "#products", "#contact"]);

export default function SiteFooter() {
  const footerLinks = navLinks.filter((link) => FOOTER_LINK_HREFS.has(link.href));
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap footer-row">
        <div>
          <span className="fmark">{business.name}</span> — {business.city}, {business.country}
        </div>
        <div className="footer-links">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div>
          © {year} {business.name}. {footer.rightsSuffix}
        </div>
      </div>
    </footer>
  );
}

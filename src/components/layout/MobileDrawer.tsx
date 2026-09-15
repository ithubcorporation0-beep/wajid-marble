// The hamburger button and the full-screen menu it opens on small screens.
// This owns its own open/closed state (and locks page scrolling while open,
// so the page behind the drawer can't scroll), which means it has to run in
// the browser — hence "use client". SiteHeader stays a plain server
// component and simply places this component where the hamburger button
// used to be.
"use client";

import { useEffect, useState } from "react";
import { business, header, navLinks } from "@/content/site";

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-label={header.menuOpenAriaLabel}
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* `inert` keeps keyboard/assistive-tech focus out of the drawer's
          links while it's closed and translated off-screen. */}
      <div className={`mobile-drawer${open ? " open" : ""}`} aria-hidden={!open} inert={!open}>
        <button
          type="button"
          className="close-drawer"
          aria-label={header.menuCloseAriaLabel}
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        <nav>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="drawer-link" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={`tel:+${business.phones.primary}`}
          className="btn btn-solid"
          style={{ borderColor: "var(--gold-soft)", background: "var(--gold)", color: "var(--onyx)" }}
        >
          {header.drawerCallLabel}
        </a>
      </div>
    </>
  );
}

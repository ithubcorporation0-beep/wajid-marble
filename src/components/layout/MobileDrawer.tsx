// The hamburger button and the full-screen menu it opens on small screens.
// This owns its own open/closed state (and locks page scrolling while open,
// so the page behind the drawer can't scroll), which means it has to run in
// the browser — hence "use client". SiteHeader stays a plain server
// component and simply places this component where the hamburger button
// used to be.
//
// The overlay itself is rendered through a React portal straight into
// <body>, rather than left where SiteHeader placed it in the component
// tree. That's not just tidiness: <header> has `backdrop-filter: blur(...)`
// (see src/styles/layout.css), and any element with backdrop-filter creates
// a new positioning context for its `position: fixed` descendants — so
// without the portal, this drawer would be pinned to header's own ~86px
// height instead of covering the full screen. The original static site
// avoided this by keeping the drawer as a sibling of <header> in the HTML;
// the portal gets the same result here.
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { business, header, navLinks } from "@/content/site";
import { pageNavLinks } from "@/content/pages";

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      {mounted &&
        createPortal(
          // `inert` keeps keyboard/assistive-tech focus out of the drawer's
          // links while it's closed and translated off-screen.
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
                <Link key={link.href} href={link.href} className="drawer-link" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
              {pageNavLinks.map((link) => (
                <Link key={link.href} href={link.href} className="drawer-link" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <a
              href={`tel:+${business.phones.primary}`}
              className="btn btn-solid"
              style={{ borderColor: "var(--gold-soft)", background: "var(--gold)", color: "var(--onyx)" }}
            >
              {header.drawerCallLabel}
            </a>
          </div>,
          document.body,
        )}
    </>
  );
}

// Wraps a piece of the page so it gently fades and slides into view the
// first time a visitor scrolls it into the viewport, matching the original
// site's scroll-reveal script. Watching for that requires the browser's
// IntersectionObserver, which only runs on the client, so this is one of
// the few components in the project marked "use client".
//
// The CSS this relies on (.reveal { opacity: 0 } in primitives.css) hides
// content by default and depends on this component's JS to reveal it —
// which fails closed if that JS never runs or never fires (visitors with
// scripting fully disabled, a dropped/slow connection that never finishes
// loading this chunk, an unusual browser without IntersectionObserver, or
// the observer silently never calling back). Content that's fully present
// in the HTML staying invisible to a human visitor is worse than the
// animation never playing, so this component fails *open* instead: a
// <noscript> override in layout.tsx handles "no JS at all", and the
// support-check, try/catch and timeout fallback below handle every case
// where JS does run but the reveal never fires.
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Long enough to never fire during a normal scroll (the observer usually
// fires within milliseconds of the element entering the viewport), short
// enough that a genuine failure self-heals almost immediately rather than
// leaving a section invisible indefinitely.
const FALLBACK_DELAY_MS = 3000;

export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  /** Extra class name(s) for the wrapping element, alongside "reveal". */
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Very old/unusual browsers without IntersectionObserver at all —
    // nothing to observe with, so just show the content.
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const fallback = window.setTimeout(() => setIsVisible(true), FALLBACK_DELAY_MS);

    let observer: IntersectionObserver | undefined;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(node);
    } catch {
      // Observer construction itself failed — don't leave the section
      // waiting on a callback that's never coming.
      setIsVisible(true);
    }

    return () => {
      window.clearTimeout(fallback);
      observer?.disconnect();
    };
  }, []);

  const classes = ["reveal", isVisible && "in", className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}

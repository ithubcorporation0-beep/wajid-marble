// Wraps a piece of the page so it gently fades and slides into view the
// first time a visitor scrolls it into the viewport, matching the original
// site's scroll-reveal script. Watching for that requires the browser's
// IntersectionObserver, which only runs on the client, so this is one of
// the few components in the project marked "use client".
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

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

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = ["reveal", isVisible && "in", className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}

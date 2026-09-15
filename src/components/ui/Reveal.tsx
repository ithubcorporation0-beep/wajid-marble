// This wraps a piece of the page so it can fade and slide gently into view
// as a visitor scrolls to it, using the .reveal / .reveal.in styles in
// src/styles/primitives.css. For now it just renders its children as-is —
// the scroll-triggered animation behavior is wired in in a later step.
import type { ReactNode } from "react";

export default function Reveal({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

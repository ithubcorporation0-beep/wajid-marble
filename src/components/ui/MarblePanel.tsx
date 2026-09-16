// A large "book-matched" marble panel: two copies of the exact same
// MarbleSwatch texture, side by side, with the right half mirrored. Because
// the underlying feTurbulence pattern is deterministic (same numbers always
// draw the same pattern), mirroring one identical copy next to the other
// produces the symmetric, kaleidoscope-like veining real book-matched
// marble slabs show when a factory cuts one block into matching sheets —
// which is exactly the kind of finish this business installs. Used as the
// decorative visual on the right side of the hero (see sections/Hero.tsx).
// No interactivity, so this stays a server component.
import type { MarbleTexture } from "@/types";
import MarbleSwatch from "./MarbleSwatch";

export default function MarblePanel({ texture }: { texture: MarbleTexture }) {
  // SVG filter ids must be unique across the whole page. Both halves share
  // one texture recipe (so the pattern matches), but each needs its own id
  // — reusing texture.id verbatim for both would put two elements with the
  // same id in the page.
  const left: MarbleTexture = { ...texture, id: `${texture.id}-a` };
  const right: MarbleTexture = { ...texture, id: `${texture.id}-b` };

  return (
    <div className="marble-panel" aria-hidden="true">
      <div className="marble-panel-half">
        <MarbleSwatch texture={left} viewBox="0 0 300 800" />
      </div>
      <div className="marble-panel-half marble-panel-mirror">
        <MarbleSwatch texture={right} viewBox="0 0 300 800" />
      </div>
      <div className="marble-panel-seam" />
    </div>
  );
}

// Renders one procedurally-generated marble/stone texture: a flat color with
// a turbulent "vein" pattern painted over it using an SVG feTurbulence
// filter, instead of a real photo. Every product card and gallery tile uses
// this component with a different `texture` recipe (see src/content/site.ts)
// so the same code produces 11 different-looking stones. It needs no
// interactivity, so it stays a server component — the filter's id comes
// straight from the texture data, which is enough to keep every instance on
// the page unique (duplicate SVG filter ids would make some of them render
// the wrong pattern).
import type { MarbleTexture } from "@/types";

export default function MarbleSwatch({
  texture,
  viewBox,
}: {
  texture: MarbleTexture;
  viewBox: string;
}) {
  const [r, g, b, a] = texture.veinColor;
  const matrixValues = `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 ${a} 0`;

  return (
    <svg viewBox={viewBox} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id={texture.id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={texture.baseFrequency}
            numOctaves={texture.numOctaves}
            seed={texture.seed}
          />
          <feColorMatrix type="matrix" values={matrixValues} result="v" />
          <feComposite in="v" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={texture.baseColor} />
      <rect width="100%" height="100%" filter={`url(#${texture.id})`} opacity={texture.veinOpacity} />
    </svg>
  );
}

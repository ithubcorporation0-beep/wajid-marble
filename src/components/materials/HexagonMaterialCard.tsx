// One card in the homepage's "Natural Stone Collection" showcase
// (Products.tsx): a hexagon-clipped stone swatch, a small name plate
// overlapping its bottom point, and a short use-case line underneath.
// Reused as-is for every item — see MarbleImage.tsx for why the swatch is
// a pre-rendered image rather than a live SVG filter.
import Link from "next/link";
import type { Product } from "@/types";
import MarbleImage from "@/components/ui/MarbleImage";

export default function HexagonMaterialCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  return (
    <Link href={product.href} className="hex-card">
      <div className="hex-shape">
        {/* Meaningful alt text (not empty/decorative) since, unlike a
            product card with visible text right next to the image, this
            card's name/tag sit outside the <Link> flow and are announced
            separately — reusing the material's own description keeps this
            accurate without maintaining a second copy of the same facts. */}
        <MarbleImage texture={product.texture} src={product.photoSrc} alt={product.description} eager={eager} />
      </div>
      <div className="hex-caption">
        <div className="hex-name-plate">
          <span className="pname">{product.name}</span>
        </div>
        <div className="ptag">{product.tag}</div>
      </div>
    </Link>
  );
}

// The "What We Offer" section: a hexagon showcase of stone swatches, each
// built from the same MarbleImage/texture recipe in src/content/site.ts as
// before — just cropped to a hexagon silhouette with its name/tag as a
// caption underneath, instead of a rectangular card with the text
// overlaid on top (see MarbleImage.tsx for why it's an image rather than a
// live filter). Each swatch links to that stone's own service page
// (product.href), so it's a real link, not just decoration.
import Link from "next/link";
import { products } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import MarbleImage from "@/components/ui/MarbleImage";

export default function Products() {
  return (
    <section className="section" id="products">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="eyebrow">{products.eyebrow}</div>
            <h2>{products.heading}</h2>
          </div>
          <p>{products.description}</p>
        </Reveal>

        <div className="hex-grid">
          {products.items.map((product) => (
            <Reveal key={product.id} className="hex-card">
              <Link href={product.href}>
                <div className="hex-shape">
                  <MarbleImage texture={product.texture} eager />
                </div>
                <div className="hex-caption">
                  <div className="pname">{product.name}</div>
                  <div className="ptag">{product.tag}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

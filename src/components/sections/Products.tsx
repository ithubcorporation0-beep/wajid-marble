// The "What We Offer" section: a grid of stone product cards. Each card's
// texture is a pre-rendered static image (MarbleImage) built from a recipe
// in src/content/site.ts, instead of 4 copies of the same inline SVG markup
// (see MarbleImage.tsx for why it's an image rather than a live filter).
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

        <div className="products-grid">
          {products.items.map((product) => (
            <Reveal key={product.id} className="product-card">
              <MarbleImage texture={product.texture} eager />
              <div className="product-info">
                <div className="pname">{product.name}</div>
                <div className="ptag">{product.tag}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

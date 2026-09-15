// The "What We Offer" section: a grid of stone product cards. Each card's
// texture is drawn by MarbleSwatch from data in src/content/site.ts, instead
// of 4 copies of the same inline SVG markup.
import { products } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import MarbleSwatch from "@/components/ui/MarbleSwatch";

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
              <MarbleSwatch texture={product.texture} viewBox="0 0 300 400" />
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

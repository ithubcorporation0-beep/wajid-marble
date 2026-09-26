// The "Natural Stone Collection" section: a curated 8-item hexagon
// showcase (see Product.featured in site.ts — the full range lives at
// /materials). Card rendering itself lives in HexagonMaterialCard so it
// can be reused without duplicating markup.
import { products } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import HexagonMaterialCard from "@/components/materials/HexagonMaterialCard";

export default function Products() {
  const featured = products.items.filter((product) => product.featured);

  return (
    <section className="section" id="products">
      <div className="wrap">
        <Reveal className="section-head-center">
          <div className="eyebrow">{products.eyebrow}</div>
          <h2>{products.heading}</h2>
          <p>{products.description}</p>
        </Reveal>

        <div className="hex-grid">
          {featured.map((product) => (
            <Reveal key={product.id}>
              <HexagonMaterialCard product={product} eager />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

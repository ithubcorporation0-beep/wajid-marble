// The "From the Factory Floor" mosaic: seven differently-sized tiles, each
// with its own marble texture, laid out with the .g1–.g7 sizing classes in
// src/styles/sections.css.
import { gallery } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import MarbleSwatch from "@/components/ui/MarbleSwatch";

export default function Gallery() {
  return (
    <section className="section" id="gallery" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="eyebrow">{gallery.eyebrow}</div>
            <h2>{gallery.heading}</h2>
          </div>
          <p>{gallery.description}</p>
        </Reveal>

        <Reveal className="gallery-grid">
          {gallery.tiles.map((tile) => (
            <div key={tile.id} className={tile.gridClass}>
              <MarbleSwatch texture={tile.texture} viewBox={tile.viewBox} alt={tile.alt} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

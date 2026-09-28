// The "From the Factory Floor" mosaic: differently-sized tiles, each a
// real installation photo (or a procedural texture for any tile that
// doesn't have one), laid out with the .g1–.g7 sizing classes in
// src/styles/sections.css.
import { gallery } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import MarbleImage from "@/components/ui/MarbleImage";

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
              <MarbleImage texture={tile.texture} src={tile.photoSrc} alt={tile.alt} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

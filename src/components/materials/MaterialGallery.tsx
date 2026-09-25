// The image gallery on a material's detail page: one large image with a
// row of clickable thumbnails underneath. Needs to hold "which thumbnail
// is selected" as state, so — unlike almost everything else on this site —
// it has to run in the browser.
"use client";

import { useState } from "react";
import type { MaterialGalleryImage } from "@/types";

export default function MaterialGallery({ images }: { images: MaterialGalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  return (
    <div className="material-gallery">
      <div className="material-gallery-main">
        {/* eslint-disable-next-line @next/next/no-img-element -- static local asset, see MarbleImage.tsx for why plain <img> is used project-wide */}
        <img src={active.src} alt={active.alt} />
      </div>
      {images.length > 1 && (
        <div className="material-gallery-thumbs">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`material-gallery-thumb${index === activeIndex ? " active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-current={index === activeIndex}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
              <img src={image.src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

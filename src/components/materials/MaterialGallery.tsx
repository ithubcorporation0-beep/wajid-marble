// The image gallery on a material's detail page: one large image, a row of
// clickable thumbnails underneath, and prev/next arrows over the main
// image. Needs to hold "which image is selected" as state, so — unlike
// almost everything else on this site — it has to run in the browser.
"use client";

import { useState } from "react";
import type { MaterialGalleryImage } from "@/types";

export default function MaterialGallery({
  images,
  materialName,
}: {
  images: MaterialGalleryImage[];
  /** Used in thumbnail/arrow aria-labels, e.g. "View Charcoal Grey Marble
   * image 2" — the images themselves don't carry the material's name. */
  materialName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  // Wraps in both directions: past the last thumbnail, "next" returns to
  // the first, and "previous" from the first goes to the last.
  const goTo = (index: number) => setActiveIndex((index + images.length) % images.length);

  return (
    <div className="material-gallery">
      <div className="material-gallery-main">
        {/* key remounts the <img> on every change so its fade-in animation
            (see .material-gallery-main img in sections.css) restarts —
            the simplest way to get a smooth crossfade without a library. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- static local asset, see MarbleImage.tsx for why plain <img> is used project-wide */}
        <img key={active.src} src={active.src} alt={active.alt} />

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="material-gallery-arrow material-gallery-arrow-prev"
              onClick={() => goTo(activeIndex - 1)}
              aria-label={`Previous ${materialName} image`}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M15 5l-7 7 7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="material-gallery-arrow material-gallery-arrow-next"
              onClick={() => goTo(activeIndex + 1)}
              aria-label={`Next ${materialName} image`}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M9 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="material-gallery-thumbs">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`material-gallery-thumb${index === activeIndex ? " active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`View ${materialName} image ${index + 1}`}
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

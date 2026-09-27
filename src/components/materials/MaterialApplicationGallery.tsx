// The image gallery on a material's detail page: one large photo showing
// the stone in a real application (kitchen, bathroom, wall cladding,
// flooring, staircase), and a row of labeled thumbnails underneath to
// switch between them. Needs to hold "which application is selected" as
// state, so — unlike almost everything else on this site — it has to run
// in the browser. See the PLACEHOLDER NOTICE on MaterialApplication in
// src/types/index.ts for why every material's 5 photos are currently
// identical (the real ones haven't been supplied yet).
"use client";

import { useState } from "react";
import type { MaterialApplication } from "@/types";

// Every application.image (e.g. ".../kitchen.jpg") has a matching, much
// smaller "-thumb" file generated alongside it (see scripts/ — same crop,
// downscaled to 240px). The thumbnail row displays these at ~76px, so
// loading the same full-resolution file five times over for that would
// be pure waste — this derives the thumb path by convention instead of
// carrying a second path in the content data for every application.
function thumbSrc(image: string): string {
  return image.replace(/(\.[a-z0-9]+)$/i, "-thumb$1");
}

export default function MaterialApplicationGallery({
  applications,
  materialName,
}: {
  /** Exactly 5, in display order — see Product.applications. */
  applications: MaterialApplication[];
  /** Used in thumbnail aria-labels, e.g. "View White Carrara Marble
   * Kitchen photo" — the applications themselves don't carry the
   * material's name. */
  materialName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = applications[activeIndex];

  return (
    <div className="material-gallery">
      <div className="material-gallery-main">
        {/* key remounts the <img> on every change so its fade-in animation
            (see .material-gallery-main img in sections.css) restarts —
            the simplest way to get a smooth crossfade without a library. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- static local asset, see MarbleImage.tsx for why plain <img> is used project-wide */}
        <img key={active.image} src={active.image} alt={active.alt} loading="eager" decoding="async" />
      </div>

      <div className="material-application-thumbs">
        {applications.map((application, index) => (
          <button
            key={application.type}
            type="button"
            className={`material-application-thumb${index === activeIndex ? " active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${materialName} ${application.label} photo`}
            aria-current={index === activeIndex}
          >
            <span className="material-application-thumb-image">
              {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
              <img src={thumbSrc(application.image)} alt="" loading="lazy" decoding="async" />
            </span>
            <span className="material-application-thumb-label">{application.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

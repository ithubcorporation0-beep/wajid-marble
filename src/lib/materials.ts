// Shared helpers for the /materials catalog and detail pages.
import fs from "node:fs";
import path from "node:path";
import type { Product, MaterialGalleryImage } from "@/types";

// A material can have up to this many gallery photos, at a fixed path
// convention: public/materials/<id>/1.jpg through <MAX>.jpg. Not every
// material has all of them yet, so getMaterialGalleryImages checks the
// filesystem rather than assuming a fixed count — every /materials/[slug]
// page is statically generated (see generateStaticParams), so this runs
// once per product at `next build` time, not on every visitor request.
const MAX_GALLERY_IMAGES = 5;

export function getMaterialGalleryImages(product: Product): MaterialGalleryImage[] {
  const numbers = Array.from({ length: MAX_GALLERY_IMAGES }, (_, i) => i + 1).filter((n) =>
    fs.existsSync(path.join(process.cwd(), "public", "materials", product.id, `${n}.jpg`)),
  );

  return numbers.map((n) => ({
    src: `/materials/${product.id}/${n}.jpg`,
    alt: `${product.name} — view ${n} of ${numbers.length}`,
  }));
}

// Shared helpers for the /materials catalog and detail pages. Every
// product has exactly 3 pre-generated gallery images (see the comment on
// MaterialGalleryImage in src/types/index.ts and
// scripts/generate-textures.mjs) at a fixed path convention, so this is
// the one place that convention is spelled out rather than repeated in
// every page that needs it.
import type { Product, MaterialGalleryImage } from "@/types";

export function getMaterialGalleryImages(product: Product): MaterialGalleryImage[] {
  return [1, 2, 3].map((n) => ({
    src: `/materials/${product.id}/${n}.jpg`,
    alt: `${product.name} — view ${n} of 3`,
  }));
}

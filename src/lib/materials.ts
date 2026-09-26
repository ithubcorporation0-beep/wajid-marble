// Shared helpers for the /materials catalog and detail pages. Every
// product currently has exactly this many real gallery photos (see
// public/materials/<id>/) at a fixed path convention:
// /materials/<id>/1.jpg through <GALLERY_IMAGE_COUNT>.jpg.
//
// This is intentionally a plain constant, not a filesystem check —
// this site deploys to Cloudflare Workers, which has no Node
// filesystem at request time, so an fs.existsSync() call here works
// fine in local `next build`/`next start` but throws (500) in
// production even on a page that's statically generated, because
// Cloudflare's Next.js runtime still executes this function's code
// rather than only its build-time output. Bump this number, and add
// the matching numbered files to every public/materials/<id>/ folder,
// when more photos are added — no other code change needed.
import type { Product, MaterialGalleryImage } from "@/types";

const GALLERY_IMAGE_COUNT = 3;

export function getMaterialGalleryImages(product: Product): MaterialGalleryImage[] {
  return Array.from({ length: GALLERY_IMAGE_COUNT }, (_, i) => i + 1).map((n) => ({
    src: `/materials/${product.id}/${n}.jpg`,
    alt: `${product.name} — view ${n} of ${GALLERY_IMAGE_COUNT}`,
  }));
}

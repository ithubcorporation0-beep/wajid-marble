// Regenerates the static marble/stone texture images in public/textures/
// from the MarbleTexture recipes in src/content/site.ts (kept in sync by
// hand below — see the comment on the `textures` array).
//
// Run this manually whenever a product or gallery texture recipe changes.
// It is NOT part of `npm run build` and never runs automatically: it needs
// a real browser (via Playwright) to compute the SVG feTurbulence filter,
// and this project's production build (Cloudflare Workers Builds) has no
// guarantee of one being available — the same class of problem that broke
// NEXT_PUBLIC_SITE_URL earlier in this project. See MarbleImage.tsx for how
// the generated images are used.
//
//   npm install --no-save playwright      # once, per machine
//   npx playwright install chromium       # once, per machine
//   node scripts/generate-textures.mjs
//
// Playwright isn't a project dependency on purpose (see above) —
// --no-save keeps package.json untouched.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "textures");

// Kept in sync by hand with the MarbleTexture objects in
// src/content/site.ts (products.items[].texture and gallery.tiles[].texture
// + gallery.tiles[].viewBox — products all use viewBox "0 0 300 400", set
// directly in Products.tsx rather than in the content data). If you add,
// remove or edit a texture there, mirror the change here and re-run this
// script.
const textures = [
  ["texture-product-white-carrara", "0 0 300 400", "#EFEBE1", "0.02 0.06", 4, 2, [0.55, 0.52, 0.47, 0.4], 0.8],
  ["texture-product-black-marble", "0 0 300 400", "#17130F", "0.015 0.05", 4, 19, [0.75, 0.6, 0.3, 0.55], 0.9],
  ["texture-product-golden-onyx", "0 0 300 400", "#E7D9BE", "0.008 0.03", 5, 41, [0.85, 0.65, 0.25, 0.6], 0.85],
  ["texture-product-grey-granite", "0 0 300 400", "#4B4B47", "0.03 0.03", 3, 8, [0.35, 0.36, 0.34, 0.5], 0.9],
  ["texture-gallery-1", "0 0 400 260", "#EDE7DB", "0.012 0.04", 5, 3, [0.5, 0.47, 0.42, 0.45], 0.85],
  ["texture-gallery-2", "0 0 400 400", "#0F0D0C", "0.01 0.035", 5, 55, [0.15, 0.14, 0.13, 0.9], 1],
  ["texture-gallery-3", "0 0 300 260", "#D8C7A2", "0.02 0.05", 4, 12, [0.7, 0.55, 0.3, 0.5], 0.85],
  ["texture-gallery-4", "0 0 300 260", "#57544C", "0.025 0.06", 3, 27, [0.4, 0.4, 0.38, 0.4], 0.85],
  ["texture-gallery-5", "0 0 300 260", "#F2EEE4", "0.015 0.045", 4, 63, [0.85, 0.82, 0.74, 0.4], 0.85],
  ["texture-gallery-6", "0 0 400 260", "#E9D8B8", "0.01 0.03", 5, 71, [0.78, 0.6, 0.28, 0.55], 0.85],
  ["texture-gallery-7", "0 0 400 260", "#181513", "0.018 0.05", 4, 90, [0.2, 0.19, 0.17, 0.7], 0.9],
];

// Longer side of the raster, in CSS px before deviceScaleFactor — generous
// for retina displays at the sizes these actually render at (product cards,
// gallery grid tiles), while keeping each JPEG in the tens of KB.
const TARGET_LONG_SIDE = 640;

function buildHtml(viewBox, baseColor, baseFrequency, numOctaves, seed, veinColor, veinOpacity) {
  // Exactly the filter recipe MarbleSwatch.tsx renders live — this script
  // exists to freeze that output as an image, not to approximate it.
  const [r, g, b, a] = veinColor;
  const matrixValues = `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 ${a} 0`;
  const [, , vw, vh] = viewBox.split(" ").map(Number);
  return `<!doctype html><html><head><style>
    html,body{margin:0;padding:0;}
    svg{display:block;}
  </style></head><body>
  <svg width="${vw}" height="${vh}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="tex">
        <feTurbulence type="fractalNoise" baseFrequency="${baseFrequency}" numOctaves="${numOctaves}" seed="${seed}" />
        <feColorMatrix type="matrix" values="${matrixValues}" result="v" />
        <feComposite in="v" in2="SourceGraphic" operator="over" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="${baseColor}" />
    <rect width="100%" height="100%" filter="url(#tex)" opacity="${veinOpacity}" />
  </svg>
  </body></html>`;
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  for (const [id, viewBox, baseColor, baseFrequency, numOctaves, seed, veinColor, veinOpacity] of textures) {
    const [, , vw, vh] = viewBox.split(" ").map(Number);
    const scale = TARGET_LONG_SIDE / Math.max(vw, vh);
    const width = Math.round(vw * scale);
    const height = Math.round(vh * scale);

    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
    await page.setContent(buildHtml(viewBox, baseColor, baseFrequency, numOctaves, seed, veinColor, veinOpacity));
    await page.waitForTimeout(50);
    const svg = await page.$("svg");
    const outPath = path.join(OUT_DIR, `${id}.jpg`);
    await svg.screenshot({ path: outPath, type: "jpeg", quality: 82 });
    const size = fs.statSync(outPath).size;
    console.log(`${id}.jpg  ${width}x${height}@2x  ${(size / 1024).toFixed(1)} KB`);
    await page.close();
  }

  await browser.close();
})();

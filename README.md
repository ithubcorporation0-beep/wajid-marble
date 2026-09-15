# Wajid Marble Factory

A Next.js rebuild of the Wajid Marble Factory single-page site (the original
static HTML/CSS is kept for reference in `_reference/wajid-marble-factory.html`).

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project layout

- `src/app` — pages and routes (App Router). `layout.tsx` and `page.tsx` are
  the root layout and homepage; `sitemap.ts`, `robots.ts` and `not-found.tsx`
  are Next.js's special-purpose files; `api/quote/route.ts` handles the quote
  form's submissions.
- `src/components/layout` — chrome shown on every page (header, mobile menu,
  footer, floating WhatsApp button).
- `src/components/sections` — the homepage's content blocks (hero, about,
  products, gallery, why-us, contact).
- `src/components/forms` — the quote request form.
- `src/components/ui` — small reusable visual pieces (scroll reveal
  animation, the vein divider, marble texture swatches).
- `src/content` — all of the site's real text and copy, in one place.
- `src/lib` — server-side logic: environment variables, form validation,
  rate limiting, WhatsApp link building, notifications.
- `src/styles` — the hand-written CSS, split by concern: `tokens.css`
  (colors), `base.css` (element resets), `primitives.css` (buttons, wrapper,
  eyebrow label, reveal animation), `layout.css` (header/footer/drawer),
  `sections.css` (each homepage section).
- `src/types` — shared TypeScript types.
- `public` — static files served as-is (images, favicon, etc).

Markup lives in `src/components`, styling lives in `src/styles`, and content
lives in `src/content` — they're kept separate on purpose so each can change
without touching the others.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values there.
`.env.local` is never committed to git.

# Wajid Marble Factory

A marketing/lead-generation website for Wajid Marble Factory, a marble,
granite and onyx supplier in Mardan, Pakistan. It's a single homepage
(hero, about, products, gallery, why-us, contact) plus a quote request form
that emails the factory (or logs to the console if email isn't configured
yet) and hands the visitor off to WhatsApp for a faster reply.

This is a Next.js (App Router, TypeScript) rebuild of an original
single-file static HTML page, which is kept for reference at
`_reference/wajid-marble-factory.html` — every word, phone number, color and
texture on the live site was extracted from that file.

## Running it locally

You'll need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values (see "Environment
                              # variables" below — NEXT_PUBLIC_SITE_URL is
                              # the only one you must set to run locally)
npm run dev
```

Then open http://localhost:3000. Editing any file under `src/` updates the
page in your browser automatically (no restart needed).

Other useful commands:

```bash
npm run build   # production build — also the best way to catch mistakes,
                # since it runs the type checker and linter too
npm run start   # run that production build locally
npm run lint    # just the linter (eslint)
npx tsc --noEmit  # just the type checker
```

## Folder structure — what goes where

```
src/
  app/                    Pages and routes (Next.js "App Router")
    layout.tsx              Wraps every page: <html>, fonts, header/footer,
                             and the page's SEO <meta> tags
    page.tsx                The homepage — assembles the sections below
                             plus the LocalBusiness structured data
    globals.css              Pulls in the 5 files from src/styles, in order
    not-found.tsx            Shown for any URL that doesn't exist
    sitemap.ts               Generates /sitemap.xml
    robots.ts                Generates /robots.txt
    api/quote/route.ts       The server endpoint the quote form submits to

  components/
    layout/                 Shown on every page: SiteHeader, MobileDrawer
                             (the mobile hamburger menu), SiteFooter,
                             FloatingWhatsApp (the round WhatsApp button)
    sections/                One file per homepage section: Hero, About,
                             Products, Gallery, WhyUs, Contact
    forms/                  QuoteForm — the "Request a quote" form
    ui/                     Small reusable pieces: Reveal (the fade-in-on-
                             scroll wrapper), VeinDivider (the gold line),
                             MarbleSwatch (draws one marble/stone texture)

  content/
    site.ts                  ⭐ EVERY word, phone number and product on the
                             site lives here. See "Editing the site's text"
                             below.

  lib/                      Server-side logic — no markup, no styling
    env.ts                   Reads and validates environment variables
    schemas.ts                Validation rules for the quote form
    rate-limit.ts             Stops one visitor from spamming the quote form
    whatsapp.ts                Builds wa.me links and pre-filled messages
    notify.ts                  Delivers a quote request (email or console)

  styles/                  The hand-written CSS, split by concern — every
                           class name and rule matches the original design
    tokens.css               Color palette (CSS variables like --gold)
    base.css                  Resets for plain HTML elements, focus outline
    primitives.css             Reusable pieces: buttons, .wrap, .eyebrow,
                             section padding, the reveal animation
    layout.css                 Header, nav, mobile drawer, footer, the
                             floating WhatsApp button
    sections.css               Each homepage section's specific styling

  types/index.ts           Shared TypeScript types describing the shape of
                           the content in src/content/site.ts

public/                    Static files served as-is (currently empty)
```

The separation is deliberate: **markup** lives in `src/components`,
**styling** lives in `src/styles`, and **text/data** lives in
`src/content`. A component should never contain a hard-coded sentence, and
a stylesheet should never be split across component files.

## Editing the site's text

Open `src/content/site.ts`. Every heading, paragraph, button label, phone
number and product name is exported from that one file — change it there
and it updates everywhere it's used. You don't need to touch any file in
`src/components` to change what the site says.

A few things worth knowing about that file:

- **Phone numbers** are stored once, in `business.phones`, as digits-only
  international numbers (e.g. `"923136146176"`). Every `tel:` link, every
  `wa.me` WhatsApp link, and every on-screen "0313-6146176"-style display
  number is generated *from* that one value — never edit a phone number
  anywhere else, because there isn't another copy of it to edit.
- **Marble/stone textures** (the product cards and gallery tiles) aren't
  images — they're procedurally drawn by `src/components/ui/MarbleSwatch.tsx`
  from a small recipe (`MarbleTexture` in `src/types/index.ts`): a base
  color plus some numbers that control a turbulence pattern. To change how
  a product or gallery tile looks, adjust its texture's `baseColor`,
  `veinColor`, or the turbulence numbers — you're not looking for an image
  file to swap out.

## Adding a product

In `src/content/site.ts`, find the `products` export and add a new entry to
its `items` array:

```ts
{
  id: "beige-travertine",       // unique, used as a React key
  name: "Beige Travertine",     // shown on the card
  tag: "Floors · Patios",       // shown under the name
  texture: {
    id: "texture-product-beige-travertine", // MUST be unique across the
                                             // whole file — see below
    baseColor: "#D9CBB0",
    baseFrequency: "0.02 0.05",
    numOctaves: 4,
    seed: 123,                   // any number — changes the pattern
    veinColor: [0.6, 0.5, 0.35, 0.5], // [red, green, blue, alpha], 0–1 each
    veinOpacity: 0.85,
  },
},
```

The `texture.id` becomes an SVG filter's `id` attribute in the rendered
page, and SVG filter ids are global to the whole page — if two textures
ever shared an id, one of them would silently render with the wrong
pattern. Every existing texture already has a unique, descriptive id
(`texture-product-*`, `texture-gallery-*`); just make sure your new one
doesn't collide.

The same pattern applies to `gallery.tiles` for the photo mosaic, except
each tile also needs a `gridClass` (one of `g1`–`g7`) that controls its size
in the mosaic — see the `.g1`–`.g7` rules in `src/styles/sections.css` if
you want to understand exactly how each size differs.

## Environment variables

Copy `.env.example` to `.env.local` for local development (that file is
never committed to git — see `.gitignore`). They're all read and checked in
`src/lib/env.ts`. None of them can cause the build itself to fail: a
missing or malformed one is logged as a warning (check your host's build
logs) and replaced with a safe fallback, rather than failing the whole
deployment over one wrong variable.

| Variable | What happens if it's missing | What it's for |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Falls back to a placeholder (`https://example.com`) — the site still builds and works, but the sitemap, robots.txt and SEO tags point at the wrong address until you set this. | The site's own public address (no trailing slash), e.g. `https://wajidmarble.com`. |
| `RESEND_API_KEY` | Quote requests are logged to the server console instead of emailed. | An API key from [Resend](https://resend.com), for emailing quote requests. |
| `QUOTE_NOTIFY_EMAIL` | Same as above. | The address quote requests get emailed to. |

**Set `NEXT_PUBLIC_SITE_URL` to your real deployment address as soon as you
know it** — the site works without it, but search engines and shared links
will see the wrong URL until it's set correctly.

`RESEND_API_KEY` and `QUOTE_NOTIFY_EMAIL` work as a pair — set both to have
quote requests emailed, or leave both blank to just have them logged to the
server console (fine for local development or before email is set up).

**Never put a secret in a variable named `NEXT_PUBLIC_*`.** Next.js bundles
anything with that prefix into the JavaScript sent to every visitor's
browser, where anyone can read it in their browser's dev tools. Secrets
(like `RESEND_API_KEY`) must use a plain name with no prefix, which
Next.js keeps server-only.

## Deploying

This project deploys cleanly to [Vercel](https://vercel.com) (the company
behind Next.js) with no configuration beyond environment variables:

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. In Vercel: **Add New → Project → Import** your repository. Vercel
   detects Next.js automatically — you don't need to change any build
   settings.
3. Before deploying, add the environment variables from the table above
   under **Environment Variables** (at minimum, `NEXT_PUBLIC_SITE_URL` set
   to whatever URL Vercel will give you, or your real domain if you already
   have one).
4. Click **Deploy**. It takes about a minute.

After that, every push to your main branch deploys automatically, and every
other branch gets its own preview URL. If you attach a custom domain later
(**Settings → Domains**), update `NEXT_PUBLIC_SITE_URL` to match it and
redeploy — the sitemap, robots.txt and SEO tags all read that variable, so
they'd otherwise keep pointing at the old address.

Any other Node.js host that supports Next.js works too (`npm run build`
followed by `npm run start`); Vercel is just the path with no extra setup.

## Security notes

A few things are already handled for you, in case you're wondering why
they're there:

- `next.config.ts` sends a strict set of security headers (Content-Security-
  Policy, X-Frame-Options, etc.) with every response — see the comments in
  that file for what each one protects against.
- The quote form is validated **twice**: once in the browser (for instant
  feedback) and again in `src/app/api/quote/route.ts` on the server (which
  never trusts the browser — see the comment at the bottom of that file).
- `src/lib/rate-limit.ts` blocks an IP address after 5 quote requests in a
  minute. It's an in-memory limiter, which resets on every deploy and only
  tracks one server instance at a time — good enough for a small site, but
  worth swapping for something like Upstash Redis if traffic grows a lot.
- The quote form has a hidden "honeypot" field real visitors never see;
  anything that fills it in is treated as a bot and gets a fake success
  response instead of a real one.

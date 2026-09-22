// This is the root layout: the outermost wrapper around every page on the
// site. Next.js renders this once and then slots each individual page's
// content into it via the `children` prop. This is the right place for
// things that must appear on every page, like the <html> tag itself, the
// global stylesheet import, and the two fonts the design uses — not for
// content specific to any one page.
//
// Fonts: instead of a Google Fonts <link> tag (which makes every visitor's
// browser fetch the fonts from Google's servers), next/font/google downloads
// them once at build time and serves them from this site itself. That's
// faster for visitors and avoids sending their IP address to a third party.
// Each font is exposed as a CSS variable (--font-display, --font-sans) that
// src/styles/base.css and other stylesheets reference.
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { business } from "@/content/site";
import { env } from "@/lib/env";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import "./globals.css";

// Weights/styles trimmed to exactly what src/styles/*.css and the
// components actually set — verified by grepping every font-weight and
// font-style declaration in the project, not guessed. Fraunces is used at
// 400 (body-sized display text like product names), 500 (all headings —
// the base h1/h2/h3/.display rule) and 600 (the header/footer logo mark),
// normal style plus italic only at 400 (the hero's accent line and the Why
// Us section's numbered index). Inter is used at 400 (body text) and 600
// (buttons) — nothing in this codebase ever sets font-weight:500 or bold
// on sans-serif text, so those weight files would just be dead bytes sent
// to every visitor. If a future change needs a weight not listed here,
// add it back rather than reaching for an inline font-weight that isn't
// actually loaded.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans",
  display: "swap",
});

// The homepage's title leads with what people actually search for (the
// service + the city) before the brand name — someone searching "marble
// granite Mardan" recognizes this title as an answer faster than they'd
// recognize the business name alone. Sub-pages (once they exist) use the
// `template` below instead, which puts their own topic first and appends
// the brand name.
const homeTitle = "Marble & Granite in Mardan | Wajid Marble Factory";

// Metadata Next.js turns into the page's <title>, <meta> tags, and the
// preview cards shown when a link to this site is shared on social media or
// in a chat app (openGraph covers most apps/sites, twitter covers X/Twitter
// specifically, which reads its own separate set of tags).
export const metadata: Metadata = {
  // metadataBase turns every relative URL used in metadata (like an openGraph
  // image path) into a full https://... URL — required once a site has any
  // metadata that isn't already a full URL.
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: homeTitle,
    // %s is replaced by a page's own title, e.g. a future "Gallery" page
    // would become "Gallery — Wajid Marble Factory" instead of repeating
    // the full business name and location on every single page.
    template: `%s — ${business.name}`,
  },
  description: business.seoDescription,
  alternates: {
    canonical: env.NEXT_PUBLIC_SITE_URL,
  },
  keywords: [
    "marble factory Mardan",
    "granite supplier Mardan",
    "onyx marble Pakistan",
    "marble and granite Khyber Pakhtunkhwa",
    business.name,
  ],
  openGraph: {
    title: homeTitle,
    description: business.seoDescription,
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: business.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: business.seoDescription,
  },
  // Explicit rather than relying on Next.js's default — states plainly that
  // every page should be indexed and followed, and asks Google specifically
  // for large image previews and untruncated snippets in search results.
  // Child routes inherit this from the root layout unless they set their
  // own `robots` field (none currently do).
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable}`}>
        {/* Lets someone using a keyboard (or a screen reader) jump straight
            past the header's nav links to the page content, instead of
            having to tab through every link in the header first on every
            single page load. Invisible until it receives keyboard focus. */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {/* Every section wrapped in <Reveal> (src/components/ui/Reveal.tsx)
            starts at opacity:0 in CSS and depends on that component's JS to
            become visible. With scripting fully disabled, that JS never
            runs at all, so this override — which only exists in a
            noscript-disabled browser — forces those sections visible
            instead of leaving them permanently blank. */}
        <noscript>
          <style>{".reveal{opacity:1 !important;transform:none !important;}"}</style>
        </noscript>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

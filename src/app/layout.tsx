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

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const description = `Premium marble, granite and onyx cut, polished and installed by ${business.name} in ${business.city}, ${business.addressRegion}. Factory-direct pricing, every slab hand-checked before it leaves the yard.`;

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
    default: `${business.name} — ${business.city}, ${business.country}`,
    // %s is replaced by a page's own title, e.g. a future "Gallery" page
    // would become "Gallery — Wajid Marble Factory" instead of repeating
    // the full business name and location on every single page.
    template: `%s — ${business.name}`,
  },
  description,
  keywords: [
    "marble factory Mardan",
    "granite supplier Mardan",
    "onyx marble Pakistan",
    "marble and granite Khyber Pakhtunkhwa",
    business.name,
  ],
  openGraph: {
    title: business.name,
    description,
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: business.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: business.name,
    description,
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
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

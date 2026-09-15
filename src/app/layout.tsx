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

export const metadata: Metadata = {
  title: "Wajid Marble Factory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}

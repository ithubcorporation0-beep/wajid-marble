// This is the root layout: the outermost wrapper around every page on the
// site. Next.js renders this once and then slots each individual page's
// content into it via the `children` prop. This is the right place for
// things that must appear on every page, like the <html> tag itself and the
// global stylesheet import — not for content specific to any one page.
import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}

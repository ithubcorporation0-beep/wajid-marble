// This file configures Next.js itself (the framework that builds and serves
// the site). Most of it is response headers — instructions sent alongside
// every page that tell the visitor's browser to lock down what the page is
// allowed to do, closing off entire categories of attack even if a bug ever
// let an attacker inject something into the page.
import type { NextConfig } from "next";

// Content-Security-Policy: the single biggest lever here. It tells the
// browser exactly which sources of scripts, styles, images, fonts, etc. the
// page is allowed to load from. Because this site has no third-party
// scripts and the fonts are self-hosted (via next/font, see layout.tsx),
// everything can be restricted to 'self' — the site's own origin. If an
// attacker ever managed to inject a `<script src="https://evil.example">`
// into a page (for example through an unescaped bit of user input), the
// browser would simply refuse to run it.
//
// 'unsafe-inline' is kept for scripts and styles because Next.js's App
// Router hydrates pages using small inline <script> tags, and this project
// also uses some inline `style={{...}}` attributes — both are blocked by a
// strict CSP unless explicitly allowed. A stricter, nonce-based CSP is
// possible but needs a middleware.ts to generate a fresh nonce per request;
// that's a reasonable next step if this ever needs to be hardened further.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    // Stops the site from being loaded inside an <iframe> on another site —
    // the classic defense against "clickjacking" (tricking a visitor into
    // clicking something on this site while it's invisibly framed under a
    // different page).
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Stops the browser from trying to be "clever" and guessing a file's
    // type from its content instead of trusting the type the server sent.
    // Without this, a file that's actually a script could be reinterpreted
    // and run in a context where it shouldn't be.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Controls how much of this site's own URL gets sent as the "Referer"
    // header when a visitor clicks a link to another site. This setting
    // sends the full URL to other pages on this same site, but only the
    // bare domain (no path or query string) to any other site — so, say, a
    // quote request's details never leak to an external link's destination.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Explicitly switches off browser features this site never uses, so
    // that even if a malicious ad or embedded frame somehow ended up on the
    // page, it couldn't ask the visitor's browser for their camera,
    // microphone or location.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    // Tells browsers to only ever talk to this site over HTTPS for the next
    // year (including for subdomains), even if a visitor types "http://" or
    // follows an old http:// link — closing off attacks where someone on the
    // same network downgrades a visitor to an unencrypted connection.
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  // Removes the "X-Powered-By: Next.js" header, which otherwise tells
  // anyone probing the site exactly which framework (and often version) to
  // go look up known vulnerabilities for.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

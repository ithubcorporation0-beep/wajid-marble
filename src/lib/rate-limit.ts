// This file protects the quote-request endpoint (src/app/api/quote/route.ts)
// from being spammed by the same visitor sending many requests in a row. It
// keeps a small record, per IP address, of how many requests that IP has
// made recently, entirely in the server's own memory — no database needed.
//
// The catch: "the server's own memory" only means *this one running
// instance* of the app. On a serverless host (like Vercel, which the README
// covers), each instance handles its own count, so a visitor could in
// theory get a few more than 5 requests per minute by hitting different
// instances, and every deploy resets all counts to zero. That's an
// acceptable trade-off for a small local-business site; if traffic grows
// enough for this to matter, swap this file's storage for something shared
// across instances (Upstash Redis is a common, easy choice) without
// changing how the rest of the app calls it.
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

interface RequestBucket {
  count: number;
  windowResetAt: number;
}

const buckets = new Map<string, RequestBucket>();

/** Reads the visitor's IP address off the request headers Next.js/Vercel's
 * proxy sets. The header can list several IPs (proxy hops); the first one
 * is the visitor's. */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (!forwardedFor) return "unknown";
  return forwardedFor.split(",")[0]?.trim() || "unknown";
}

/** Returns true if `identifier` (normally an IP address) is still under the
 * limit, and counts this call toward it. Returns false once it has made 5
 * or more requests within the current one-minute window. */
export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(identifier);

  if (!bucket || now >= bucket.windowResetAt) {
    buckets.set(identifier, { count: 1, windowResetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  bucket.count += 1;
  return true;
}

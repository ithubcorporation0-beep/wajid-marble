// This file protects the quote-request endpoint (src/app/api/quote/route.ts)
// from being spammed by the same visitor sending many requests in a row. The
// real version will keep a short-lived record of who has made a request
// recently, entirely in server memory (no database needed). For now this is
// a stand-in that always allows the request through.

export function checkRateLimit(identifier: string): boolean {
  void identifier;
  return true;
}

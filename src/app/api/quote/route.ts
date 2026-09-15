// This file handles requests sent to /api/quote — the server-side endpoint
// the quote-request form on the Contact section will submit to. It runs on
// the server, not in the visitor's browser, so it's a safe place to validate
// input, check for spam/abuse, and trigger a notification. The real
// validation (src/lib/schemas.ts), rate limiting (src/lib/rate-limit.ts) and
// notification (src/lib/notify.ts) are wired in once the form's content and
// fields are finalized.
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: false, error: "Not implemented yet" }, { status: 501 });
}

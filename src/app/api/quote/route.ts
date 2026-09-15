// This is the server endpoint the quote-request form (QuoteForm) submits to.
// It runs entirely on the server, never in the visitor's browser, which is
// exactly why it exists: a browser can be tampered with (its JavaScript
// edited, requests replayed or forged from a script instead of the real
// form), so the server has to re-check everything the browser already
// checked. See the note at the bottom for why that duplication is
// worthwhile even though it feels redundant.
//
// Requests are handled in a specific order, each step closing off a
// different way this endpoint could be abused:
//   1. Rate limit — is this IP sending too many requests too fast?
//   2. Parse JSON — is the request body even valid JSON?
//   3. Validate — do the fields match the rules in src/lib/schemas.ts?
//   4. Honeypot — did something fill in the field real visitors never see?
//   5. Deliver — hand the request off to src/lib/notify.ts.
import { NextResponse } from "next/server";
import { deliverQuoteRequest } from "@/lib/notify";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { quoteRequestSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request body." }, { status: 400 });
  }

  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please fix the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { company, ...quoteRequest } = parsed.data;
  if (company.trim() !== "") {
    // A real visitor never sees or fills in this field — only an automated
    // bot filling in every field on the form would. Responding with a fake
    // success (rather than an error) gives the bot nothing to learn from,
    // so it doesn't adapt to get past this check next time.
    return NextResponse.json({ ok: true });
  }

  try {
    await deliverQuoteRequest(quoteRequest);
  } catch (error) {
    // The real error (stack trace, API response, etc.) is only useful to
    // whoever reads the server logs — sending it to the browser could leak
    // details about the backend to anyone poking at this endpoint.
    console.error("Failed to deliver quote request:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please call or WhatsApp us instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}

// Why validate again on the server when the form already validates in the
// browser? Because browser-side validation is a courtesy to *honest*
// visitors — instant feedback without a round trip — not a security
// boundary. Anyone can open their browser's dev tools and edit the page's
// JavaScript, or skip the browser entirely and send a request straight to
// this URL with any tool that can make an HTTP request. If this file
// trusted whatever arrived without re-checking it, an attacker could submit
// a 50,000-character "name", inject arbitrary text into the email the
// factory receives, or hammer the endpoint thousands of times a second.
// The browser-side check is for user experience; this file is what actually
// keeps bad data out.

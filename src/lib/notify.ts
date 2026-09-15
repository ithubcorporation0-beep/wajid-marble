// This file is the only place in the app that knows how a new quote request
// actually gets delivered to the factory. src/app/api/quote/route.ts just
// calls deliverQuoteRequest() and doesn't care whether that means sending an
// email, logging to the console, or (later) writing to a database — so that
// switching delivery methods only ever means editing this one file.
//
// Right now there are two possibilities, decided by whether Resend is
// configured (see src/lib/env.ts):
//   - Configured: email the request via Resend's API.
//   - Not configured (e.g. in local development): just log it to the
//     server console, so nothing is silently lost.
import { business } from "@/content/site";
import { emailNotificationsEnabled, env } from "./env";
import type { QuoteRequestData } from "./schemas";

export interface DeliveryResult {
  delivered: true;
  method: "email" | "console";
}

export async function deliverQuoteRequest(request: QuoteRequestData): Promise<DeliveryResult> {
  if (!emailNotificationsEnabled) {
    console.log("[quote request]", request);
    return { delivered: true, method: "console" };
  }

  const siteHostname = new URL(env.NEXT_PUBLIC_SITE_URL).hostname;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${business.name} <quotes@${siteHostname}>`,
      to: env.QUOTE_NOTIFY_EMAIL,
      subject: `New quote request from ${request.name}`,
      text: [
        `Name: ${request.name}`,
        `Phone: ${request.phone}`,
        `Stone: ${request.stone}`,
        `Details: ${request.details || "(none given)"}`,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend API responded with ${response.status}`);
  }

  return { delivered: true, method: "email" };
}

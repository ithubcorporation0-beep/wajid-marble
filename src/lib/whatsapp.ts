// This file builds the WhatsApp links and pre-filled messages the site uses
// to hand a quote request over to WhatsApp ("wa.me" links). Keeping this in
// one file means the WhatsApp number only has to be correct in one place
// (src/content/site.ts) and the message wording only has to be right here.
import { business } from "@/content/site";

/** Builds a wa.me link. With no message, it just opens a chat; with one, the
 * chat opens pre-filled with that text (still editable before sending). */
export function buildWhatsAppLink(message?: string, phone: string = business.whatsappNumber): string {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Formats a quote request's details into the message a visitor's WhatsApp
 * chat opens pre-filled with, so the factory gets the same details there
 * that were submitted through the form. */
export function buildQuoteMessage(fields: {
  name: string;
  phone: string;
  stone: string;
  details: string;
}): string {
  return `Hello, I'm ${fields.name} (${fields.phone}).\nI'm interested in: ${fields.stone}\nDetails: ${fields.details}`;
}

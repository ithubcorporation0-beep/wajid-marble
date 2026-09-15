// This file reads settings from the server's environment variables —
// configuration and secrets that should never be hard-coded or committed to
// git. It checks them with zod (a validation library) as soon as this file
// is first imported, so a missing or malformed variable throws a clear
// error immediately at startup instead of causing a confusing failure deep
// inside a request handler later. Every other file that needs one of these
// values should import `env` from here instead of reading `process.env`
// directly. See .env.example for the checklist of variables this app uses.
//
// IMPORTANT: any variable name starting with NEXT_PUBLIC_ is bundled into
// the JavaScript sent to every visitor's browser and is visible to anyone
// who opens the browser's developer tools — it must never hold a secret
// (API key, password, token). Secrets belong in plain (non-prefixed)
// variables, which Next.js keeps server-only.
import { z } from "zod";

const envSchema = z.object({
  /** The site's own public address, e.g. "https://wajidmarble.com". Used to
   * build absolute URLs for SEO metadata, the sitemap, and JSON-LD — safe to
   * expose to the browser since it's just the site's own address. */
  NEXT_PUBLIC_SITE_URL: z.url({
    message: "NEXT_PUBLIC_SITE_URL must be a full URL, e.g. https://example.com",
  }),
  /** Resend's API key, for emailing quote requests. Optional: when it's not
   * set, quote requests are just logged on the server instead of emailed. */
  RESEND_API_KEY: z.string().min(1).optional(),
  /** Which address quote request emails get sent to. Optional for the same
   * reason as RESEND_API_KEY — both are required together for email to
   * actually go out (see `emailNotificationsEnabled` below). */
  QUOTE_NOTIFY_EMAIL: z.email().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const issues = parsedEnv.error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
  throw new Error(`Invalid environment variables:\n${issues}`);
}

export const env = parsedEnv.data;

/** True only when both the Resend API key and a notify address are set —
 * i.e. when src/lib/notify.ts has everything it needs to actually send an
 * email instead of just logging the request. */
export const emailNotificationsEnabled = Boolean(env.RESEND_API_KEY && env.QUOTE_NOTIFY_EMAIL);

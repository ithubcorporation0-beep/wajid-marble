// This file reads settings from the server's environment variables —
// configuration and secrets that should never be hard-coded or committed to
// git. It checks them with zod (a validation library) as soon as this file
// is first imported. Unlike a lot of "validate your env" examples, a
// missing or malformed variable here does NOT crash the build — it falls
// back to a safe default and prints a warning instead. That trade-off is
// deliberate: a build that refuses to complete over a misconfigured
// environment variable is a build that can't go live at all, on any host,
// until that one variable is exactly right — which is a worse failure mode
// for a small business site than briefly running with a placeholder while
// someone notices the warning and fixes the real value.
// Every other file that needs one of these values should import `env` from
// here instead of reading `process.env` directly. See .env.example for the
// checklist of variables this app uses.
//
// IMPORTANT: any variable name starting with NEXT_PUBLIC_ is bundled into
// the JavaScript sent to every visitor's browser and is visible to anyone
// who opens the browser's developer tools — it must never hold a secret
// (API key, password, token). Secrets belong in plain (non-prefixed)
// variables, which Next.js keeps server-only.
import { z } from "zod";

// Hosts differ on what an "unset" environment variable looks like. Some
// (Vercel, Cloudflare) create the variable with an empty string the moment
// you add its name in a dashboard, even before you type a value in — that's
// different from the variable being absent, which is what `.optional()`
// alone checks for. Treating "" the same as "not set" means a variable
// someone added but left blank is treated as missing, not invalid.
const emptyStringToUndefined = (value: unknown) => (value === "" ? undefined : value);

/** Used whenever NEXT_PUBLIC_SITE_URL isn't set on the current host. This is
 * the site's real, permanent production address — not a placeholder — so
 * that the sitemap, robots.txt, canonical tags and JSON-LD are always
 * correct even if a host's dashboard never gets NEXT_PUBLIC_SITE_URL set
 * (verified this can happen: Cloudflare Workers Builds' build step doesn't
 * reliably pick up a dashboard-configured variable for a statically
 * generated route like sitemap.ts). Setting NEXT_PUBLIC_SITE_URL still
 * overrides this, e.g. for a staging deployment on a different domain. */
const DEFAULT_SITE_URL = "https://wajidmarblefactory.com";

const envSchema = z.object({
  /** The site's own public address, e.g. "https://wajidmarble.com". Used to
   * build absolute URLs for SEO metadata, the sitemap, and JSON-LD — safe to
   * expose to the browser since it's just the site's own address. */
  NEXT_PUBLIC_SITE_URL: z.preprocess(emptyStringToUndefined, z.url().optional()),
  /** Resend's API key, for emailing quote requests. Optional: when it's not
   * set, quote requests are just logged on the server instead of emailed. */
  RESEND_API_KEY: z.preprocess(emptyStringToUndefined, z.string().min(1).optional()),
  /** Which address quote request emails get sent to. Optional for the same
   * reason as RESEND_API_KEY — both are required together for email to
   * actually go out (see `emailNotificationsEnabled` below). */
  QUOTE_NOTIFY_EMAIL: z.preprocess(emptyStringToUndefined, z.email().optional()),
});

const parsedEnv = envSchema.safeParse(process.env);

// Anything that failed validation (present, but not a valid URL/email) is
// dropped rather than allowed to crash the build — logged loudly so it
// still gets noticed and fixed, just not at the cost of a dead deployment.
const validated = parsedEnv.success ? parsedEnv.data : {};
if (!parsedEnv.success) {
  const issues = parsedEnv.error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
  console.warn(`[env] Ignoring invalid environment variable(s), using safe defaults instead:\n${issues}`);
}

if (!validated.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    `[env] NEXT_PUBLIC_SITE_URL is not set — defaulting to "${DEFAULT_SITE_URL}". ` +
      "Set this environment variable if the site is ever deployed to a different domain.",
  );
}

export const env = {
  NEXT_PUBLIC_SITE_URL: validated.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
  RESEND_API_KEY: validated.RESEND_API_KEY,
  QUOTE_NOTIFY_EMAIL: validated.QUOTE_NOTIFY_EMAIL,
};

// Everything above this line is deliberately non-fatal — a misconfigured
// variable falls back to a safe default so a build can never fail over it.
// This one check is the deliberate exception: DEFAULT_SITE_URL above is
// already the site's real domain, so the only way NEXT_PUBLIC_SITE_URL can
// still be "localhost" or "example.com" in a *production* build is if a
// host's dashboard has it explicitly set to one of those — exactly the
// broken-sitemap failure mode from earlier (Cloudflare silently served
// example.com URLs for days). A loud build failure here, with a message
// that says exactly what to fix, is better than a quiet wrong deploy.
if (
  process.env.NODE_ENV === "production" &&
  (env.NEXT_PUBLIC_SITE_URL.includes("localhost") || env.NEXT_PUBLIC_SITE_URL.includes("example.com"))
) {
  throw new Error(
    `[env] NEXT_PUBLIC_SITE_URL is set to "${env.NEXT_PUBLIC_SITE_URL}" in a production build — ` +
      "that looks like a local development or placeholder address, not this site's real domain. " +
      `Fix or remove NEXT_PUBLIC_SITE_URL in your host's environment variables (it should be unset, ` +
      `or set to "${DEFAULT_SITE_URL}") and rebuild.`,
  );
}

/** True only when both the Resend API key and a notify address are set —
 * i.e. when src/lib/notify.ts has everything it needs to actually send an
 * email instead of just logging the request. */
export const emailNotificationsEnabled = Boolean(env.RESEND_API_KEY && env.QUOTE_NOTIFY_EMAIL);

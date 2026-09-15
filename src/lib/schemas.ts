// This file holds the validation rules for data coming from forms — right
// now, just the quote request form — before the server trusts it or
// forwards it anywhere. Keeping validation rules in one place makes it easy
// to see exactly what counts as a "valid" submission, and means the same
// rules can be reused by both the browser (for instant feedback) and the
// server (which can never trust the browser alone — see the explanation in
// src/app/api/quote/route.ts).
import { z } from "zod";
import { stoneOptions } from "@/content/site";

export const quoteRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(80, "That name is too long."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(20, "That phone number is too long.")
    .regex(/^[0-9+\-\s()]+$/, "Phone numbers can only contain digits, +, -, spaces and brackets."),
  stone: z.enum(stoneOptions, { error: "Choose a stone type." }),
  details: z
    .string()
    .trim()
    .max(1500, "Keep project details under 1500 characters.")
    .optional()
    .default(""),
  // Real visitors never see or fill this field in (it's hidden off-screen by
  // the .honeypot class) — only an automated bot filling in every field
  // would put something here. It's typed loosely on purpose: the route
  // handler checks it's empty as a *separate* step after this schema
  // passes, so a bot that trips it gets a fake success response instead of
  // a validation error that would teach it what gave it away.
  company: z.string().optional().default(""),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

/** The validated fields worth actually delivering — everything except the
 * honeypot, which the route handler strips out once it's confirmed empty. */
export type QuoteRequestData = Omit<QuoteRequestInput, "company">;

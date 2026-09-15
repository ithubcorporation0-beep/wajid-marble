// The "Request a quote" form inside the Contact section. This has to be a
// client component ("use client") because it holds form state and reacts to
// typing and submitting — none of that can run on the server.
//
// It validates with the exact same zod schema the server uses
// (src/lib/schemas.ts), so a visitor sees a field-level error instantly
// without waiting on a round trip. But that client-side check is only
// skipped past, never trusted — the POST to /api/quote is validated again
// on the server no matter what this form thinks is valid (see the comment
// at the bottom of src/app/api/quote/route.ts for why that's not redundant).
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { contact, stoneOptions } from "@/content/site";
import type { StoneOption } from "@/content/site";
import { quoteRequestSchema } from "@/lib/schemas";
import { buildQuoteMessage, buildWhatsAppLink } from "@/lib/whatsapp";

interface FormValues {
  name: string;
  phone: string;
  stone: StoneOption;
  details: string;
  company: string;
}

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  phone: "",
  stone: stoneOptions[0],
  details: "",
  company: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const errorTextStyle = { color: "#e08a8a", fontSize: "0.78rem", marginTop: "6px" };

export default function QuoteForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((previous) => ({ ...previous, [field]: value }));
  }

  function applyFieldErrors(flattened: Partial<Record<string, string[]>>) {
    const next: FieldErrors = {};
    for (const key of Object.keys(flattened)) {
      const message = flattened[key]?.[0];
      if (message) next[key as keyof FormValues] = message;
    }
    setErrors(next);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = quoteRequestSchema.safeParse(values);
    if (!parsed.success) {
      applyFieldErrors(parsed.error.flatten().fieldErrors);
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields below.");
      return;
    }

    setErrors({});
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setStatusMessage(
          typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please call or WhatsApp us instead.",
        );
        if (data.fieldErrors) applyFieldErrors(data.fieldErrors);
        return; // never clear `values` — the visitor shouldn't have to retype anything
      }

      setStatus("success");
      setStatusMessage("Request sent — we'll be in touch shortly.");

      const message = buildQuoteMessage({
        name: values.name,
        phone: values.phone,
        stone: values.stone,
        details: values.details,
      });
      window.open(buildWhatsAppLink(message), "_blank", "noopener");
    } catch {
      setStatus("error");
      setStatusMessage("Couldn't reach the server. Please call or WhatsApp us instead.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form id="quoteForm" noValidate onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="fname">Full name</label>
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="Your name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "fname-error" : undefined}
        />
        {errors.name && (
          <p id="fname-error" role="alert" style={errorTextStyle}>
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="fphone">Phone number</label>
        <input
          type="tel"
          id="fphone"
          name="fphone"
          placeholder="03XX-XXXXXXX"
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "fphone-error" : undefined}
        />
        {errors.phone && (
          <p id="fphone-error" role="alert" style={errorTextStyle}>
            {errors.phone}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="fstone">Stone type</label>
        <select
          id="fstone"
          name="fstone"
          value={values.stone}
          onChange={(event) => updateField("stone", event.target.value as StoneOption)}
        >
          {stoneOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="fmsg">Project details</label>
        <textarea
          id="fmsg"
          name="fmsg"
          placeholder="Area, location, timeline..."
          value={values.details}
          onChange={(event) => updateField("details", event.target.value)}
          aria-invalid={Boolean(errors.details)}
          aria-describedby={errors.details ? "fmsg-error" : undefined}
        />
        {errors.details && (
          <p id="fmsg-error" role="alert" style={errorTextStyle}>
            {errors.details}
          </p>
        )}
      </div>

      {/* Spam trap: real visitors never see or fill this in (it's moved
          off-screen by the .honeypot class in primitives.css) — only an
          automated bot filling in every field on the page would. */}
      <input
        type="text"
        name="company"
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={values.company}
        onChange={(event) => updateField("company", event.target.value)}
      />

      <button type="submit" className="form-submit" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? "Sending…" : contact.form.submitLabel}
      </button>

      {statusMessage && (
        <p
          role="status"
          aria-live="polite"
          style={{
            fontSize: "0.82rem",
            marginTop: "14px",
            textAlign: "center",
            color: status === "success" ? "var(--gold-soft)" : "#e08a8a",
          }}
        >
          {statusMessage}
        </p>
      )}

      <div className="form-note">{contact.form.note}</div>
    </form>
  );
}

// This file will hold the validation rules for data coming from forms (like
// the quote request form) before the server trusts it or forwards it
// anywhere. Keeping validation rules in one place makes it easy to see
// exactly what counts as a "valid" submission. The real field-by-field rules
// are added once the quote form's fields are finalized (see
// src/components/forms/QuoteForm.tsx).

export type QuoteRequestInput = Record<string, unknown>;

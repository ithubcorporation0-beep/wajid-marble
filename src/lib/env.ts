// This file reads settings from the server's environment variables —
// configuration and secrets that should never be hard-coded or committed to
// git, like API keys. Every other file that needs one of these values should
// import it from here instead of reading `process.env` directly, so there is
// one place that knows what variables the app needs and fails loudly (at
// startup, not halfway through handling a visitor's request) if one is
// missing. See .env.example for the checklist of variables this app expects.

function readEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  /** Node's own environment flag: "development", "production" or "test". */
  nodeEnv: readEnv("NODE_ENV", "development"),
};

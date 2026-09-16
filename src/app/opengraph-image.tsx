// Next.js automatically renders this as the site's share-preview image —
// the picture that shows up when a link to this site is pasted into
// WhatsApp, Slack, X/Twitter, iMessage, etc. It's generated as a PNG from
// this JSX (via Next's built-in ImageResponse, no external image tool or
// design file needed) rather than a hand-made picture, so it always
// reflects the current business name/tagline from src/content/site.ts.
import { ImageResponse } from "next/og";
import { business } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B1916",
          color: "#EDE8DE",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#C9A870" }}>
          {business.city.toUpperCase()} · {business.country.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 600, marginTop: 24 }}>
          {business.brandPrefix} <span style={{ color: "#A9803F", marginLeft: 20 }}>{business.brandEmphasis}</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#8B8275", marginTop: 20 }}>{business.tagline}</div>
      </div>
    ),
    { ...size },
  );
}

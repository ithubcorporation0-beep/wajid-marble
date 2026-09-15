// Next.js automatically shows this page whenever someone visits a web
// address that doesn't match any real page on the site (a broken link, a
// typo'd URL, etc). Styled to match the rest of the site rather than
// showing a bare, unstyled error.
import Link from "next/link";
import { business } from "@/content/site";

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <div className="eyebrow" style={{ justifyContent: "center" }}>
          404
        </div>
        <h1 style={{ marginBottom: "20px" }}>This page doesn&apos;t exist.</h1>
        <p style={{ color: "var(--taupe)", marginBottom: "36px", maxWidth: "460px", marginInline: "auto" }}>
          The page you&apos;re looking for may have moved or never existed. Head back to the
          {" "}{business.name} homepage, or get in touch below.
        </p>
        <Link href="/#top" className="btn btn-solid">
          Back to homepage
        </Link>
      </div>
    </section>
  );
}

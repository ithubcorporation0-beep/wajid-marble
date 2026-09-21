// The small "Home / Marble in Mardan" trail shown at the top of every
// sub-page, so a visitor always knows where they are and can get back to
// the homepage in one click. Pairs with BreadcrumbJsonLd — same data, one
// for people, one for search engines — so the two can't disagree with
// each other.
import Link from "next/link";
import type { BreadcrumbItem } from "@/types";

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            {index < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// A standard accordion: every question is visible, every answer starts
// collapsed, and clicking a question smoothly reveals its answer while
// closing whichever one was open before. Needs to track "which answer is
// open" as state, so — unlike most of this site — it has to run in the
// browser. Used by both the homepage FAQ (Faq.tsx) and every SEO service
// page (ServicePageLayout.tsx) so the two never drift into different
// markup or behavior.
"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/types";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const open = index === openIndex;
        const answerId = `${baseId}-answer-${index}`;

        return (
          <div className={`faq-item${open ? " open" : ""}`} key={item.question}>
            <button
              type="button"
              className="faq-question"
              aria-expanded={open}
              aria-controls={answerId}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <h3>{item.question}</h3>
              <span className="faq-icon" aria-hidden="true" />
            </button>
            <div className="faq-answer-wrap" id={answerId} role="region">
              <div className="faq-answer-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import {
  SUBMISSION_CATEGORIES,
  type Submission,
  type SubmissionCategory,
} from "@/lib/seed-data";

function Logo() {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/50 text-gold">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 2l2.4 6.4L21 9l-5 4.2L17.6 20 12 16.4 6.4 20 8 13.2 3 9l6.6-.6z" />
      </svg>
    </span>
  );
}

export function OpenPrints({ submissions }: { submissions: Submission[] }) {
  const [category, setCategory] = useState<"All" | SubmissionCategory>("All");
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const filtered = useMemo(
    () => (category === "All" ? submissions : submissions.filter((s) => s.category === category)),
    [submissions, category],
  );

  function toggle(id: number) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filters: ("All" | SubmissionCategory)[] = ["All", ...SUBMISSION_CATEGORIES];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setCategory(f)}
            className={`chip ${
              category === f ? "border-gold bg-gold/10 text-gold-soft" : "hover:border-gold/50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <div
            key={s.id}
            className={`flip-card ${flipped.has(s.id) ? "is-flipped" : ""}`}
            onClick={() => toggle(s.id)}
            role="button"
            tabIndex={0}
            aria-label={`Flip submission: ${s.vision.slice(0, 40)}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(s.id);
              }
            }}
          >
            <div className="flip-inner">
              <div className="flip-face flip-front">
                <div className="flex items-center justify-between">
                  <Logo />
                  <span className="chip border-gold/40 text-gold-soft">{s.category}</span>
                </div>
                <p className="mt-4 font-display text-2xl leading-snug text-bone">
                  {s.author ?? "Anonymous Hermit"}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-gold/80">
                  Open Print · may be conjured
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ash/70">Tap to flip →</p>
              </div>
              <div className="flip-face flip-back">
                <p className="font-title text-[10px] uppercase tracking-[0.24em] text-gold-soft">
                  The Vision
                </p>
                <p className="mt-2 text-sm leading-relaxed text-bone/90">{s.vision}</p>
                <p className="mt-4 font-display text-lg italic text-gold-soft">
                  — {s.author ?? "Anonymous Hermit"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

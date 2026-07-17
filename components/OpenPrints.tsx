"use client";

import { useState } from "react";
import type { CustomOrder } from "@/lib/seed-data";

export function OpenPrints({ submissions }: { submissions: CustomOrder[] }) {
  const [flipped, setFlipped] = useState<number | null>(null);

  if (!submissions.length) {
    return (
      <div className="rounded-2xl border border-line bg-surface/50 p-8 text-center">
        <p className="text-ash">No custom orders yet. Be the first to submit your vision.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {submissions.slice(0, 6).map((sub) => (
        <div
          key={sub.id}
          className={`flip-card ${flipped === sub.id ? "is-flipped" : ""}`}
          onClick={() => setFlipped(flipped === sub.id ? null : sub.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setFlipped(flipped === sub.id ? null : sub.id)}
          aria-label={`View vision from ${sub.author ?? "Anonymous"}`}
        >
          <div className="flip-inner">
            <div className="flip-face flip-front">
              <p className="font-title text-[10px] uppercase tracking-[0.24em] text-gold">
                {sub.category} · {sub.status}
              </p>
              <p className="mt-2 font-display text-lg italic text-bone">
                {sub.author ?? "Anonymous Hermit"}
              </p>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-ash/90">
                {sub.vision}
              </p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ash/50">
                Tap to reveal ↩
              </p>
            </div>
            <div className="flip-face flip-back">
              <p className="font-title text-[10px] uppercase tracking-[0.24em] text-gold-soft">
                The Vision
              </p>
              <p className="mt-3 text-sm leading-relaxed text-bone/90">{sub.vision}</p>
              {sub.author && (
                <p className="mt-4 text-xs italic text-ash">— {sub.author}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

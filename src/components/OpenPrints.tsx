"use client";
import { useState } from "react";
import type { CustomOrderData } from "@/lib/data";

export function OpenPrints({ submissions }: { submissions: CustomOrderData[] }) {
  const [flipped, setFlipped] = useState<number | null>(null);
  if (submissions.length === 0) {
    return <p className="text-ash text-sm">No visions submitted yet. Be the first.</p>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {submissions.slice(0, 9).map((s) => (
        <button
          key={s.id}
          onClick={() => setFlipped(flipped === s.id ? null : s.id)}
          className="group relative h-40 overflow-hidden rounded-2xl border border-line bg-surface/50 p-5 text-left transition-all hover:border-gold/40"
        >
          {flipped === s.id ? (
            <div className="h-full overflow-auto">
              <p className="text-sm text-bone leading-relaxed">{s.vision}</p>
              {s.author && <p className="mt-3 text-xs uppercase tracking-[0.16em] text-gold">— {s.author}</p>}
            </div>
          ) : (
            <div className="flex h-full flex-col justify-between">
              <span className="chip border-gold/40 text-gold-soft self-start">{s.category}</span>
              <p className="text-xs uppercase tracking-[0.16em] text-ash group-hover:text-bone">Tap to reveal vision</p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

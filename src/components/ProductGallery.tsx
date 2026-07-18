"use client";
import { useState } from "react";
import { ProductArt } from "./ProductArt";

interface ProductGalleryProps {
  seed: string;
  category: string;
  name: string;
}

export function ProductGallery({ seed, category, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl border border-line aspect-[4/5]">
        <ProductArt seed={seed} category={category} index={selectedIndex} className="h-full w-full object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`View ${name} artwork variation ${i + 1}`}
            onClick={() => setSelectedIndex(i)}
            aria-pressed={selectedIndex === i}
            className={`relative aspect-square overflow-hidden rounded-lg border border-line transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${selectedIndex === i ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
          >
            <ProductArt seed={seed} category={category} index={i} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

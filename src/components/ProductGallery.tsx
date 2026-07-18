"use client";
import { ProductArt } from "./ProductArt";

interface ProductGalleryProps {
  seed: string;
  category: string;
  name: string;
}

export function ProductGallery({ seed, category, name }: ProductGalleryProps) {
  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl border border-line aspect-[4/5]">
        <ProductArt seed={seed} category={category} className="h-full w-full object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-line opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
            <ProductArt seed={seed} category={category} index={i} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

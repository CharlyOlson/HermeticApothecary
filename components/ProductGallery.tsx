import { ProductArt } from "./ProductArt";
import type { Category } from "@/lib/seed-data";

export function ProductGallery({
  seed,
  category,
  name,
}: {
  seed: string;
  category: string;
  name: string;
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold/30 shadow-2xl">
      <ProductArt
        seed={seed}
        category={category as Category}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void/30 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="font-title text-[11px] uppercase tracking-[0.24em] text-gold-soft">
          {category}
        </p>
        <p className="mt-1 font-display text-2xl text-bone">{name}</p>
      </div>
    </div>
  );
}

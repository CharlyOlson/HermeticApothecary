"use client";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/seed-data";
import { CATEGORIES } from "@/lib/seed-data";

const ALL_CATEGORIES = ["All", ...CATEGORIES];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top Rated" },
];

export function ShopClient({ products, initialCategory, initialSort }: { products: Product[]; initialCategory: string; initialSort: string; }) {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);

  const filtered = products
    .filter((p) => category === "All" || p.category === category)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "newest") return b.createdAt.localeCompare(a.createdAt);
      if (sort === "rating") return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`chip cursor-pointer transition-colors ${category === c ? "border-gold text-gold" : "text-ash hover:text-bone"}`}>{c}</button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="input w-auto">
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value} className="bg-ink">{o.label}</option>)}
        </select>
      </div>
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-ash">No relics found in this altar.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

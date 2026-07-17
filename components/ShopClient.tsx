"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { CATEGORIES } from "@/lib/seed-data";
import type { Product } from "@/lib/seed-data";

type Sort = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

const SORT_OPTIONS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Most Loved" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function sortProducts(products: Product[], sort: Sort): Product[] {
  const arr = [...products];
  switch (sort) {
    case "price-asc": return arr.sort((a, b) => a.price - b.price);
    case "price-desc": return arr.sort((a, b) => b.price - a.price);
    case "newest": return arr.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "rating": return arr.sort((a, b) => b.rating - a.rating);
    default: return arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

export function ShopClient({
  products,
  initialCategory,
  initialSort,
}: {
  products: Product[];
  initialCategory: string;
  initialSort: Sort;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<Sort>(initialSort);

  const filtered = category === "All" ? products : products.filter((p) => p.category === category);
  const sorted = sortProducts(filtered, sort);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("All")}
            className={`chip cursor-pointer ${category === "All" ? "border-gold text-gold" : ""}`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`chip cursor-pointer ${category === cat ? "border-gold text-gold" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="shrink-0">
          <select
            className="rounded-xl border border-line bg-ink/60 px-3 py-2 text-sm text-bone outline-none focus:border-gold"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-ink">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {sorted.length === 0 ? (
        <p className="mt-12 text-center text-ash">No relics found in this altar.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
      <p className="mt-8 text-center text-sm text-ash/60">
        {sorted.length} relic{sorted.length !== 1 ? "s" : ""} found
      </p>
    </div>
  );
}

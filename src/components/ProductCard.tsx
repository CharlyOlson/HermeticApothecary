"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { ProductArt } from "./ProductArt";
import { StarRating } from "./StarRating";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/seed-data";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, justAdded } = useCart();
  const added = justAdded === product.id;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/50 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40">
      <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="relative block aspect-[4/5] overflow-hidden">
        <ProductArt
          seed={product.artSeed}
          category={product.category}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <span className="chip border-gold/40 bg-void/60 text-gold-soft">{product.category}</span>
        </div>
        {product.featured && (
          <div className="absolute right-3 top-3">
            <span className="chip border-blood/50 bg-void/60 text-blood">Featured</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <StarRating value={product.rating} size={14} showValue />
          <span className="text-[11px] text-ash">({product.reviewCount})</span>
        </div>
        <Link href={`/product/${product.slug}`} className="mt-2">
          <h3 className="font-display text-xl leading-tight text-bone transition-colors group-hover:text-gold">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-ash">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-display text-2xl text-bone">{formatPrice(product.price)}</span>
          <button
            onClick={() =>
              addItem({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                category: product.category,
                artSeed: product.artSeed,
              })
            }
            className={`btn relative h-10 px-4 text-[11px] ${
              added ? "bg-emerald text-void" : "border border-gold/50 text-gold hover:bg-gold hover:text-void"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

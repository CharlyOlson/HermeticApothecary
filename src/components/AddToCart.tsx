"use client";

import { useCart } from "./CartProvider";
import type { Product } from "@/lib/seed-data";

export function AddToCart({ product }: { product: Product }) {
  const { addItem, justAdded } = useCart();
  const added = justAdded === product.id;

  return (
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
      className={`btn flex-1 ${added ? "bg-emerald text-void" : "btn-gold"}`}
    >
      {added ? "Added to Cart ✓" : "Add to Cart"}
    </button>
  );
}

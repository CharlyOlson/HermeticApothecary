"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { ProductArt } from "./ProductArt";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, total, count } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-line bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,0.7,0.2,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <p className="eyebrow">Your Reliquary</p>
            <h2 className="font-display text-2xl text-bone">
              Cart {count > 0 && <span className="text-ash">({count})</span>}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ash transition-colors hover:border-gold hover:text-gold"
            aria-label="Close cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full border border-line text-gold">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M6 7h12l-1 13H7L6 7z" />
                  <path d="M9 7a3 3 0 0 1 6 0" />
                </svg>
              </div>
              <p className="mt-5 font-display text-xl text-bone">Your cart is empty</p>
              <p className="mt-2 max-w-[240px] text-sm text-ash">
                Nothing consecrated yet. Go forth and gather.
              </p>
              <button onClick={closeCart} className="btn-ghost mt-6">
                Browse the Shop
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 rounded-xl border border-line bg-surface/50 p-3">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-line"
                  >
                    <ProductArt seed={item.artSeed} category={item.category as never} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="font-display text-lg leading-tight text-bone hover:text-gold"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-ash transition-colors hover:text-blood"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs uppercase tracking-[0.16em] text-ash">{item.category}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="grid h-7 w-7 place-items-center text-bone hover:text-gold"
                          aria-label="Decrease quantity"
                        >
                          –
                        </button>
                        <span className="w-8 text-center text-sm text-bone">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="grid h-7 w-7 place-items-center text-bone hover:text-gold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-gold">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-6 py-5">
            <div className="flex items-center justify-between text-sm text-ash">
              <span>Subtotal</span>
              <span className="font-display text-xl text-bone">{formatPrice(total)}</span>
            </div>
            <p className="mt-1 text-xs text-ash/70">Shipping & rituals calculated at checkout.</p>
            <Link href="/checkout" onClick={closeCart} className="btn-gold mt-4 w-full">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

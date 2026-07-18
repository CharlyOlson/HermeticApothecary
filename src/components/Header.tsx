"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";

export function Header() {
  const { count, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/50 text-gold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M12 2l2.4 6.4L21 9l-5 4.2L17.6 20 12 16.4 6.4 20 8 13.2 3 9l6.6-.6z" />
            </svg>
          </span>
          <span className="font-occult text-xl text-bone">Hermits Apothecary</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-ash md:flex">
          <Link href="/gallery" className="hover:text-bone">Gallery</Link>
          <Link href="/shop" className="hover:text-bone">Shop</Link>
          <Link href="/submit" className="hover:text-bone">Submit</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ash hover:border-gold hover:text-gold md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
          <button onClick={openCart} className="relative grid h-10 w-10 place-items-center rounded-full border border-line text-ash hover:border-gold hover:text-gold" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-gold text-[11px] font-bold text-void">{count > 9 ? "9+" : count}</span>
            )}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className={`${isMenuOpen ? "block" : "hidden"} border-t border-line px-5 py-4 text-sm text-ash md:hidden`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <Link href="/gallery" className="hover:text-bone" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
          <Link href="/shop" className="hover:text-bone" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link href="/submit" className="hover:text-bone" onClick={() => setIsMenuOpen(false)}>Submit</Link>
        </div>
      </nav>
    </header>
  );
}

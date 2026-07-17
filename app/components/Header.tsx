"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";

const NAV = [
  { href: "/gallery", label: "Gallery" },
  { href: "/shop", label: "Shop" },
  { href: "/submit", label: "Custom Order" },
  { href: "/#about", label: "About" },
];

export function Header() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <button
          className="md:hidden text-bone"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <Link href="/" className="order-2 md:order-1 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 text-gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M12 2l2.4 6.4L21 9l-5 4.2L17.6 20 12 16.4 6.4 20 8 13.2 3 9l6.6-.6z" />
            </svg>
          </span>
          <span className="font-occult text-2xl leading-none text-bone">Hermits Apothecary</span>
        </Link>

        <nav className="order-3 md:order-2 hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="font-title text-[12px] uppercase tracking-[0.22em] text-ash transition-colors hover:text-gold"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="order-1 md:order-3 flex items-center gap-3">
          <button
            onClick={openCart}
            className="group relative inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-bone transition-colors hover:border-gold hover:text-gold"
            aria-label="Open cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 7h12l-1 13H7L6 7z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            <span className="hidden sm:inline font-title text-[11px] uppercase tracking-[0.18em]">Cart</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-gold text-[11px] font-semibold text-void">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-line/70 bg-ink/95 px-5 py-4">
          <div className="flex flex-col gap-3">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="font-title text-[12px] uppercase tracking-[0.22em] text-ash hover:text-gold"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function Header() {
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-void/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 text-gold transition-colors group-hover:border-gold group-hover:bg-gold/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M12 2l2.4 6.4L21 9l-5 4.2L17.6 20 12 16.4 6.4 20 8 13.2 3 9l6.6-.6z" />
            </svg>
          </span>
          <span className="font-occult text-xl text-bone">Hermits Apothecary</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {[
            { href: "/gallery", label: "Gallery" },
            { href: "/shop", label: "Shop" },
            { href: "/submit", label: "Commissions" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="font-title text-[12px] uppercase tracking-[0.18em] text-ash transition-colors hover:text-bone">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={openCart}
          className="relative grid h-10 w-10 place-items-center rounded-full border border-line text-ash transition-colors hover:border-gold hover:text-gold"
          aria-label={`Open cart (${count} item${count !== 1 ? "s" : ""})`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M6 7h12l-1 13H7L6 7z" />
            <path d="M9 7a3 3 0 0 1 6 0" />
          </svg>
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-void">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

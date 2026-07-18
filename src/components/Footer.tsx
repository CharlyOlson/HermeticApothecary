import Link from "next/link";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line/70 bg-ink/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 text-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 2l2.4 6.4L21 9l-5 4.2L17.6 20 12 16.4 6.4 20 8 13.2 3 9l6.6-.6z" />
              </svg>
            </span>
            <span className="font-occult text-2xl text-bone">Hermetic Apothecary</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">
            Sacred objects for the beautifully damned. Art, ritual, and
            reliquary for the modern mystic — made by hand, kept by hex.
          </p>
        </div>

        <div>
          <h4 className="font-title text-[12px] uppercase tracking-[0.22em] text-gold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-ash">
            <li><Link href="/gallery" className="hover:text-bone">The Gallery</Link></li>
            <li><Link href="/shop" className="hover:text-bone">Shop</Link></li>
            <li><Link href="/submit" className="hover:text-bone">Submit Your Story</Link></li>
            <li><Link href="/house-of-heathens-harlots-and-heretics" className="text-gold/90 hover:text-gold-soft">18+ House</Link></li>
            <li><Link href="/#confession-wall" className="hover:text-bone">Confession Wall</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-title text-[12px] uppercase tracking-[0.22em] text-gold">The Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-ash">
            <li><Link href="/shop?category=Art+Prints" className="hover:text-bone">Art Prints</Link></li>
            <li><Link href="/shop?category=Custom+Tees" className="hover:text-bone">Custom Tees</Link></li>
            <li><Link href="/shop?category=Jewelry" className="hover:text-bone">Jewelry</Link></li>
            <li><Link href="/shop?sort=rating" className="hover:text-bone">Most Loved</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-title text-[12px] uppercase tracking-[0.22em] text-gold">Join the Conclave</h4>
          <p className="mt-4 text-sm text-ash">New pieces, private drops, and the occasional omen.</p>
          <div className="mt-4">
            <Newsletter />
          </div>
        </div>
      </div>
      <div className="border-t border-line/60 px-5 py-6 text-center text-[11px] uppercase tracking-[0.2em] text-ash/70">
        © {new Date().getFullYear()} Hermetic Apothecary — Made by hand, kept by hex.
      </div>
    </footer>
  );
}

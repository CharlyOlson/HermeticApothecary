import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { ProductArt } from "@/components/ProductArt";
import { StarRating } from "@/components/StarRating";
import { OpenPrints } from "@/components/OpenPrints";
import { getFeaturedProducts, getProducts, getCustomOrders, getPieces } from "@/lib/data";
import { CATEGORIES, type Category } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

const COLLECTION_BLURB: Record<Category, string> = {
  "Art Prints": "Gilded devotions for your walls.",
  "Resin & Epoxy": "Still storms, sealed in glass.",
  "Custom Tees": "Mantras for the faithless.",
  "Ouija Boards": "Conversations with the quiet.",
  Jewelry: "Relics to wear like armor.",
  Novelty: "Small rituals, daily magic.",
};

export default async function HomePage() {
  const featured = await getFeaturedProducts(8);
  const all = await getProducts({ sort: "featured" });
  const hero = featured[0] ?? all[0];
  const submissions = await getCustomOrders();
  const pieces = getPieces();
  const pieceProducts = pieces
    .map((p) => all.find((x) => x.slug === p.slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const collections = CATEGORIES.map((cat) => ({
    category: cat,
    product: all.find((p) => p.category === cat)!,
  })).filter((c) => c.product);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative grain">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <Reveal>
              <p className="eyebrow">Hermits Apothecary · Est. in the dark</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-4 text-balance font-display text-5xl leading-[0.98] text-bone text-shadow-ritual sm:text-6xl lg:text-7xl">
                Sacred objects for the{" "}
                <span className="italic text-gold">beautifully damned.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ash">
                Art, ritual, and reliquary for the modern mystic — visually
                striking, deep in meaning, and just a little bit unholy.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/gallery" className="btn-gold">
                  Enter the Gallery
                </Link>
                <Link href="/shop" className="btn-outline-light">
                  Shop the Reckoning
                </Link>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-10 flex items-center gap-6 text-sm text-ash">
                <div>
                  <p className="font-display text-2xl text-bone">25+</p>
                  <p className="uppercase tracking-[0.16em] text-[11px]">Relics</p>
                </div>
                <div className="h-8 w-px bg-line" />
                <div>
                  <p className="font-display text-2xl text-bone">5</p>
                  <p className="uppercase tracking-[0.16em] text-[11px]">Pieces</p>
                </div>
                <div className="h-8 w-px bg-line" />
                <div>
                  <p className="font-display text-2xl text-bone">∞</p>
                  <p className="uppercase tracking-[0.16em] text-[11px]">Visions</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative">
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[2rem] border border-gold/30 shadow-2xl">
              <ProductArt seed={hero.artSeed} category={hero.category} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-title text-[11px] uppercase tracking-[0.24em] text-gold">
                  Featured Piece
                </p>
                <p className="mt-1 font-display text-2xl text-bone">{hero.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <StarRating value={hero.rating} size={14} />
                  <span className="text-xs text-ash">({hero.reviewCount})</span>
                </div>
              </div>
            </div>
            <div className="absolute -left-4 top-8 hidden -rotate-6 rounded-xl border border-line bg-ink/80 px-4 py-3 backdrop-blur md:block">
              <p className="font-occult text-lg text-gold">Hail Yourself</p>
            </div>
            <div className="absolute -right-3 bottom-10 hidden rotate-6 rounded-xl border border-line bg-ink/80 px-4 py-3 backdrop-blur md:block">
              <p className="font-title text-[11px] uppercase tracking-[0.2em] text-bone">
                Light · Hex · Repeat
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-line bg-ink/50 py-3">
        <div className="flex gap-10 overflow-hidden whitespace-nowrap">
          <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] gap-10 font-title text-[12px] uppercase tracking-[0.3em] text-ash/70">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              ["Name It & Claim It", "Love the Sinner", "We Forgive You But", "Holier Than Thou", "Sunday Marquee", "Confession Wall", "Custom Merch", "Reclaim Your Truth"].map(
                (w) => (
                  <span key={`${k}-${w}`} className="flex items-center gap-10">
                    {w}
                    <span className="text-gold">✦</span>
                  </span>
                ),
              ),
            )}
          </div>
        </div>
      </div>

      {/* FIVE PIECES */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">The Exhibition</p>
              <h2 className="mt-3 font-display text-4xl text-bone sm:text-5xl">The Five Pieces</h2>
            </div>
            <Link href="/gallery" className="btn-ghost">Enter the Gallery</Link>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {pieceProducts.map((p, i) => (
            <Reveal key={p.id} delay={(i % 5) * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* OPEN PRINTS */}
      <section id="open-prints" className="border-y border-line bg-ink/40">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">The Open Print Altar</p>
              <h2 className="mt-3 font-display text-4xl text-bone sm:text-5xl">
                Visions from the congregation
              </h2>
              <p className="mt-4 text-ash">
                Every custom order we receive gets a chance to be conjured into
                an official open-edition print. Flip a card to read the
                vision — or add your own on the{" "}
                <Link href="/submit" className="text-gold hover:underline">Submit a Custom Order</Link>{" "}
                page.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <OpenPrints submissions={submissions} />
          </Reveal>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">The Shop</p>
              <h2 className="mt-3 font-display text-4xl text-bone sm:text-5xl">
                Wear the reclamation
              </h2>
            </div>
            <Link href="/shop" className="btn-ghost">Shop All</Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => (
            <Reveal key={c.category} delay={i * 60}>
              <Link
                href={`/shop?category=${encodeURIComponent(c.category)}`}
                className="group relative flex h-64 items-end overflow-hidden rounded-2xl border border-line"
              >
                <ProductArt
                  seed={c.product.artSeed}
                  category={c.category}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/30 to-transparent" />
                <div className="relative p-6">
                  <p className="font-title text-[11px] uppercase tracking-[0.24em] text-gold">Collection</p>
                  <h3 className="mt-1 font-display text-3xl text-bone">{c.category}</h3>
                  <p className="mt-1 max-w-xs text-sm text-ash">{COLLECTION_BLURB[c.category]}</p>
                </div>
                <span className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-bone/30 text-bone transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Consecrated Favorites</p>
              <h2 className="mt-3 font-display text-4xl text-bone sm:text-5xl">The most loved relics</h2>
            </div>
            <Link href="/shop?sort=rating" className="btn-ghost">View All Reviews</Link>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT — scaled down */}
      <section id="about" className="border-y border-line bg-ink/40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-gold/30">
              <ProductArt seed="the-hermit-studio" category="Art Prints" index={2} className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">The Hermit</p>
            <h2 className="mt-3 font-display text-4xl text-bone sm:text-5xl">
              We make the things we needed
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ash">
              Hermits Apothecary began in a basement studio lit by a single
              candle — a response to art that felt disposable and faith that
              felt like a cage. We make objects for people who left the church
              but kept the mystery: slow-made, small-batch, and
              unapologetically strange.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="chip border-gold/40 text-gold-soft">Slow-made</span>
              <span className="chip border-gold/40 text-gold-soft">Small batch</span>
              <span className="chip border-gold/40 text-gold-soft">Unapologetic</span>
              <span className="chip border-gold/40 text-gold-soft">Strange</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUOTE BAND */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center">
        <Reveal>
          <p className="font-occult text-5xl leading-tight text-gold sm:text-6xl">
            “Pray later. Hex now.”
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.24em] text-ash">— Hermits Apothecary</p>
        </Reveal>
      </section>

      {/* NEWSLETTER BAND */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-surface to-ink p-10 text-center md:p-16">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
            <p className="eyebrow">Join the Conclave</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-balance font-display text-4xl text-bone sm:text-5xl">
              New pieces, private drops, and the occasional omen
            </h2>
            <div className="mt-8 flex justify-center">
              <Link href="/shop" className="btn-gold">Start Shopping</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

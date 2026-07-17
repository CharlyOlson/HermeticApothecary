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
              <ProductArt seed={hero?.artSeed ?? ""} category={hero?.category ?? "Art Prints"} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-title text-[11px] uppercase tracking-[0.24em] text-gold">
                  Featured Piece
                </p>
                <p className="mt-1 font-display text-2xl text-bone">{hero?.name ?? "Untitled"}</p>
                <div className="mt-1 flex items-center gap-2">
                  <StarRating value={hero?.rating ?? 0} size={14} />
                  <span className="text-xs text-ash">({hero?.reviewCount ?? 0})</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* other sections omitted in scaffold for brevity */}
    </div>
  );
}

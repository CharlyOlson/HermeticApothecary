import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { ReviewSection } from "@/components/ReviewSection";
import { StarRating } from "@/components/StarRating";
import { AddToCart } from "@/components/AddToCart";
import { getProductBySlug, getReviews, getRelatedProducts } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  return { title: product.name, description: product.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const reviews = await getReviews(product.id);
  const related = await getRelatedProducts(product, 4);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <nav className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-ash">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gold">Shop</Link>
        <span>/</span>
        <span className="text-bone">{product.category}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery seed={product.artSeed} category={product.category} name={product.name} />

        <div className="lg:py-4">
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl text-bone sm:text-5xl">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <StarRating value={product.rating} size={18} />
            <span className="text-sm text-ash">
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </span>
          </div>

          <p className="mt-6 font-display text-3xl text-gold">{formatPrice(product.price)}</p>

          <p className="mt-6 leading-relaxed text-ash">{product.description}</p>

          <ul className="mt-6 space-y-2 border-t border-line pt-6">
            {product.details.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-bone/90">
                <span className="mt-1 text-gold">✦</span>
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span key={t} className="chip">#{t}</span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AddToCart product={product} />
            <Link href="/shop" className="btn-ghost">
              Keep Browsing
            </Link>
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-ash/70">
            Materials · {product.materials}
          </p>
        </div>
      </div>

      <ReviewSection productId={product.id} initialReviews={reviews} />

      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-end justify-between border-b border-line pb-6">
            <div>
              <p className="eyebrow">From the same altar</p>
              <h2 className="mt-2 font-display text-3xl text-bone">More {product.category}</h2>
            </div>
            <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="btn-ghost">
              View All
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

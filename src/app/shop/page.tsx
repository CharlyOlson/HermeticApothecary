import type { Metadata } from "next";
import { ShopClient } from "@/components/ShopClient";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse art prints, resin relics, custom tees, ouija boards, jewelry, and novelty from Hermits Apothecary.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const category = sp.category ?? "All";
  const sort = (sp.sort ?? "featured") as
    | "featured"
    | "price-asc"
    | "price-desc"
    | "newest"
    | "rating";
  const products = await getProducts({ category, sort });

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="border-b border-line pb-8">
        <p className="eyebrow">The Apothecary</p>
        <h1 className="mt-3 font-display text-5xl text-bone sm:text-6xl">Shop the relics</h1>
        <p className="mt-4 max-w-xl text-ash">
          Filter by altar, sort by what calls to you. Everything is made in
          small batches and shipped with a small blessing.
        </p>
      </div>
      <div className="pt-8">
        <ShopClient products={products} initialCategory={category} initialSort={sort} />
      </div>
    </div>
  );
}

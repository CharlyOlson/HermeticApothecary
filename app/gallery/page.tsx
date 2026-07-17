import type { Metadata } from "next";
import { GalleryView } from "@/components/GalleryView";
import { getPieces } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Five Pieces",
  description:
    "Five works that dissect harmful religious language and offer reclamation through art and custom merchandise.",
};

export default async function GalleryPage() {
  const pieces = getPieces();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="border-b border-line pb-8">
        <p className="eyebrow">The Collection</p>
        <h1 className="mt-3 font-display text-5xl text-bone sm:text-6xl">The Anchor Pieces</h1>
        <p className="mt-4 max-w-2xl text-ash">
          Five works from the studio — each with its own invocation, lore, and
          blessing. Turn any of them into wearable art with{" "}
          <span className="text-gold">Make Merch</span>, or take the original
          print home.
        </p>
      </div>

      <div className="py-10">
        <GalleryView pieces={pieces} />
      </div>
    </div>
  );
}

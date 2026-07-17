"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductArt } from "./ProductArt";
import { useCart } from "./CartProvider";
import { type Piece } from "@/lib/seed-data";

const MERCH = [
  { type: "T-Shirt", price: 28, sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"] },
  { type: "Hoodie", price: 52, sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"] },
  { type: "Hat", price: 22, sizes: ["One Size"] },
  { type: "Beanie", price: 20, sizes: ["One Size"] },
  { type: "Underwear", price: 18, sizes: ["XS", "S", "M", "L", "XL"] },
  { type: "Bra", price: 36, sizes: ["XS", "S", "M", "L", "XL"] },
];
const COLORS = ["Black", "White", "Navy", "Red", "Gray"];

export function GalleryView({ pieces }: { pieces: Piece[] }) {
  const { addItem } = useCart();
  const [active, setActive] = useState<Piece | null>(null);
  const [merch, setMerch] = useState(MERCH[0].type);
  const [size, setSize] = useState(MERCH[0].sizes[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [qty, setQty] = useState(1);

  function open(piece: Piece) {
    setActive(piece);
    setMerch(MERCH[0].type);
    setSize(MERCH[0].sizes[0]);
    setColor(COLORS[0]);
    setQty(1);
  }

  function add() {
    if (!active) return;
    const m = MERCH.find((x) => x.type === merch)!;
    addItem({
      id: 9000 + active.id,
      slug: active.slug,
      name: `${active.name} — ${merch} (${color}, ${size})`,
      price: m.price,
      category: "Custom Tees",
      artSeed: active.slug,
    }, qty);
    setActive(null);
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {pieces.map((p, i) => (
          <div key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/50">
            <div className="relative aspect-[4/3] overflow-hidden">
              <ProductArt seed={p.slug} category="Art Prints" index={i} className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 chip border-gold/40 bg-void/60 text-gold-soft">
                Piece {i + 1}
              </span>
            </div>
              <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-3xl text-bone">{p.name}</h3>
              <p className="mt-3 font-display text-xl italic text-ash">{p.invocation}</p>
              <div className="mt-4 rounded-xl border border-line bg-ink/40 p-4">
                <p className="font-title text-[10px] uppercase tracking-[0.24em] text-gold-soft">The Lore</p>
                <p className="mt-1 text-sm text-bone/90">{p.lore}</p>
                <p className="font-title text-[10px] uppercase tracking-[0.24em] text-bone mt-3">The Blessing</p>
                <p className="mt-1 font-display text-lg italic text-gold">{p.blessing}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button onClick={() => open(p)} className="btn-gold">Make Merch</button>
                <Link href={`/product/${p.slug}`} className="btn-ghost">Shop the Print</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-ink p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Customize</p>
                <h3 className="mt-1 font-display text-2xl text-bone">{active.name}</h3>
                <p className="mt-1 text-sm italic text-ash">{active.invocation}</p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ash hover:border-gold hover:text-gold"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="label">Merchandise</label>
                <select className="input" value={merch} onChange={(e) => { setMerch(e.target.value); setSize(MERCH.find((x) => x.type === e.target.value)!.sizes[0]); }}>
                  {MERCH.map((m) => (
                    <option key={m.type} className="bg-ink" value={m.type}>
                      {m.type} — ${m.price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Size</label>
                  <select className="input" value={size} onChange={(e) => setSize(e.target.value)}>
                    {MERCH.find((x) => x.type === merch)!.sizes.map((s) => (
                      <option key={s} className="bg-ink" value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Color</label>
                  <select className="input" value={color} onChange={(e) => setColor(e.target.value)}>
                    {COLORS.map((c) => (
                      <option key={c} className="bg-ink" value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Quantity</label>
                <input type="number" min={1} max={100} value={qty} onChange={(e) => setQty(Math.max(1, Math.min(100, Number(e.target.value) || 1)))} className="input" />
              </div>
            </div>

            <button onClick={add} className="btn-gold mt-6 w-full">
              Add to Cart · ${MERCH.find((x) => x.type === merch)!.price * qty}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

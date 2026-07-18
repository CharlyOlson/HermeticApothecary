"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { ProductArt } from "@/components/ProductArt";

interface OrderView {
  id: number;
  total: number;
  email: string;
  name: string;
  items: { name: string; price: number; quantity: number; category?: string; artSeed?: string }[];
}

export default function SuccessPage() {
  const [order, setOrder] = useState<OrderView | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("order");
    const token = params.get("token");
    setOrderId(id);
    if (!id || !token) {
      setLoading(false);
      return;
    }
    fetch(`/api/orders/${id}?token=${encodeURIComponent(token)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setOrder(d))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/50 text-gold">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="eyebrow mt-6">The rite is complete</p>
      <h1 className="mt-3 font-display text-5xl text-bone">Thank you</h1>
      <p className="mt-4 text-ash">
        Your order
        {orderId ? (
          <span className="text-bone"> #{orderId}</span>
        ) : null}{" "}
        is consecrated and heading your way. A confirmation will find your
        inbox.
      </p>

      {loading ? (
        <p className="mt-8 text-ash">Summoning your order…</p>
      ) : order ? (
        <div className="mt-8 rounded-2xl border border-line bg-surface/50 p-6 text-left">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <span className="text-sm text-ash">Order</span>
            <span className="font-display text-xl text-bone">#{order.id}</span>
          </div>
          <ul className="mt-4 space-y-3">
            {order.items.map((it, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md border border-line">
                  <ProductArt
                    seed={it.artSeed ?? it.name}
                    category={(it.category as never) ?? "Novelty"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="flex-1 text-sm text-bone">{it.name}</span>
                <span className="text-xs text-ash">×{it.quantity}</span>
                <span className="text-sm text-gold">{formatPrice(it.price * it.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-line pt-4 font-display text-xl text-bone">
            <span>Total</span>
            <span className="text-gold">{formatPrice(order.total)}</span>
          </div>
        </div>
      ) : null}

      <div className="mt-10 flex justify-center gap-3">
        <Link href="/shop" className="btn-gold">
          Keep Shopping
        </Link>
        <Link href="/" className="btn-ghost">
          Back Home
        </Link>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ProductArt } from "@/components/ProductArt";
import { formatPrice } from "@/lib/format";
import { calculateShipping, calculateOrderTotal } from "@/lib/orders";

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "Other"];

export default function CheckoutPage() {
  const { items, total, count, clear } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    note: "",
  });

  const shipping = calculateShipping(total);
  const grand = calculateOrderTotal(total);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const required = ["name", "email", "address", "city", "state", "zip"];
    for (const r of required) {
      if (!form[r as keyof typeof form].toString().trim()) {
        setError("Please complete every shipping field.");
        return;
      }
    }
    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.id,
            name: i.name,
            price: i.price,
            quantity: i.qty,
          })),
          customer: form,
        }),
      });
      if (!res.ok) throw new Error("order failed");
      const data = (await res.json()) as { id: number; total: number; accessToken: string };
      clear();
      router.push(`/checkout/success?order=${data.id}&token=${encodeURIComponent(data.accessToken)}`);
    } catch {
      setError("The ritual was interrupted. Please try again.");
      setBusy(false);
    }
  }

  if (count === 0 && !busy) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="font-occult text-4xl text-gold">Empty altar</p>
        <p className="mt-4 text-ash">There is nothing to check out yet.</p>
        <Link href="/shop" className="btn-gold mt-8">
          Find Your Relic
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="font-display text-5xl text-bone">Checkout</h1>
      <p className="mt-2 text-ash">A few details, then we consecrate and ship.</p>

      <form onSubmit={onSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label">Full name</label>
              <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Mara Vesper" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Email</label>
              <input type="email" className="input" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@midnight.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Address</label>
              <input className="input" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="13 Hollow Lane" />
            </div>
            <div>
              <label className="label">City</label>
              <input className="input" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Salem" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">State</label>
                <input className="input" value={form.state} onChange={(e) => set("state", e.target.value)} placeholder="MA" />
              </div>
              <div>
                <label className="label">ZIP</label>
                <input className="input" value={form.zip} onChange={(e) => set("zip", e.target.value)} placeholder="01970" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="label">Country</label>
              <select className="input" value={form.country} onChange={(e) => set("country", e.target.value)}>
                {COUNTRIES.map((c) => (
                  <option key={c} className="bg-ink" value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="label">Note to the hermit (optional)</label>
              <textarea className="input min-h-20 resize-y" value={form.note} onChange={(e) => set("note", e.target.value)} placeholder="Gift wrap, stronger hex, etc." />
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-surface/50 p-6">
          <h2 className="font-display text-2xl text-bone">Your Reliquary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-3">
                <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-md border border-line">
                  <ProductArt seed={i.artSeed} category={i.category as never} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-bone">{i.name}</p>
                  <p className="text-xs text-ash">Qty {i.qty}</p>
                </div>
                <span className="text-sm text-gold">{formatPrice(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-ash">
              <span>Subtotal</span>
              <span className="text-bone">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-ash">
              <span>Shipping</span>
              <span className="text-bone">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 font-display text-xl text-bone">
              <span>Total</span>
              <span className="text-gold">{formatPrice(grand)}</span>
            </div>
          </div>
          {error && <p className="mt-4 text-sm text-blood">{error}</p>}
          <button type="submit" disabled={busy} className="btn-gold mt-5 w-full">
            {busy ? "Consecrating…" : "Place Order"}
          </button>
          <p className="mt-3 text-center text-[11px] uppercase tracking-[0.16em] text-ash/70">
            Encrypted & blessed at checkout
          </p>
        </aside>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { StarRating } from "./StarRating";
import type { Review } from "@/lib/seed-data";

export function ReviewSection({
  productId,
  initialReviews,
}: {
  productId: number;
  initialReviews: Review[];
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [form, setForm] = useState({ author: "", title: "", body: "", rating: 5 });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.author.trim() || !form.title.trim() || !form.body.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productId }),
      });
      if (!res.ok) throw new Error();
      const newReview = (await res.json()) as Review;
      setReviews((prev) => [newReview, ...prev]);
      setForm({ author: "", title: "", body: "", rating: 5 });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mt-20">
      <div className="border-b border-line pb-6">
        <p className="eyebrow">The congregation speaks</p>
        <h2 className="mt-2 font-display text-3xl text-bone">Reviews</h2>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-ash">No reviews yet. Be the first to anoint this relic.</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-line bg-surface/40 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg text-bone">{r.title}</p>
                    <p className="text-sm text-ash">{r.author}</p>
                  </div>
                  <StarRating value={r.rating} size={14} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-bone/80">{r.body}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-ash/60">
                  <span>{r.createdAt}</span>
                  {r.verified && <span className="text-emerald">✓ Verified</span>}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="h-fit rounded-2xl border border-line bg-surface/50 p-6">
          <h3 className="font-display text-2xl text-bone">Leave your mark</h3>
          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <div>
              <label className="label">Your name</label>
              <input className="input" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} placeholder="Anonymous Hermit" />
            </div>
            <div>
              <label className="label">Rating</label>
              <div className="flex gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setForm((f) => ({ ...f, rating: n }))} className={`text-2xl transition-transform hover:scale-110 ${n <= form.rating ? "text-gold" : "text-ash/30"}`} aria-label={`${n} stars`}>★</button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Title</label>
              <input className="input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Worth every hex" />
            </div>
            <div>
              <label className="label">Your review</label>
              <textarea className="input min-h-24 resize-y" value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} placeholder="How did this relic find you?" />
            </div>
            {status === "error" && <p className="text-sm text-blood">Please fill in all fields.</p>}
            {status === "done" && <p className="text-sm text-emerald">Your review has been received. ✓</p>}
            <button type="submit" disabled={status === "sending"} className="btn-gold w-full">
              {status === "sending" ? "Consecrating…" : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

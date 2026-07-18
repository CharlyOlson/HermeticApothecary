"use client";
import { useState } from "react";
import { StarRating } from "./StarRating";
import type { ReviewData } from "@/lib/data";

export function ReviewSection({ productId, initialReviews }: { productId: number; initialReviews: ReviewData[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author: "", title: "", body: "", rating: 5 });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.author || !form.title || !form.body) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, ...form }),
      });
      if (!res.ok) throw new Error();
      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setShowForm(false);
      setStatus("idle");
      setForm({ author: "", title: "", body: "", rating: 5 });
    } catch {
      setStatus("error");
    }
  }

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <section className="mt-16 border-t border-line pt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Reviews</p>
          <h2 className="mt-2 font-display text-3xl text-bone">{reviews.length} reviews</h2>
          {reviews.length > 0 && <StarRating value={avg} size={18} showValue />}
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-ghost">Write a review</button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-line bg-surface/50 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label">Your name</label><input className="input" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} placeholder="Anonymous Hermit" /></div>
            <div><label className="label">Rating</label><select className="input" value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}>
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r} className="bg-ink">{r} stars</option>)}
            </select></div>
          </div>
          <div><label className="label">Title</label><input className="input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="A sacred object" /></div>
          <div><label className="label">Review</label><textarea className="input min-h-28 resize-y" value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} placeholder="Tell the congregation…" /></div>
          {status === "error" && <p className="text-sm text-blood">Something went wrong. Try again.</p>}
          <button type="submit" disabled={status === "sending"} className="btn-gold">{status === "sending" ? "Consecrating…" : "Submit Review"}</button>
        </form>
      )}

      {reviews.length > 0 ? (
        <ul className="mt-8 space-y-6">
          {reviews.map((r) => (
            <li key={r.id} className="border-b border-line pb-6">
              <div className="flex items-start justify-between gap-4">
                <div><StarRating value={r.rating} size={14} /><p className="mt-1 font-display text-xl text-bone">{r.title}</p></div>
                <p className="shrink-0 text-xs text-ash">{r.createdAt}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ash">{r.body}</p>
              <p className="mt-2 text-xs text-ash/70">— {r.author}{r.verified ? " · Verified Purchase" : ""}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-ash">No reviews yet. Be the first to consecrate this piece.</p>
      )}
    </section>
  );
}

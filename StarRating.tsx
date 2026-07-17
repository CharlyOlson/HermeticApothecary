"use client";

import Link from "next/link";
import { useState } from "react";
import { SUBMISSION_CATEGORIES, type SubmissionCategory } from "@/lib/seed-data";

export default function SubmitPage() {
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<SubmissionCategory>("Art Print");
  const [vision, setVision] = useState("");
  const [vibe, setVibe] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!vision.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vision: vibe.trim() ? `${vision.trim()}\n\nVibe: ${vibe.trim()}` : vision.trim(),
          category,
          author: author.trim() || null,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/50 text-gold">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="mt-6 font-display text-4xl text-bone">Your vision is received</h1>
        <p className="mt-4 text-ash">
          The studio reads every custom order. The ones that sing may be
          conjured into an official open-edition print — watch the altar.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/#open-prints" className="btn-gold">See the Altar</Link>
          <Link href="/gallery" className="btn-ghost">Enter the Gallery</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <p className="eyebrow">Submit a Custom Order</p>
      <h1 className="mt-3 font-display text-5xl text-bone">Commission a relic</h1>
      <p className="mt-4 text-ash">
        Describe the relic you wish existed. Our studio reads every submission
        — and the ones that sing may be conjured into an official open-edition
        print, credited to you.
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Your name (optional)</label>
            <input className="input" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Anonymous Hermit" />
          </div>
          <div>
            <label className="label">What kind of relic</label>
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value as SubmissionCategory)}>
              {SUBMISSION_CATEGORIES.map((c) => (
                <option key={c} className="bg-ink" value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="label">Your vision</label>
          <textarea className="input min-h-32 resize-y" value={vision} onChange={(e) => setVision(e.target.value)} placeholder="A moonstone ring that hums when you lie. For spotting snakes in the friend group." />
        </div>
        <div>
          <label className="label">Reference vibe (optional)</label>
          <input className="input" value={vibe} onChange={(e) => setVibe(e.target.value)} placeholder="cozy gothic, gilded, slightly unholy" />
        </div>
        {status === "error" && (
          <p className="text-sm text-blood">Please describe your vision before sending.</p>
        )}
        <button type="submit" disabled={status === "sending"} className="btn-gold w-full">
          {status === "sending" ? "Conjuring…" : "Send to the Studio"}
        </button>
      </form>
    </div>
  );
}

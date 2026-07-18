"use client";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const nextEmail = email.trim();

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nextEmail }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setSent(true);
      setEmail("");
    } catch {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) return <p className="text-sm text-gold">You&apos;re in the conclave. ✦</p>;
  return (
    <div className="space-y-2">
      <div className="min-h-5" aria-live="polite">
        {error ? <p className="text-sm text-blood">{error}</p> : null}
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <input type="email" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="input flex-1 text-sm" required />
        <button type="submit" className="btn-gold px-4 text-sm" disabled={submitting}>
          {submitting ? "Joining..." : "Join"}
        </button>
      </form>
    </div>
  );
}

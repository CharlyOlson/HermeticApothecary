"use client";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const nextEmail = email.trim();
    if (!nextEmail || submitting) return;

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
      setError("Could not subscribe right now.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) return <p className="text-sm text-gold">You&apos;re in the conclave. ✦</p>;
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input type="email" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="input flex-1 text-sm" required />
      <button type="submit" className="btn-gold px-4 text-sm" disabled={submitting}>
        {submitting ? "Joining..." : "Join"}
      </button>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </form>
  );
}

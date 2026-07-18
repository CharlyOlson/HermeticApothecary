"use client";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) { setSent(true); setEmail(""); }
  }
  if (sent) return <p className="text-sm text-gold">You&apos;re in the conclave. ✦</p>;
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input type="email" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="input flex-1 text-sm" required />
      <button type="submit" className="btn-gold px-4 text-sm">Join</button>
    </form>
  );
}

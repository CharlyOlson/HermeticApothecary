"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
    setEmail("");
  }

  if (done) {
    return (
      <p className="rounded-xl border border-gold/40 bg-gold/5 px-4 py-3 text-sm text-gold-soft">
        Welcome to the Conclave. Watch your inbox for omens.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@midnight.com"
        className="input flex-1"
        aria-label="Email address"
      />
      <button type="submit" className="btn-gold whitespace-nowrap">
        Join
      </button>
    </form>
  );
}

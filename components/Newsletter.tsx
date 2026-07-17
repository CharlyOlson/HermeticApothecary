"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    // Simulate API call — wire to email service as needed
    await new Promise((r) => setTimeout(r, 600));
    setStatus("done");
  }

  if (status === "done") {
    return <p className="text-sm text-gold-soft">You're in the conclave. ✓</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="email"
        className="input flex-1 text-sm"
        placeholder="you@midnight.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={status === "sending"} className="btn-gold shrink-0 px-4 text-xs">
        {status === "sending" ? "…" : "Join"}
      </button>
    </form>
  );
}

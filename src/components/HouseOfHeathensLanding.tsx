"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Newsletter } from "./Newsletter";

const HOUSE_AGE_KEY = "hermetic-house-of-heathens-age-verified";

type GateState = "checking" | "locked" | "verified";

const houseRules = [
  "Adults only: you confirm you are 18 years of age or older.",
  "After-dark language, provocative themes, and unruly devotional art may appear beyond this threshold.",
  "No shame, no minors, no borrowed cages — consent and self-possession are the house law.",
];

const offerings = [
  {
    title: "After-dark drops",
    body: "Limited runs with the same Hermetic Apothecary handwork, sharpened for the grown and ungovernable.",
  },
  {
    title: "Unholy apparel",
    body: "Tees, relics, and ritual objects with adult humor, body-positive mischief, and blasphemous bite.",
  },
  {
    title: "Private commissions",
    body: "Custom confessions and personal symbols translated into art for people old enough to own the story.",
  },
];

function setVerified(value: boolean) {
  try {
    if (value) {
      window.localStorage.setItem(HOUSE_AGE_KEY, "true");
    } else {
      window.localStorage.removeItem(HOUSE_AGE_KEY);
    }
  } catch {
    // Some browsers block storage. The in-memory gate state still updates.
  }
}

export function HouseOfHeathensLanding() {
  const [gateState, setGateState] = useState<GateState>("checking");

  useEffect(() => {
    try {
      setGateState(window.localStorage.getItem(HOUSE_AGE_KEY) === "true" ? "verified" : "locked");
    } catch {
      setGateState("locked");
    }
  }, []);

  function enterHouse() {
    setVerified(true);
    setGateState("verified");
  }

  function lockHouse() {
    setVerified(false);
    setGateState("locked");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (gateState === "checking") {
    return (
      <section className="relative grid min-h-[calc(100vh-4rem)] place-items-center overflow-hidden px-5 py-24 grain">
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 bg-gold/10 blur-3xl" />
        <div className="relative text-center">
          <p className="eyebrow">Checking the threshold</p>
          <h1 className="mt-4 font-display text-5xl text-bone sm:text-6xl">18+ verification</h1>
          <p className="mt-4 text-sm uppercase tracking-[0.24em] text-ash">House key loading...</p>
        </div>
      </section>
    );
  }

  if (gateState === "locked") {
    return (
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-5 py-16 grain sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(140,47,57,0.26),transparent_38%),radial-gradient(circle_at_10%_80%,rgba(201,162,75,0.16),transparent_32%),linear-gradient(180deg,rgba(10,9,12,0.2),#0a090c)]" />
        <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full border border-gold/20 bg-wine/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">Hermetic Apothecary presents · Adults only</p>
            <h1 className="mt-5 text-balance font-display text-5xl leading-[0.95] text-bone text-shadow-ritual sm:text-7xl lg:text-8xl">
              House of Heathens, Harlots and Heretics
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash">
              Same altar, later hour. This is the 18+ side room for the beautiful,
              the banished, and the fully grown — a sister brand for adult
              themes, darker jokes, and unapologetic self-possession.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="chip border-gold/40 text-gold-soft">18+ verification</span>
              <span className="chip border-blood/50 text-bone">After dark</span>
              <span className="chip border-violet/50 text-ash">Same brand bloodline</span>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-gold/30 bg-surface/80 p-6 shadow-2xl backdrop-blur md:p-8">
            <div className="absolute -right-4 -top-4 hidden rounded-full border border-gold/40 bg-void px-4 py-2 font-title text-[11px] uppercase tracking-[0.22em] text-gold md:block">
              Age Gate
            </div>
            <div className="rounded-[1.5rem] border border-line bg-ink/70 p-6">
              <p className="font-occult text-4xl text-gold">Enter if invited</p>
              <h2 className="mt-4 font-display text-3xl text-bone">Confirm the house rules</h2>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ash">
                {houseRules.map((rule) => (
                  <li key={rule} className="flex gap-3">
                    <span className="mt-1 text-gold">✦</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={enterHouse} className="btn-gold">
                  I am 18+ · Enter
                </button>
                <Link href="/" className="btn-outline-light">
                  Under 18 · Leave
                </Link>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-ash/70">
                By entering, you self-certify that you are legally old enough to
                view adult-themed content in your location.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden px-5 py-16 grain sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(94,31,42,0.38),transparent_42%),radial-gradient(circle_at_15%_30%,rgba(124,92,191,0.16),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">18+ verified · Hermetic Apothecary after dark</p>
            <h1 className="mt-5 text-balance font-display text-5xl leading-[0.95] text-bone text-shadow-ritual sm:text-7xl lg:text-8xl">
              House of Heathens, Harlots and Heretics
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash">
              The adult side-run of Hermetic Apothecary — same handcrafted
              ritual energy, a sharper tongue, and a candle lit for every person
              who was told they were too much.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-gold">
                Shop Hermetic Apothecary
              </Link>
              <Link href="/submit" className="btn-outline-light">
                Request an after-dark custom
              </Link>
            </div>
            <button
              type="button"
              onClick={lockHouse}
              className="mt-5 text-xs uppercase tracking-[0.22em] text-ash underline-offset-4 hover:text-bone hover:underline"
            >
              Lock this 18+ gate again
            </button>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/30 bg-ink shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(201,162,75,0.42),transparent_22%),radial-gradient(circle_at_68%_55%,rgba(140,47,57,0.62),transparent_30%),linear-gradient(145deg,#110e16,#0a090c_62%)]" />
            <div className="absolute inset-x-10 top-12 h-px bg-gold/40" />
            <div className="absolute inset-y-10 left-1/2 w-px bg-gold/30" />
            <div className="absolute left-1/2 top-1/2 grid h-52 w-52 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/40 bg-void/70 text-center backdrop-blur">
              <div>
                <p className="font-occult text-6xl text-gold">HHH</p>
                <p className="mt-2 font-title text-[10px] uppercase tracking-[0.28em] text-ash">House key accepted</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-void via-void/80 to-transparent p-7">
              <p className="font-title text-[11px] uppercase tracking-[0.24em] text-gold">Loading page live</p>
              <p className="mt-2 font-display text-3xl text-bone">The adults-only annex is awakening.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink/50 py-3">
        <div className="flex gap-10 overflow-hidden whitespace-nowrap">
          <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] gap-10 font-title text-[12px] uppercase tracking-[0.3em] text-ash/70">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              ["Heathens", "Harlots", "Heretics", "Adults Only", "No Shame", "House Rules", "After Dark", "Hail Yourself"].map(
                (word) => (
                  <span key={`${k}-${word}`} className="flex items-center gap-10">
                    {word}
                    <span className="text-gold">✦</span>
                  </span>
                ),
              ),
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">The adult side-run</p>
          <h2 className="mt-3 font-display text-4xl text-bone sm:text-5xl">Same brand. Different hour.</h2>
          <p className="mt-4 text-ash">
            House of Heathens, Harlots and Heretics keeps the Hermetic Apothecary
            texture — gothic, handmade, ritual-minded — and turns the volume up
            for mature collectors and adult customs.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {offerings.map((offering) => (
            <article key={offering.title} className="card p-6">
              <p className="font-title text-[11px] uppercase tracking-[0.24em] text-gold">House offering</p>
              <h3 className="mt-3 font-display text-3xl text-bone">{offering.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{offering.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-wine/60 via-surface to-ink p-8 md:p-12">
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div>
              <p className="eyebrow">House list</p>
              <h2 className="mt-3 font-display text-4xl text-bone sm:text-5xl">Get the first after-dark omen</h2>
              <p className="mt-4 max-w-xl text-ash">
                Join the existing conclave list for launch notices, private drops,
                and the first key when House pieces are ready to leave the cellar.
              </p>
            </div>
            <Newsletter />
          </div>
        </div>
      </section>
    </div>
  );
}

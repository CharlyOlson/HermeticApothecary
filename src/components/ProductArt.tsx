import type { Category } from "@/lib/seed-data";

const PALETTE: Record<string, string[]> = {
  "Art Prints": ["#c9a24b", "#ece5d8", "#8c2f39", "#7c5cbf"],
  "Resin & Epoxy": ["#3f8a76", "#7c5cbf", "#c9a24b", "#322b3d"],
  "Custom Tees": ["#8c2f39", "#c9a24b", "#ece5d8", "#110e16"],
  "Ouija Boards": ["#110e16", "#c9a24b", "#7c5cbf", "#ece5d8"],
  Jewelry: ["#c9a24b", "#e6cd8c", "#9b938a", "#ece5d8"],
  Novelty: ["#7c5cbf", "#3f8a76", "#c9a24b", "#8c2f39"],
};

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; }
  return h;
}

interface ProductArtProps {
  seed: string;
  category: string;
  className?: string;
  index?: number;
}

export function ProductArt({ seed, category, className, index = 0 }: ProductArtProps) {
  const h = hash(seed + index);
  const colors = PALETTE[category] ?? PALETTE["Art Prints"];
  const c1 = colors[h % colors.length];
  const c2 = colors[(h >>> 4) % colors.length];
  const c3 = colors[(h >>> 8) % colors.length];
  const x1 = (h >>> 2) % 100;
  const y1 = (h >>> 6) % 100;
  const x2 = (h >>> 10) % 100;
  const y2 = (h >>> 14) % 100;
  const r = 20 + (h % 40);

  return (
    <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <defs>
        <radialGradient id={`g${h}`} cx={`${x1}%`} cy={`${y1}%`} r="70%">
          <stop offset="0%" stopColor={c1} stopOpacity="0.8" />
          <stop offset="60%" stopColor={c2} stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0a090c" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id={`g2${h}`} cx={`${x2}%`} cy={`${y2}%`} r="50%">
          <stop offset="0%" stopColor={c3} stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0a090c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill="#0a090c" />
      <rect width="400" height="500" fill={`url(#g${h})`} />
      <rect width="400" height="500" fill={`url(#g2${h})`} />
      <circle cx={x1 * 4} cy={y1 * 5} r={r} fill={c1} opacity="0.15" />
      <circle cx={x2 * 4} cy={y2 * 5} r={r * 0.6} fill={c2} opacity="0.12" />
      <line x1={x1 * 4} y1="0" x2={x2 * 4} y2="500" stroke={c1} strokeWidth="1" opacity="0.08" />
      <line x1="0" y1={y1 * 5} x2="400" y2={y2 * 5} stroke={c2} strokeWidth="0.5" opacity="0.06" />
    </svg>
  );
}

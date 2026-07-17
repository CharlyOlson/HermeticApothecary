import type { Category } from "@/lib/seed-data";

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeRng(seed: number) {
  let s = seed || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const PALETTES = [
  { bg: ["#160f1f", "#2c1838"], glow: "#c9a24b", ink: "#efe7d6", accent: "#7c5cbf" },
  { bg: ["#1c0f13", "#3c1622"], glow: "#e6cd8c", ink: "#f3ebe0", accent: "#8c2f39" },
  { bg: ["#0f151a", "#16262e"], glow: "#7fd6c4", ink: "#e9efe9", accent: "#3f8a76" },
  { bg: ["#191015", "#2e1a22"], glow: "#e0a0a0", ink: "#f2e7e2", accent: "#c9a24b" },
  { bg: ["#120f1c", "#241a34"], glow: "#bda4f5", ink: "#ece5f6", accent: "#7c5cbf" },
  { bg: ["#101418", "#1d2630"], glow: "#cdb27a", ink: "#e8e4da", accent: "#5e6f8c" },
];

function Stars({ count, rng, color }: { count: number; rng: () => number; color: string }) {
  const stars = Array.from({ length: count }, () => ({
    x: rng() * 400,
    y: rng() * 500,
    r: 0.5 + rng() * 1.8,
    o: 0.25 + rng() * 0.6,
  }));
  return (
    <g>
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={color} opacity={s.o} />
      ))}
    </g>
  );
}

function Emblem({ category, rng, glow, ink, accent }: { category: Category; rng: () => number; glow: string; ink: string; accent: string }) {
  const eye = (
    <g stroke={ink} strokeWidth={3} fill="none">
      <path d="M120 250 Q200 195 280 250 Q200 305 120 250 Z" fill={accent} fillOpacity={0.18} />
      <circle cx={200} cy={250} r={34} fill={glow} fillOpacity={0.85} />
      <circle cx={200} cy={250} r={16} fill="#0a090c" />
      <circle cx={208} cy={242} r={5} fill={ink} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line key={i} x1={200 + Math.cos(a) * 56} y1={250 + Math.sin(a) * 56} x2={200 + Math.cos(a) * 72} y2={250 + Math.sin(a) * 72} stroke={glow} strokeWidth={2} />
        );
      })}
    </g>
  );

  const moon = (
    <g>
      <circle cx={200} cy={250} r={78} fill={glow} fillOpacity={0.92} />
      <circle cx={232} cy={232} r={70} fill="#0a090c" />
      <circle cx={168} cy={272} r={5} fill={ink} />
      <circle cx={150} cy={220} r={3} fill={ink} />
      <circle cx={196} cy={300} r={4} fill={ink} />
      <path d="M200 150 L205 175 L230 175 L210 190 L218 215 L200 200 L182 215 L190 190 L170 175 L195 175 Z" fill={accent} opacity={0.85} />
    </g>
  );

  const star = (
    <g>
      {Array.from({ length: 5 }).map((_, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        const a2 = a + Math.PI / 5;
        return <path key={i} d={`M200 250 L${200 + Math.cos(a) * 100} ${250 + Math.sin(a) * 100} L${200 + Math.cos(a2) * 42} ${250 + Math.sin(a2) * 42} Z`} fill="none" stroke={glow} strokeWidth={3} />;
      })}
      <circle cx={200} cy={250} r={10} fill={glow} />
    </g>
  );

  const sun = (
    <g>
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const long = i % 2 === 0;
        return <line key={i} x1={200 + Math.cos(a) * 60} y1={250 + Math.sin(a) * 60} x2={200 + Math.cos(a) * (long ? 96 : 82)} y2={250 + Math.sin(a) * (long ? 96 : 82)} stroke={glow} strokeWidth={long ? 4 : 2} />;
      })}
      <circle cx={200} cy={250} r={56} fill={accent} fillOpacity={0.55} />
      <circle cx={200} cy={250} r={40} fill={glow} />
      <circle cx={200} cy={250} r={18} fill="#0a090c" />
    </g>
  );

  const hand = (
    <g stroke={ink} strokeWidth={3} fill={accent} fillOpacity={0.25}>
      <path d="M165 330 L165 250 Q165 230 178 230 Q190 230 190 250 L190 210 Q190 192 202 192 Q214 192 214 210 L214 235 Q214 215 226 215 Q238 215 238 235 L238 245 Q238 228 250 228 Q262 228 262 245 L262 270 Q262 250 274 252 Q286 254 286 272 L286 330 Q220 345 165 330 Z" />
      <line x1={190} y1={235} x2={214} y2={235} stroke={glow} strokeWidth={2} />
      <circle cx={200} cy={300} r={14} fill="none" stroke={glow} strokeWidth={3} />
    </g>
  );

  const planchette = (
    <g>
      <path d="M200 150 C150 150 150 230 200 300 C250 230 250 150 200 150 Z" fill={glow} fillOpacity={0.9} />
      <circle cx={200} cy={250} r={20} fill="#0a090c" />
      <circle cx={200} cy={250} r={9} fill={accent} />
      <text x={200} y={200} textAnchor="middle" fontFamily="Cinzel, serif" fontSize={14} fill="#0a090c" letterSpacing={2}>YES</text>
      <text x={150} y={260} textAnchor="middle" fontFamily="Cinzel, serif" fontSize={12} fill="#0a090c">N</text>
      <text x={250} y={260} textAnchor="middle" fontFamily="Cinzel, serif" fontSize={12} fill="#0a090c">O</text>
    </g>
  );

  const ring = (
    <g>
      <circle cx={200} cy={250} r={70} fill="none" stroke={glow} strokeWidth={14} />
      <circle cx={200} cy={180} r={22} fill={accent} stroke={glow} strokeWidth={4} />
      <path d="M200 198 L200 250" stroke={glow} strokeWidth={6} />
      <circle cx={194} cy={174} r={6} fill="#0a090c" opacity={0.5} />
    </g>
  );

  const candle = (
    <g>
      <rect x={175} y={210} width={50} height={120} rx={6} fill={ink} fillOpacity={0.9} />
      <rect x={175} y={210} width={14} height={120} rx={6} fill="#fff" fillOpacity={0.12} />
      <line x1={200} y1={210} x2={200} y2={188} stroke={glow} strokeWidth={3} />
      <path d="M200 188 C188 170 212 166 200 145 C214 162 220 178 200 188 Z" fill={accent} />
      <ellipse cx={200} cy={188} rx={20} ry={14} fill={glow} opacity={0.4} />
    </g>
  );

  const sigil = (
    <g fill="none" stroke={glow} strokeWidth={2.5}>
      <circle cx={200} cy={250} r={84} stroke={accent} strokeWidth={2} opacity={0.7} />
      {Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2 + rng();
        const b = (i / 7 + rng()) * Math.PI * 2;
        return <line key={i} x1={200 + Math.cos(a) * 84} y1={250 + Math.sin(a) * 84} x2={200 + Math.cos(b) * 84} y2={250 + Math.sin(b) * 84} />;
      })}
      <circle cx={200} cy={250} r={6} fill={glow} />
    </g>
  );

  const serpent = (
    <g fill="none" stroke={glow} strokeWidth={9} strokeLinecap="round">
      <path d="M110 330 C150 250 110 200 180 170 C250 140 210 250 270 230 C320 215 300 300 330 280" />
      <circle cx={330} cy={280} r={12} fill={glow} />
      <circle cx={333} cy={277} r={3} fill="#0a090c" />
      <path d="M324 270 L342 262 M324 290 L342 298" stroke="#0a090c" strokeWidth={2} />
    </g>
  );

  const tee = (
    <g fill={ink} fillOpacity={0.92}>
      <path d="M150 180 L120 200 L138 235 L160 222 L160 330 L240 330 L240 222 L262 235 L280 200 L250 180 Q225 205 200 205 Q175 205 150 180 Z" />
      <g transform="translate(200 255) scale(0.55)">
        {rng() < 0.5 ? eye : star}
      </g>
    </g>
  );

  const resin = (
    <g>
      <ellipse cx={200} cy={270} rx={120} ry={90} fill={glow} fillOpacity={0.92} />
      <ellipse cx={200} cy={270} rx={120} ry={90} fill="url(#sheen)" />
      <g transform="translate(0 30) scale(0.8)">{rng() < 0.5 ? serpent : sigil}</g>
      <ellipse cx={160} cy={230} rx={40} ry={18} fill="#fff" fillOpacity={0.25} />
    </g>
  );

  switch (category) {
    case "Art Prints": {
      const p = rng();
      return p < 0.2 ? eye : p < 0.4 ? moon : p < 0.6 ? star : p < 0.8 ? sun : hand;
    }
    case "Resin & Epoxy": return resin;
    case "Custom Tees": return tee;
    case "Ouija Boards": return rng() < 0.5 ? planchette : sigil;
    case "Jewelry": return rng() < 0.5 ? ring : star;
    case "Novelty": {
      const p = rng();
      return p < 0.4 ? candle : p < 0.7 ? sigil : moon;
    }
    default: return eye;
  }
}

export function ProductArt({
  seed,
  category,
  index = 0,
  className = "",
}: {
  seed: string;
  category: Category;
  index?: number;
  className?: string;
}) {
  const rng = makeRng(hash(`${seed}:${index}`));
  const palette = PALETTES[Math.floor(rng() * PALETTES.length)];
  const rotation = Math.floor(rng() * 24) - 12;
  const starCount = 30 + Math.floor(rng() * 30);
  const gid = `g-${hash(seed + index) % 100000}`;

  return (
    <svg viewBox="0 0 400 500" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${category} artwork`}>
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.bg[0]} />
          <stop offset="100%" stopColor={palette.bg[1]} />
        </linearGradient>
        <radialGradient id={`${gid}-glow`} cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor={palette.glow} stopOpacity={0.35} />
          <stop offset="100%" stopColor={palette.glow} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.45} />
          <stop offset="45%" stopColor="#ffffff" stopOpacity={0.05} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${gid}-bg)`} />
      <rect width="400" height="500" fill={`url(#${gid}-glow)`} />
      <Stars count={starCount} rng={rng} color={palette.ink} />
      <g transform={`rotate(${rotation} 200 250)`}>
        <Emblem category={category} rng={rng} glow={palette.glow} ink={palette.ink} accent={palette.accent} />
      </g>
      <rect x="14" y="14" width="372" height="472" fill="none" stroke={palette.glow} strokeOpacity={0.35} strokeWidth={1.5} />
      <rect x="22" y="22" width="356" height="456" fill="none" stroke={palette.ink} strokeOpacity={0.12} strokeWidth={1} />
    </svg>
  );
}

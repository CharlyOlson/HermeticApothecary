export const CATEGORIES = [
  "Art Prints",
  "Resin & Epoxy",
  "Custom Tees",
  "Ouija Boards",
  "Jewelry",
  "Novelty",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const SUBMISSION_CATEGORIES = [
  "Art Print",
  "Resin & Epoxy",
  "Custom Tee",
  "Ouija Board",
  "Jewelry",
  "Novelty",
  "Other",
] as const;

export type SubmissionCategory = (typeof SUBMISSION_CATEGORIES)[number];

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  details: string;
  materials: string;
  tags: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
  artSeed: string;
  createdAt: string;
}

export interface Piece {
  id: number;
  slug: string;
  name: string;
  invocation: string;
  lore: string;
  blessing: string;
}

export interface CustomOrder {
  id: number;
  author: string | null;
  vision: string;
  category: string;
  status: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: number;
  author: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// The Five Pieces
// ---------------------------------------------------------------------------

export const PIECES: Piece[] = [
  {
    id: 1,
    slug: "name-it-and-claim-it",
    name: "Name It & Claim It",
    invocation: "The word becomes the thing. The thing becomes the altar.",
    lore: "Born from a sermon that felt like a threat. Six words rearranged into something that belongs to the speaker, not the preached-at.",
    blessing: "May what you name be yours alone.",
  },
  {
    id: 2,
    slug: "love-the-sinner",
    name: "Love the Sinner",
    invocation: "If this is love, what was the other thing?",
    lore: "A phrase worn smooth from overuse, a stone thrown with a smile. Reclaimed here as a mirror, held up to those who said it.",
    blessing: "May you love yourself first, loudly.",
  },
  {
    id: 3,
    slug: "we-forgive-you-but",
    name: "We Forgive You But",
    invocation: "Forgiveness given with conditions is a leash.",
    lore: "The ellipsis is the cruelest punctuation. This piece finishes the sentence differently every time you look at it.",
    blessing: "May your debts be yours to clear, not carry.",
  },
  {
    id: 4,
    slug: "holier-than-thou",
    name: "Holier Than Thou",
    invocation: "Yes. And I didn't need to earn it.",
    lore: "The accusation turned into a crown. Worn not in pride but in reclamation — of the sacred self that was declared unworthy.",
    blessing: "May the holy in you outshine every verdict.",
  },
  {
    id: 5,
    slug: "sunday-marquee",
    name: "Sunday Marquee",
    invocation: "The signs are still up. We just read them differently now.",
    lore: "A church marquee as oracle, as threat, as comfort, as joke. Depends on the day, depends on who you were when you walked past it.",
    blessing: "May this be a day you choose yourself.",
  },
];

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const PRODUCTS: Product[] = [
  // The Five Pieces (Art Prints — slugs must match PIECES above)
  {
    id: 1,
    slug: "name-it-and-claim-it",
    name: "Name It & Claim It",
    category: "Art Prints",
    price: 48,
    description: "A declaration in gold leaf and shadow. The word becomes the altar.",
    details: "Archival pigment print on 300gsm cotton rag. Signed and numbered edition of 50.",
    materials: "Archival pigment ink, 300gsm cotton rag paper",
    tags: ["piece", "gold"],
    featured: true,
    rating: 4.9,
    reviewCount: 34,
    artSeed: "name-it-and-claim-it",
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: 2,
    slug: "love-the-sinner",
    name: "Love the Sinner",
    category: "Art Prints",
    price: 48,
    description: "A phrase reclaimed from the pulpit. Now it belongs to you.",
    details: "Archival pigment print on 300gsm cotton rag. Signed and numbered edition of 50.",
    materials: "Archival pigment ink, 300gsm cotton rag paper",
    tags: ["piece"],
    featured: true,
    rating: 4.8,
    reviewCount: 28,
    artSeed: "love-the-sinner",
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    id: 3,
    slug: "we-forgive-you-but",
    name: "We Forgive You But",
    category: "Art Prints",
    price: 48,
    description: "The ellipsis is the cruelest punctuation. Finish it yourself.",
    details: "Archival pigment print on 300gsm cotton rag. Signed and numbered edition of 50.",
    materials: "Archival pigment ink, 300gsm cotton rag paper",
    tags: ["piece"],
    featured: true,
    rating: 4.7,
    reviewCount: 22,
    artSeed: "we-forgive-you-but",
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: 4,
    slug: "holier-than-thou",
    name: "Holier Than Thou",
    category: "Art Prints",
    price: 48,
    description: "The accusation becomes the crown. Wear it.",
    details: "Archival pigment print on 300gsm cotton rag. Signed and numbered edition of 50.",
    materials: "Archival pigment ink, 300gsm cotton rag paper",
    tags: ["piece"],
    featured: true,
    rating: 4.9,
    reviewCount: 41,
    artSeed: "holier-than-thou",
    createdAt: "2024-02-10T00:00:00Z",
  },
  {
    id: 5,
    slug: "sunday-marquee",
    name: "Sunday Marquee",
    category: "Art Prints",
    price: 48,
    description: "Church signs as oracles. Read differently now.",
    details: "Archival pigment print on 300gsm cotton rag. Signed and numbered edition of 50.",
    materials: "Archival pigment ink, 300gsm cotton rag paper",
    tags: ["piece"],
    featured: true,
    rating: 4.6,
    reviewCount: 19,
    artSeed: "sunday-marquee",
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: 6,
    slug: "confession-wall",
    name: "Confession Wall",
    category: "Art Prints",
    price: 38,
    description: "What you whispered into the dark, made visible.",
    details: "Giclée print on heavyweight matte paper. Open edition.",
    materials: "Pigment ink, heavyweight matte paper",
    tags: [],
    featured: false,
    rating: 4.5,
    reviewCount: 12,
    artSeed: "confession-wall",
    createdAt: "2024-03-01T00:00:00Z",
  },
  {
    id: 7,
    slug: "reclaim-your-truth",
    name: "Reclaim Your Truth",
    category: "Art Prints",
    price: 38,
    description: "For the version of yourself they tried to edit out.",
    details: "Giclée print on heavyweight matte paper. Open edition.",
    materials: "Pigment ink, heavyweight matte paper",
    tags: [],
    featured: false,
    rating: 4.7,
    reviewCount: 15,
    artSeed: "reclaim-your-truth",
    createdAt: "2024-03-10T00:00:00Z",
  },
  // Resin & Epoxy
  {
    id: 8,
    slug: "still-storm-sphere",
    name: "Still Storm Sphere",
    category: "Resin & Epoxy",
    price: 85,
    description: "A tempest sealed in glass. The calm is the lie.",
    details: "Hand-cast resin sphere, approx 80mm diameter. Each piece is unique.",
    materials: "UV resin, gold leaf, dried botanicals",
    tags: [],
    featured: true,
    rating: 4.9,
    reviewCount: 23,
    artSeed: "still-storm-sphere",
    createdAt: "2024-01-25T00:00:00Z",
  },
  {
    id: 9,
    slug: "serpent-eye-panel",
    name: "Serpent Eye Panel",
    category: "Resin & Epoxy",
    price: 120,
    description: "The eye that never closes. Poured flat, framed in shadow.",
    details: "Resin panel, approx 20×25cm. Hangs or stands.",
    materials: "Epoxy resin, alcohol ink, metallic powders",
    tags: [],
    featured: false,
    rating: 4.8,
    reviewCount: 17,
    artSeed: "serpent-eye-panel",
    createdAt: "2024-02-20T00:00:00Z",
  },
  {
    id: 10,
    slug: "ash-and-gold-dish",
    name: "Ash & Gold Dish",
    category: "Resin & Epoxy",
    price: 55,
    description: "Small altar, large intention. For keys, rings, or sacred objects.",
    details: "Cast resin trinket dish, approx 12cm across.",
    materials: "Resin, gold pigment, obsidian powder",
    tags: [],
    featured: false,
    rating: 4.7,
    reviewCount: 31,
    artSeed: "ash-and-gold-dish",
    createdAt: "2024-03-05T00:00:00Z",
  },
  {
    id: 11,
    slug: "moonstone-oracle-block",
    name: "Moonstone Oracle Block",
    category: "Resin & Epoxy",
    price: 95,
    description: "Cast in silver and silence. An anchor for the uncertain.",
    details: "Freestanding resin block, approx 8×12cm.",
    materials: "Clear resin, moonstone chips, silver mica",
    tags: [],
    featured: false,
    rating: 4.6,
    reviewCount: 14,
    artSeed: "moonstone-oracle-block",
    createdAt: "2024-03-15T00:00:00Z",
  },
  // Custom Tees
  {
    id: 12,
    slug: "pray-later-hex-now-tee",
    name: "Pray Later. Hex Now.",
    category: "Custom Tees",
    price: 34,
    description: "The manifesto, screen-printed on heavyweight cotton.",
    details: "100% ring-spun cotton, 220gsm. Screen printed by hand.",
    materials: "Heavyweight cotton, water-based inks",
    tags: [],
    featured: true,
    rating: 4.9,
    reviewCount: 67,
    artSeed: "pray-later-hex-now-tee",
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: 13,
    slug: "beautifully-damned-tee",
    name: "Beautifully Damned",
    category: "Custom Tees",
    price: 34,
    description: "For everyone the congregation whispered about.",
    details: "100% ring-spun cotton, 220gsm. Printed front left chest.",
    materials: "Heavyweight cotton, water-based inks",
    tags: [],
    featured: false,
    rating: 4.7,
    reviewCount: 44,
    artSeed: "beautifully-damned-tee",
    createdAt: "2024-02-05T00:00:00Z",
  },
  {
    id: 14,
    slug: "hail-yourself-tee",
    name: "Hail Yourself",
    category: "Custom Tees",
    price: 34,
    description: "A benediction for the person you're becoming.",
    details: "100% ring-spun cotton, 220gsm.",
    materials: "Heavyweight cotton, water-based inks",
    tags: [],
    featured: false,
    rating: 4.8,
    reviewCount: 52,
    artSeed: "hail-yourself-tee",
    createdAt: "2024-02-25T00:00:00Z",
  },
  {
    id: 15,
    slug: "light-hex-repeat-tee",
    name: "Light · Hex · Repeat",
    category: "Custom Tees",
    price: 34,
    description: "The only ritual that matters. On a tee.",
    details: "100% ring-spun cotton, 220gsm.",
    materials: "Heavyweight cotton, water-based inks",
    tags: [],
    featured: false,
    rating: 4.6,
    reviewCount: 38,
    artSeed: "light-hex-repeat-tee",
    createdAt: "2024-03-20T00:00:00Z",
  },
  // Ouija Boards
  {
    id: 16,
    slug: "the-quiet-board",
    name: "The Quiet Board",
    category: "Ouija Boards",
    price: 145,
    description: "For conversations with what doesn't answer. Hand-etched oak.",
    details: "Hand-etched oak board, 30×45cm. With planchette.",
    materials: "Oak wood, pyrography, wax finish",
    tags: [],
    featured: true,
    rating: 4.9,
    reviewCount: 29,
    artSeed: "the-quiet-board",
    createdAt: "2024-01-30T00:00:00Z",
  },
  {
    id: 17,
    slug: "brass-and-shadow-planchette",
    name: "Brass & Shadow Planchette",
    category: "Ouija Boards",
    price: 58,
    description: "Standalone. Works with any board. Speaks for itself.",
    details: "Cast brass planchette with felt feet. 12cm.",
    materials: "Solid brass, felt",
    tags: [],
    featured: false,
    rating: 4.8,
    reviewCount: 42,
    artSeed: "brass-and-shadow-planchette",
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: 18,
    slug: "sigil-board-small",
    name: "Sigil Board (Small)",
    category: "Ouija Boards",
    price: 95,
    description: "Travel size. The questions don't shrink.",
    details: "Pyrography on birch ply, 20×30cm. With planchette.",
    materials: "Birch plywood, pyrography",
    tags: [],
    featured: false,
    rating: 4.6,
    reviewCount: 18,
    artSeed: "sigil-board-small",
    createdAt: "2024-03-10T00:00:00Z",
  },
  // Jewelry
  {
    id: 19,
    slug: "all-seeing-ring",
    name: "All-Seeing Ring",
    category: "Jewelry",
    price: 68,
    description: "The eye doesn't close. Neither should you.",
    details: "Sterling silver, adjustable band. Fits most sizes.",
    materials: "925 sterling silver",
    tags: [],
    featured: true,
    rating: 4.9,
    reviewCount: 73,
    artSeed: "all-seeing-ring",
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: 20,
    slug: "serpent-ear-cuff",
    name: "Serpent Ear Cuff",
    category: "Jewelry",
    price: 45,
    description: "It whispers things. You get to decide what.",
    details: "Sterling silver, fits most ear sizes without piercing.",
    materials: "925 sterling silver",
    tags: [],
    featured: false,
    rating: 4.8,
    reviewCount: 58,
    artSeed: "serpent-ear-cuff",
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    id: 21,
    slug: "crescent-pendant",
    name: "Crescent Pendant",
    category: "Jewelry",
    price: 52,
    description: "For the in-between. The waxing and the waning self.",
    details: "Sterling silver, 18-inch chain included.",
    materials: "925 sterling silver, 18\" chain",
    tags: [],
    featured: false,
    rating: 4.7,
    reviewCount: 44,
    artSeed: "crescent-pendant",
    createdAt: "2024-02-10T00:00:00Z",
  },
  {
    id: 22,
    slug: "sigil-stacking-rings",
    name: "Sigil Stacking Rings (Set of 3)",
    category: "Jewelry",
    price: 78,
    description: "Three spells, one stack. Mix with whatever you already wear.",
    details: "Sterling silver, sizes 6–9 available.",
    materials: "925 sterling silver",
    tags: [],
    featured: false,
    rating: 4.6,
    reviewCount: 27,
    artSeed: "sigil-stacking-rings",
    createdAt: "2024-03-01T00:00:00Z",
  },
  // Novelty
  {
    id: 23,
    slug: "ritual-candle-set",
    name: "Ritual Candle Set",
    category: "Novelty",
    price: 32,
    description: "Three candles for three moods. Burn what you need.",
    details: "Set of 3 soy wax candles, 8oz each. Approx 45hr burn per candle.",
    materials: "Soy wax, cotton wicks, essential oils",
    tags: [],
    featured: true,
    rating: 4.8,
    reviewCount: 61,
    artSeed: "ritual-candle-set",
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: 24,
    slug: "hex-tarot-spread-cloth",
    name: "Hex Tarot Spread Cloth",
    category: "Novelty",
    price: 28,
    description: "Velvet. Gold screen print. The cards know where to land.",
    details: "60×60cm velvet cloth, screen printed in gold.",
    materials: "Velvet, gold metallic ink",
    tags: [],
    featured: false,
    rating: 4.7,
    reviewCount: 39,
    artSeed: "hex-tarot-spread-cloth",
    createdAt: "2024-02-05T00:00:00Z",
  },
  {
    id: 25,
    slug: "sacred-incense-bundle",
    name: "Sacred Incense Bundle",
    category: "Novelty",
    price: 18,
    description: "For clearing rooms, intentions, and memories.",
    details: "Bundle of 10 hand-rolled incense sticks. Mixed botanicals.",
    materials: "Dried botanicals, bamboo sticks, natural binders",
    tags: [],
    featured: false,
    rating: 4.5,
    reviewCount: 24,
    artSeed: "sacred-incense-bundle",
    createdAt: "2024-03-05T00:00:00Z",
  },
  {
    id: 26,
    slug: "rune-journal",
    name: "Rune-Embossed Journal",
    category: "Novelty",
    price: 22,
    description: "For what you're not ready to say yet. Gold runes on matte black.",
    details: "A5 dotted journal, 200 pages, lay-flat binding.",
    materials: "Faux leather cover, acid-free paper",
    tags: [],
    featured: false,
    rating: 4.6,
    reviewCount: 33,
    artSeed: "rune-journal",
    createdAt: "2024-03-15T00:00:00Z",
  },
];

// ---------------------------------------------------------------------------
// Seed submissions
// ---------------------------------------------------------------------------

export const SUBMISSIONS: Omit<CustomOrder, "id" | "createdAt">[] = [
  {
    author: "Margaux",
    vision:
      "A ring that tarnishes when someone near you is lying. For spotting the performative devout.",
    category: "Jewelry",
    status: "open",
  },
  {
    author: null,
    vision:
      "An art print of the empty pew. The one nobody sat in because they were afraid of it.",
    category: "Art Print",
    status: "open",
  },
  {
    author: "D.S.",
    vision:
      "Something to hold during the holidays. Like an amulet but for surviving dinner.",
    category: "Resin & Epoxy",
    status: "open",
  },
  {
    author: "Celestine",
    vision:
      "A tee that just says ENOUGH in the typeface they use for hymn titles.",
    category: "Custom Tee",
    status: "open",
  },
  {
    author: null,
    vision:
      "A candle that smells like the library of the church your grandmother went to. Good parts only.",
    category: "Novelty",
    status: "open",
  },
  {
    author: "Reece",
    vision:
      "A board with my grandmother's name on it. She was the one who actually believed — and was kind about it.",
    category: "Ouija Board",
    status: "open",
  },
];

// ---------------------------------------------------------------------------
// Review generator (used by seed script)
// ---------------------------------------------------------------------------

const REVIEW_POOL: Omit<Review, "id" | "productId" | "createdAt">[] = [
  {
    author: "Margaux T.",
    title: "Exactly what I needed",
    body: "This piece speaks to something I couldn't name before. Hung it immediately. Haven't taken it down.",
    rating: 5,
    verified: true,
  },
  {
    author: "Sam R.",
    title: "Stunning craftsmanship",
    body: "The quality is exceptional. Got more compliments on this than anything else in my space.",
    rating: 5,
    verified: true,
  },
  {
    author: "J.K.",
    title: "Worth every penny",
    body: "I was hesitant about the price but this is genuinely heirloom quality. Will treasure it.",
    rating: 5,
    verified: false,
  },
  {
    author: "Devon",
    title: "Perfect gift",
    body: "Got this for a friend who has been deconstructing. They cried. Good tears.",
    rating: 5,
    verified: true,
  },
  {
    author: "Celestine M.",
    title: "The real thing",
    body: "Not just aesthetic. There's intention behind this that you can feel.",
    rating: 5,
    verified: true,
  },
  {
    author: "Anonymous",
    title: "Good quality, slow ship",
    body: "Love the product but took longer than expected. Worth the wait though.",
    rating: 4,
    verified: false,
  },
  {
    author: "Reece",
    title: "Exactly as described",
    body: "Matches the photos exactly. Packaging was beautiful — felt like a ritual just opening it.",
    rating: 5,
    verified: true,
  },
];

export function generateReviews(
  product: Product,
): Omit<Review, "id" | "productId">[] {
  const count = Math.min(product.reviewCount, REVIEW_POOL.length);
  return REVIEW_POOL.slice(0, count).map((r, i) => ({
    ...r,
    createdAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
  }));
}

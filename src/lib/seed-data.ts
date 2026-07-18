export const CATEGORIES = ["Art Prints", "Resin & Epoxy", "Custom Tees", "Ouija Boards", "Jewelry", "Novelty"] as const;
export type Category = (typeof CATEGORIES)[number];

export const SUBMISSION_CATEGORIES = ["Art Print", "Resin Piece", "Custom Tee", "Ouija Board", "Jewelry", "Other"] as const;
export type SubmissionCategory = (typeof SUBMISSION_CATEGORIES)[number];

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  details: string[];
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

export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  createdAt: string;
}

export interface Submission {
  author?: string;
  vision: string;
  category: SubmissionCategory;
}

const PIECES: Piece[] = [
  { id: 1, slug: "name-it-claim-it", name: "Name It & Claim It", invocation: "Say the name. Break the silence.", lore: "A relic for those who were told to forgive without being heard. This piece reclaims the ritual of naming harm as the first act of healing.", blessing: "I name what was done to me. I am not required to forgive on demand." },
  { id: 2, slug: "love-the-sinner", name: "Love the Sinner", invocation: "Hate the sin. Wear the hex.", lore: "Born from every Sunday school lesson that weaponized love. The phrase turned into armor — worn, not wielded.", blessing: "I am the sinner and the saint. I will not be bifurcated for your comfort." },
  { id: 3, slug: "we-forgive-you-but", name: "We Forgive You But", invocation: "But — the holiest of qualifiers.", lore: "Forgiveness with conditions. Absolution with asterisks. This piece holds the weight of every conditional pardon.", blessing: "My forgiveness is mine to give or withhold. It does not expire on your timeline." },
  { id: 4, slug: "holier-than-thou", name: "Holier Than Thou", invocation: "Yes. Holier. Thou.", lore: "Reclaim the accusation. Wear the crown you were denied. Holiness was never theirs to gatekeep.", blessing: "I am sacred. Not despite my flaws — because of my wholeness." },
  { id: 5, slug: "sunday-marquee", name: "Sunday Marquee", invocation: "The sermon ends. The marquee stays.", lore: "Inspired by church signs repurposed for reclamation. Every corny message has a shadow version for the ones who stayed in the parking lot.", blessing: "I left the building. I kept the mystery. I made something stranger and truer." },
];

export function getPieces(): Piece[] { return PIECES; }

export const PRODUCTS: Product[] = [
  { id: 1, slug: "name-it-claim-it", name: "Name It & Claim It", category: "Art Prints", price: 38, description: "A reclamation print for those who were silenced. Gold foil, archival ink, unapologetically loud.", details: ["12×16 archival giclée print", "Gold foil accent on key phrase", "Signed & numbered edition of 250", "Ships in protective tube"], materials: "Archival cotton rag, gold foil, archival inks", tags: ["reclamation", "healing", "gold-foil"], featured: true, rating: 4.9, reviewCount: 47, artSeed: "name-it-claim-it", createdAt: "2024-01-15T00:00:00Z" },
  { id: 2, slug: "love-the-sinner", name: "Love the Sinner", category: "Art Prints", price: 38, description: "The phrase turned into armor. Wear it, hang it, weaponize the sentiment that was once used against you.", details: ["12×16 archival giclée print", "Deep blood-red and bone palette", "Signed edition of 200", "Ships flat with backing board"], materials: "Archival cotton rag, archival inks", tags: ["reclamation", "sinner", "religious-trauma"], featured: true, rating: 4.8, reviewCount: 32, artSeed: "love-the-sinner", createdAt: "2024-01-20T00:00:00Z" },
  { id: 3, slug: "we-forgive-you-but", name: "We Forgive You But", category: "Art Prints", price: 42, description: "Absolution with asterisks. The holiest of qualifiers, preserved in archival gold.", details: ["16×20 archival giclée print", "Gold and violet ink", "Limited edition of 150", "Arrives framing-ready"], materials: "Archival cotton rag, metallic inks", tags: ["forgiveness", "reclamation", "limited"], featured: true, rating: 4.7, reviewCount: 28, artSeed: "we-forgive-you-but", createdAt: "2024-02-01T00:00:00Z" },
  { id: 4, slug: "holier-than-thou", name: "Holier Than Thou", category: "Art Prints", price: 38, description: "Reclaim the accusation. Wear the crown you were denied.", details: ["12×16 archival giclée print", "Crown motif in gold leaf", "Signed edition of 200", "Ships flat"], materials: "Archival cotton rag, gold leaf detail", tags: ["holier", "crown", "reclamation"], featured: true, rating: 4.9, reviewCount: 51, artSeed: "holier-than-thou", createdAt: "2024-02-10T00:00:00Z" },
  { id: 5, slug: "sunday-marquee", name: "Sunday Marquee", category: "Art Prints", price: 34, description: "The sermon ends. The marquee stays. A typographic relic for parking lot mystics.", details: ["11×14 archival giclée print", "Vintage marquee typography", "Open edition", "Ships flat with backing board"], materials: "Archival cotton rag, archival inks", tags: ["marquee", "typography", "sunday"], featured: false, rating: 4.6, reviewCount: 19, artSeed: "sunday-marquee", createdAt: "2024-02-15T00:00:00Z" },
  { id: 6, slug: "still-storm-resin", name: "Still Storm", category: "Resin & Epoxy", price: 128, description: "A tempest sealed in glass. Hand-poured resin with gold and midnight pigments.", details: ["8×10 inch resin panel", "Hand-poured with gold leaf inclusions", "One of a kind — no two alike", "Arrives in velvet pouch"], materials: "Archival resin, gold leaf, mineral pigments", tags: ["resin", "one-of-a-kind", "storm"], featured: true, rating: 4.8, reviewCount: 14, artSeed: "still-storm-resin", createdAt: "2024-03-01T00:00:00Z" },
  { id: 7, slug: "the-hermit-tee", name: "The Hermit Tee", category: "Custom Tees", price: 28, description: "'Pray Later. Hex Now.' — The unofficial uniform of the beautifully damned.", details: ["100% ring-spun cotton", "Unisex sizing XS–3XL", "Screen printed with water-based inks", "Washes without fading"], materials: "Ring-spun cotton, water-based screen print", tags: ["tee", "hex", "uniform"], featured: false, rating: 4.7, reviewCount: 63, artSeed: "the-hermit-tee", createdAt: "2024-03-10T00:00:00Z" },
  { id: 8, slug: "reclaim-board", name: "Reclaim Board", category: "Ouija Boards", price: 85, description: "A communication board rewritten for reclamation. Birch wood, hand-lettered, ritually tested.", details: ["12×18 inch birch wood board", "Hand-lettered with archival stain", "Includes planchette", "Each board is sealed and numbered"], materials: "Baltic birch, archival wood stain, brass planchette", tags: ["ouija", "birch", "reclamation"], featured: false, rating: 4.9, reviewCount: 22, artSeed: "reclaim-board", createdAt: "2024-03-20T00:00:00Z" },
  { id: 9, slug: "hex-ring", name: "Hex Ring", category: "Jewelry", price: 55, description: "Sterling silver band, blackened and blessed. Wear your reclamation on your hand.", details: ["Sterling silver .925", "Oxidized blackened finish", "Sizes 5–12", "Arrives in ritual box"], materials: "Sterling silver, blackened oxidation", tags: ["ring", "silver", "hex"], featured: false, rating: 4.6, reviewCount: 38, artSeed: "hex-ring", createdAt: "2024-04-01T00:00:00Z" },
  { id: 10, slug: "holy-water-candle", name: "Holy Water Candle", category: "Novelty", price: 24, description: "Smells like cedar, smoke, and the end of something. A daily ritual in 40 hours of burn time.", details: ["8 oz soy-coconut wax blend", "Cedar, vetiver, and smoke fragrance", "40+ hour burn time", "Reusable vessel"], materials: "Soy-coconut wax blend, cotton wick, archival label", tags: ["candle", "cedar", "ritual"], featured: false, rating: 4.8, reviewCount: 29, artSeed: "holy-water-candle", createdAt: "2024-04-10T00:00:00Z" },
  { id: 11, slug: "glass-vigil", name: "Glass Vigil", category: "Resin & Epoxy", price: 95, description: "A candle-vigil preserved in resin. The light that never goes out.", details: ["6 inch resin cast", "LED insert included", "Amber and gold tones", "Velvet base"], materials: "Clear resin, mineral pigments, LED insert", tags: ["resin", "vigil", "light"], featured: false, rating: 4.5, reviewCount: 11, artSeed: "glass-vigil", createdAt: "2024-04-15T00:00:00Z" },
  { id: 12, slug: "confession-tee", name: "Confession Tee", category: "Custom Tees", price: 28, description: "What would you write in the box? This one says it for you.", details: ["100% ring-spun cotton", "Unisex sizing XS–3XL", "Front and back print", "Water-based inks"], materials: "Ring-spun cotton, water-based screen print", tags: ["tee", "confession", "statement"], featured: false, rating: 4.4, reviewCount: 17, artSeed: "confession-tee", createdAt: "2024-04-20T00:00:00Z" },
];

const REVIEW_AUTHORS = ["Persephone M.", "Silas K.", "Raven D.", "Mara T.", "Oberon S.", "Luna B.", "Cass N.", "Felix A.", "Wren H.", "Isolde P.", "Sage F.", "Rowan C."];
const REVIEW_TITLES = ["Absolutely stunning", "Worth every penny", "A sacred object", "My altar needed this", "Beyond expectations", "Genuinely beautiful", "Arrived perfectly", "Better in person", "Ships fast, looks incredible", "The hex is real"];

export function generateReviews(product: Product): Review[] {
  const count = Math.min(product.reviewCount, 8);
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    productId: product.id,
    author: REVIEW_AUTHORS[i % REVIEW_AUTHORS.length],
    rating: i === 0 ? 5 : i === count - 1 ? Math.max(3, Math.round(product.rating - 1)) : Math.round(product.rating),
    title: REVIEW_TITLES[i % REVIEW_TITLES.length],
    body: `I ordered the ${product.name} after seeing it on the altar feed and it's exactly what I needed. The quality is exceptional and it arrived perfectly packaged. This piece now has a permanent home in my space.`,
    verified: i % 3 !== 0,
    createdAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  }));
}

export const SUBMISSIONS: Submission[] = [
  { author: "Corvus B.", vision: "A candle that burns black and smells like burnt churches. For clearing space.", category: "Resin Piece" },
  { author: "Mara V.", vision: "A ring with the words 'Not Your Miracle' stamped inside the band.", category: "Jewelry" },
  { vision: "An ouija board where the planchette is a tiny crown. For reclaiming authority.", category: "Ouija Board" },
  { author: "Felix N.", vision: "A tee that says 'I Survived the Youth Group' in block letters.", category: "Custom Tee" },
  { author: "Sage K.", vision: "A resin piece with a rosary sealed inside, broken. For the ones who loved it before it was weaponized.", category: "Resin Piece" },
  { vision: "Art print that says 'God Is Watching And She's Rooting For You' in gold foil.", category: "Art Print" },
];

import { PRODUCTS, PIECES } from "./seed-data";
import type { Product, Piece, CustomOrder, Review } from "./seed-data";

async function getDB() {
  const { db } = await import("@/db");
  return db;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToProduct(r: any): Product {
  return {
    ...r,
    price: Number(r.price),
    rating: Number(r.rating),
    createdAt: r.createdAt?.toISOString() ?? "",
    details: Array.isArray(r.details) ? r.details : typeof r.details === "string" && r.details ? r.details.split("\n").filter(Boolean) : [],
    tags: Array.isArray(r.tags) ? r.tags : [],
  };
}

type SortOrder = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

function sortProducts(arr: Product[], sort: SortOrder): Product[] {
  const copy = [...arr];
  switch (sort) {
    case "price-asc": return copy.sort((a, b) => a.price - b.price);
    case "price-desc": return copy.sort((a, b) => b.price - a.price);
    case "newest": return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "rating": return copy.sort((a, b) => b.rating - a.rating);
    default: return copy.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

export async function getProducts(options?: { category?: string; sort?: SortOrder }): Promise<Product[]> {
  const category = options?.category && options.category !== "All" ? options.category : undefined;
  const sort = options?.sort ?? "featured";
  try {
    const { products } = await import("@/db/schema");
    const { eq } = await import("drizzle-orm");
    const db = await getDB();
    const rows = category
      ? await db.select().from(products).where(eq(products.category, category))
      : await db.select().from(products);
    return sortProducts(rows.map(rowToProduct), sort);
  } catch {
    const arr = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
    return sortProducts(arr, sort);
  }
}

export async function getFeaturedProducts(limit?: number): Promise<Product[]> {
  try {
    const { products } = await import("@/db/schema");
    const { eq } = await import("drizzle-orm");
    const db = await getDB();
    const rows = await db.select().from(products).where(eq(products.featured, true));
    const result = rows.map(rowToProduct);
    return limit ? result.slice(0, limit) : result;
  } catch {
    const result = PRODUCTS.filter((p) => p.featured);
    return limit ? result.slice(0, limit) : result;
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  return getProductBySlug(slug);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { products } = await import("@/db/schema");
    const { eq } = await import("drizzle-orm");
    const db = await getDB();
    const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    if (!rows.length) return null;
    return rowToProduct(rows[0]);
  } catch {
    return PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  try {
    const { products } = await import("@/db/schema");
    const { and, eq, ne } = await import("drizzle-orm");
    const db = await getDB();
    const rows = await db
      .select()
      .from(products)
      .where(and(eq(products.category, product.category), ne(products.id, product.id)))
      .limit(limit);
    return rows.map(rowToProduct);
  } catch {
    return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
  }
}

export async function getReviews(productId: number): Promise<Review[]> {
  try {
    const { reviews } = await import("@/db/schema");
    const { eq, desc } = await import("drizzle-orm");
    const db = await getDB();
    const rows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, productId))
      .orderBy(desc(reviews.createdAt));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rows.map((r: any) => ({
      id: String(r.id),
      productId: r.productId,
      author: r.author,
      rating: r.rating,
      title: r.title,
      body: r.body,
      verified: r.verified,
      createdAt: r.createdAt?.toISOString?.().slice(0, 10) ?? "",
    }));
  } catch {
    return [];
  }
}

export function getPieces(): Piece[] {
  return PIECES;
}

export async function getCustomOrders(): Promise<CustomOrder[]> {
  try {
    const { customOrders } = await import("@/db/schema");
    const db = await getDB();
    const rows = await db.select().from(customOrders);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rows.map((r: any) => ({
      ...r,
      createdAt: r.createdAt?.toISOString() ?? "",
    }));
  } catch {
    return [];
  }
}

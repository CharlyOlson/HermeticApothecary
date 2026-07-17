import { PRODUCTS, PIECES } from "./seed-data";
import type { Product, Piece, CustomOrder } from "./seed-data";

async function getDB() {
  const { db } = await import("@/db");
  return db;
}

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const { products } = await import("@/db/schema");
    const { eq } = await import("drizzle-orm");
    const db = await getDB();
    const rows = category
      ? await db.select().from(products).where(eq(products.category, category))
      : await db.select().from(products);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rows.map((r: any) => ({
      ...r,
      price: Number(r.price),
      rating: Number(r.rating),
      createdAt: r.createdAt?.toISOString() ?? "",
    }));
  } catch {
    return category
      ? PRODUCTS.filter((p) => p.category === category)
      : PRODUCTS;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { products } = await import("@/db/schema");
    const { eq } = await import("drizzle-orm");
    const db = await getDB();
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.featured, true));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rows.map((r: any) => ({
      ...r,
      price: Number(r.price),
      rating: Number(r.rating),
      createdAt: r.createdAt?.toISOString() ?? "",
    }));
  } catch {
    return PRODUCTS.filter((p) => p.featured);
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const { products } = await import("@/db/schema");
    const { eq } = await import("drizzle-orm");
    const db = await getDB();
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);
    if (!rows.length) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = rows[0] as any;
    return {
      ...r,
      price: Number(r.price),
      rating: Number(r.rating),
      createdAt: r.createdAt?.toISOString() ?? "",
    };
  } catch {
    return PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getPieces(): Promise<Piece[]> {
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

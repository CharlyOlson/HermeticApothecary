import { db } from "@/db";
import { products, reviews, customOrders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { PRODUCTS, SUBMISSIONS, generateReviews, getPieces as getStaticPieces, type Product, type Piece } from "@/lib/seed-data";
export { getPieces } from "@/lib/seed-data";

function dbProduct(row: typeof products.$inferSelect): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category as Product["category"],
    price: Number(row.price),
    description: row.description,
    details: (row.details ?? []) as string[],
    materials: row.materials,
    tags: (row.tags ?? []) as string[],
    featured: row.featured,
    rating: Number(row.rating),
    reviewCount: row.reviewCount,
    artSeed: row.artSeed,
    createdAt: row.createdAt?.toISOString() ?? new Date().toISOString(),
  };
}

export async function getProducts(opts: { category?: string; sort?: string } = {}): Promise<Product[]> {
  try {
    const rows = await db.select().from(products);
    let result = rows.map(dbProduct);
    if (opts.category && opts.category !== "All") {
      result = result.filter((p) => p.category === opts.category);
    }
    if (opts.sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (opts.sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (opts.sort === "newest") result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (opts.sort === "rating") result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return result;
  } catch {
    return PRODUCTS;
  }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  try {
    const rows = await db.select().from(products);
    return rows.map(dbProduct).filter((p) => p.featured).slice(0, limit);
  } catch {
    return PRODUCTS.filter((p) => p.featured).slice(0, limit);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const [row] = await db.select().from(products).where(eq(products.slug, slug));
    return row ? dbProduct(row) : null;
  } catch {
    return PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  try {
    const rows = await db.select().from(products);
    return rows
      .map(dbProduct)
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, limit);
  } catch {
    return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, limit);
  }
}

export interface ReviewData {
  id: string;
  productId: number;
  author: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  createdAt: string;
}

export async function getReviews(productId: number): Promise<ReviewData[]> {
  try {
    const rows = await db.select().from(reviews).where(eq(reviews.productId, productId)).orderBy(desc(reviews.createdAt));
    return rows.map((r) => ({
      id: String(r.id),
      productId: r.productId,
      author: r.author,
      rating: r.rating,
      title: r.title,
      body: r.body,
      verified: r.verified,
      createdAt: r.createdAt?.toISOString().slice(0, 10) ?? "",
    }));
  } catch {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return [];
    return generateReviews(product).map((r) => ({
      id: String(r.id),
      productId: r.productId,
      author: r.author,
      rating: r.rating,
      title: r.title,
      body: r.body,
      verified: r.verified,
      createdAt: r.createdAt,
    }));
  }
}

export interface CustomOrderData {
  id: number;
  author: string | null;
  vision: string;
  category: string;
  status: string;
  createdAt: string;
}

export async function getCustomOrders(): Promise<CustomOrderData[]> {
  try {
    const rows = await db.select().from(customOrders).orderBy(desc(customOrders.createdAt));
    return rows.map((r) => ({
      id: r.id,
      author: r.author,
      vision: r.vision,
      category: r.category,
      status: r.status,
      createdAt: r.createdAt?.toISOString().slice(0, 10) ?? "",
    }));
  } catch {
    return SUBMISSIONS.map((submission, index) => ({
      id: index + 1,
      author: submission.author ?? null,
      vision: submission.vision,
      category: submission.category,
      status: "open",
      createdAt: "",
    }));
  }
}

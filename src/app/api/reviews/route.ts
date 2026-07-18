import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const productId = Number(body.productId);
    const author = String(body.author ?? "").trim().slice(0, 80);
    const title = String(body.title ?? "").trim().slice(0, 120);
    const reviewBody = String(body.body ?? "").trim().slice(0, 2000);
    const rating = Math.min(5, Math.max(1, Math.round(Number(body.rating) || 5)));

    if (!productId || !author || !title || !reviewBody) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const [row] = await db
      .insert(reviews)
      .values({ productId, author, rating, title, body: reviewBody, verified: false })
      .returning();

    const [aggregate] = await db
      .select({
        reviewCount: sql<number>`count(*)::int`,
        rating: sql<string>`coalesce(round(avg(${reviews.rating})::numeric, 2), 0)::text`,
      })
      .from(reviews)
      .where(eq(reviews.productId, productId));

    await db
      .update(products)
      .set({
        reviewCount: aggregate.reviewCount,
        rating: aggregate.rating,
      })
      .where(eq(products.id, productId));

    return Response.json(
      {
        id: String(row.id),
        productId: row.productId,
        author: row.author,
        rating: row.rating,
        title: row.title,
        body: row.body,
        verified: row.verified,
        createdAt: row.createdAt?.toISOString?.().slice(0, 10) ?? new Date().toISOString().slice(0, 10),
      },
      { status: 201 },
    );
  } catch {
    return Response.json({ error: "Could not save review" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const productId = Number(url.searchParams.get("productId"));
  if (!productId) return Response.json({ error: "productId required" }, { status: 400 });
  const rows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, productId))
    .orderBy(desc(reviews.createdAt));
  return Response.json(rows);
}

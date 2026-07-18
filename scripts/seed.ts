import { db } from "../src/db";
import { products, reviews, orders, orderItems, customOrders } from "../src/db/schema";
import { PRODUCTS, generateReviews, SUBMISSIONS } from "../src/lib/seed-data";
import { sql } from "drizzle-orm";

async function resetSequence(table: string, column: string) {
  await db.execute(
    sql.raw(
      `SELECT setval(pg_get_serial_sequence('${table}', '${column}'), 1, false)`,
    ),
  );
}

async function main() {
  console.log("Clearing existing tables…");
  await db.delete(orderItems);
  await db.delete(orders);
  await db.delete(reviews);
  await db.delete(products);
  await db.delete(customOrders);

  await resetSequence("products", "id");
  await resetSequence("reviews", "id");
  await resetSequence("orders", "id");
  await resetSequence("custom_orders", "id");

  console.log(`Seeding ${PRODUCTS.length} products…`);
  const idBySlug = new Map<string, number>();
  for (const p of PRODUCTS) {
    const [row] = await db
      .insert(products)
      .values({
        slug: p.slug,
        name: p.name,
        category: p.category,
        price: String(p.price),
        description: p.description,
        details: p.details,
        materials: p.materials,
        tags: p.tags,
        featured: p.featured,
        rating: String(p.rating),
        reviewCount: p.reviewCount,
        artSeed: p.artSeed,
        createdAt: new Date(p.createdAt),
      })
      .returning({ id: products.id });
    idBySlug.set(p.slug, row.id);
  }

  console.log("Seeding reviews…");
  for (const p of PRODUCTS) {
    const productId = idBySlug.get(p.slug)!;
    const revs = generateReviews(p);
    for (const r of revs) {
      await db.insert(reviews).values({
        productId,
        author: r.author,
        rating: r.rating,
        title: r.title,
        body: r.body,
        verified: r.verified,
        createdAt: new Date(r.createdAt),
      });
    }
  }

  await db.execute(sql`
    UPDATE products p
    SET review_count = (
      SELECT COUNT(*) FROM reviews r WHERE r.product_id = p.id
    ),
    rating = COALESCE((
      SELECT ROUND(AVG(r.rating)::numeric, 2) FROM reviews r WHERE r.product_id = p.id
    ), 0)
  `);

  console.log("Seeding custom orders (Open Prints)…");
  for (const s of SUBMISSIONS) {
    await db.insert(customOrders).values({
      author: s.author ?? null,
      vision: s.vision,
      category: s.category,
      status: "open",
    });
  }

  console.log("Seed complete ✓");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

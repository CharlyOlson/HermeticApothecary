import { db } from "@/db";
import { customOrders } from "@/db/schema";
import { desc } from "drizzle-orm";
import { SUBMISSION_CATEGORIES } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db.select().from(customOrders).orderBy(desc(customOrders.createdAt));
    return Response.json(rows);
  } catch {
    return Response.json({ error: "Could not load custom orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const vision = String(body.vision ?? "").trim().slice(0, 600);
    const category = String(body.category ?? "Other");
    const author = body.author ? String(body.author).trim().slice(0, 80) : null;

    if (!vision) {
      return Response.json({ error: "Describe your vision" }, { status: 400 });
    }
    if (!SUBMISSION_CATEGORIES.includes(category as never)) {
      return Response.json({ error: "Invalid category" }, { status: 400 });
    }

    const [row] = await db
      .insert(customOrders)
      .values({ vision, category, author, status: "open" })
      .returning();

    return Response.json(
      {
        id: row.id,
        author: row.author ?? undefined,
        vision: row.vision,
        category: row.category,
        status: row.status,
        createdAt: row.createdAt?.toISOString?.().slice(0, 10),
      },
      { status: 201 },
    );
  } catch {
    return Response.json({ error: "Could not save your order" }, { status: 500 });
  }
}

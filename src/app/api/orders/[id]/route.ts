import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const orderId = Number(id);
  const token = new URL(_req.url).searchParams.get("token")?.trim();
  if (!orderId) return Response.json({ error: "Invalid order" }, { status: 400 });
  if (!token) return Response.json({ error: "Not found" }, { status: 404 });

  const [order] = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, orderId), eq(orders.accessToken, token)));
  if (!order) return Response.json({ error: "Not found" }, { status: 404 });

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));

  return Response.json({
    id: order.id,
    email: order.email,
    name: order.name,
    total: Number(order.total),
    status: order.status,
    createdAt: order.createdAt?.toISOString?.() ?? new Date().toISOString(),
    items: items.map((it) => ({
      name: it.name,
      price: Number(it.price),
      quantity: it.quantity,
      category: it.name.includes("Tee")
        ? "Custom Tees"
        : it.name.includes("Board") || it.name.includes("Planchette")
          ? "Ouija Boards"
          : undefined,
      artSeed: it.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    })),
  });
}

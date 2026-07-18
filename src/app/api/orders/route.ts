import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = Array.isArray(body.items) ? body.items : [];
    const customer = body.customer ?? {};

    const name = String(customer.name ?? "").trim();
    const email = String(customer.email ?? "").trim();
    const address = String(customer.address ?? "").trim();
    const city = String(customer.city ?? "").trim();
    const state = String(customer.state ?? "").trim();
    const zip = String(customer.zip ?? "").trim();
    const country = String(customer.country ?? "United States");

    if (!name || !email || !address || !city || !state || !zip) {
      return Response.json({ error: "Missing customer fields" }, { status: 400 });
    }
    if (items.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    const validated = items
      .map((it: { productId?: number; name?: string; price?: number; quantity?: number }) => ({
        productId: it.productId ? Number(it.productId) : null,
        name: String(it.name ?? "Untitled Relic").slice(0, 160),
        price: Math.max(0, Number(it.price) || 0),
        quantity: Math.max(1, Math.round(Number(it.quantity) || 1)),
      }))
      .filter((it: { price: number }) => it.price >= 0);

    const total = validated.reduce((s: number, it: { price: number; quantity: number }) => s + it.price * it.quantity, 0);

    const [order] = await db
      .insert(orders)
      .values({
        email,
        name,
        address,
        city,
        state,
        zip,
        country,
        total: total.toFixed(2),
        status: "paid",
      })
      .returning();

    await db.insert(orderItems).values(
      validated.map((it: { productId: number | null; name: string; price: number; quantity: number }) => ({
        orderId: order.id,
        productId: it.productId,
        name: it.name,
        price: it.price.toFixed(2),
        quantity: it.quantity,
      })),
    );

    return Response.json({ id: order.id, total: Number(order.total) }, { status: 201 });
  } catch {
    return Response.json({ error: "Could not place order" }, { status: 500 });
  }
}

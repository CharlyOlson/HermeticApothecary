import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { PRODUCTS } from "@/lib/seed-data";
import { calculateOrderTotal, roundCurrency } from "@/lib/orders";
import { inArray } from "drizzle-orm";

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

    const requestedItems = items
      .map((it: { productId?: number; quantity?: number }) => ({
        productId: Number(it.productId),
        quantity: Math.max(1, Math.round(Number(it.quantity) || 1)),
      }))
      .filter((it: { productId: number }) => Number.isFinite(it.productId) && it.productId > 0);

    if (requestedItems.length !== items.length) {
      return Response.json({ error: "Invalid cart items" }, { status: 400 });
    }

    const productIds = [...new Set(requestedItems.map((it: { productId: number }) => it.productId))];
    const catalogRows = await db
      .select({ id: products.id, name: products.name, price: products.price })
      .from(products)
      .where(inArray(products.id, productIds));

    const catalog = new Map<number, { name: string; price: number }>();
    for (const row of catalogRows) {
      catalog.set(row.id, { name: row.name, price: Number(row.price) });
    }
    for (const product of PRODUCTS) {
      if (!catalog.has(product.id)) {
        catalog.set(product.id, { name: product.name, price: product.price });
      }
    }

    const validated = requestedItems.map((it: { productId: number; quantity: number }) => {
      const product = catalog.get(it.productId);
      if (!product) return null;
      return {
        productId: it.productId,
        name: product.name.slice(0, 160),
        price: roundCurrency(product.price),
        quantity: it.quantity,
      };
    });

    if (validated.some((it) => it === null)) {
      return Response.json({ error: "Unknown product in cart" }, { status: 400 });
    }

    const finalizedItems = validated.filter((it): it is NonNullable<typeof it> => it !== null);

    const subtotal = finalizedItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const total = calculateOrderTotal(roundCurrency(subtotal));
    const accessToken = crypto.randomUUID();

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
        accessToken,
        total: total.toFixed(2),
        status: "pending",
      })
      .returning();

    await db.insert(orderItems).values(
      finalizedItems.map((it) => ({
        orderId: order.id,
        productId: it.productId,
        name: it.name,
        price: it.price.toFixed(2),
        quantity: it.quantity,
      })),
    );

    return Response.json({ id: order.id, total: Number(order.total), accessToken }, { status: 201 });
  } catch {
    return Response.json({ error: "Could not place order" }, { status: 500 });
  }
}

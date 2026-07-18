import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    await db.insert(newsletterSubscribers).values({ email }).onConflictDoNothing();

    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Could not subscribe right now" }, { status: 500 });
  }
}

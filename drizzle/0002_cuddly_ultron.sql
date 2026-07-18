ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "access_token" text;--> statement-breakpoint
UPDATE "orders"
SET "access_token" = md5(random()::text || clock_timestamp()::text || "id"::text)
WHERE "access_token" IS NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "access_token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_access_token_unique" UNIQUE("access_token");
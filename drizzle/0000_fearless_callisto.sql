CREATE TABLE "custom_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" text,
	"vision" text NOT NULL,
	"category" text NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer,
	"name" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip" text NOT NULL,
	"country" text DEFAULT 'United States' NOT NULL,
	"total" numeric(10, 2) NOT NULL,
	"status" text DEFAULT 'paid' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"details" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"materials" text DEFAULT '' NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"rating" numeric(3, 2) DEFAULT '0' NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"art_seed" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"author" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now()
);

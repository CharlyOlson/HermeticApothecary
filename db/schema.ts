import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull().default(""),
  details: text("details").array().notNull().default([]),
  materials: text("materials").notNull().default(""),
  tags: text("tags").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("0"),
  reviewCount: integer("review_count").notNull().default(0),
  artSeed: text("art_seed").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  author: text("author").notNull(),
  rating: integer("rating").notNull().default(5),
  title: text("title").notNull(),
  body: text("body").notNull(),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  country: text("country").notNull().default("United States"),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("paid"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  productId: integer("product_id"),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull().default(1),
});

export const customOrders = pgTable("custom_orders", {
  id: serial("id").primaryKey(),
  author: text("author"),
  vision: text("vision").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull().default("open"),
  createdAt: timestamp("created_at").defaultNow(),
});

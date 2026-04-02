/** @format */
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const users = pgTable("users", {
	id: text("id").primaryKey(),
	email: text("email").unique().notNull(),
	name: text("name").notNull(),
	imageURL: text("image_url").notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

const products = pgTable("products", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	imageURL: text("image_url").notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});

const comments = pgTable("comments", {
	id: uuid("id").defaultRandom().primaryKey(),
	content: text("content").notNull(),
	userId: text("user_id")
		.notNull()
		.references(
			() => {
				return users.id;
			},
			{ onDelete: "cascade" },
		),
	productId: uuid("product_id")
		.notNull()
		.references(
			() => {
				return products.id;
			},
			{
				onDelete: "cascade",
			},
		),
	createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// a user create many comments and products
const usersRelations = relations(users, ({ many }) => ({
	products: many(products),
	comments: many(comments),
}));

// a product have many comments but only belongs to one user
const productsRelations = relations(products, ({ one, many }) => ({
	comments: many(comments),
	user: one(users, {
		fields: [products.userId],
		references: [users.id],
	}),
}));

// a comment belongs to one user and one product
const commentsRelations = relations(comments, ({ one }) => ({
	products: one(products, {
		fields: [comments.productId],
		references: [products.id],
	}),
	user: one(users, {
		fields: [comments.userId],
		references: [users.id],
	}),
}));

// type interface for queries
// Drizzle inferred types are for DB queries only
// Use explicit names like DbComment, DbProduct, DbUser
type User = typeof users.$inferSelect;
type NewUser = typeof users.$inferInsert;

type Comment = typeof comments.$inferSelect;
type NewComment = typeof comments.$inferInsert;

type Product = typeof products.$inferSelect;
type NewProduct = typeof products.$inferInsert;

export {
	users,
	products,
	comments,
	usersRelations,
	productsRelations,
	commentsRelations,
};

export type { User, NewUser, Comment, NewComment, Product, NewProduct };

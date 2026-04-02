"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRelations = exports.productsRelations = exports.usersRelations = exports.comments = exports.products = exports.users = void 0;
/** @format */
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    email: (0, pg_core_1.text)("email").unique().notNull(),
    name: (0, pg_core_1.text)("name").notNull(),
    imageURL: (0, pg_core_1.text)("image_url").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "date" }).defaultNow().notNull(),
});
exports.users = users;
const products = (0, pg_core_1.pgTable)("products", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    imageURL: (0, pg_core_1.text)("image_url").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "date" }).defaultNow().notNull(),
    userId: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
});
exports.products = products;
const comments = (0, pg_core_1.pgTable)("comments", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    content: (0, pg_core_1.text)("content").notNull(),
    userId: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(() => {
        return users.id;
    }, { onDelete: "cascade" }),
    productId: (0, pg_core_1.uuid)("product_id")
        .notNull()
        .references(() => {
        return products.id;
    }, {
        onDelete: "cascade",
    }),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "date" }).defaultNow().notNull(),
});
exports.comments = comments;
// a user create many comments and products
const usersRelations = (0, drizzle_orm_1.relations)(users, ({ many }) => ({
    products: many(products),
    comments: many(comments),
}));
exports.usersRelations = usersRelations;
// a product have many comments but only belongs to one user
const productsRelations = (0, drizzle_orm_1.relations)(products, ({ one, many }) => ({
    comments: many(comments),
    user: one(users, {
        fields: [products.userId],
        references: [users.id],
    }),
}));
exports.productsRelations = productsRelations;
// a comment belongs to one user and one product
const commentsRelations = (0, drizzle_orm_1.relations)(comments, ({ one }) => ({
    products: one(products, {
        fields: [comments.productId],
        references: [products.id],
    }),
    user: one(users, {
        fields: [comments.userId],
        references: [users.id],
    }),
}));
exports.commentsRelations = commentsRelations;

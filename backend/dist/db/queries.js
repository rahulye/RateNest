"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentById = exports.deleteComment = exports.createComment = exports.deleteProduct = exports.updateProduct = exports.getProductByUserId = exports.getAllProducts = exports.getByProductId = exports.createProduct = exports.getUserById = exports.upsertUser = exports.updateUser = exports.createUser = void 0;
const index_1 = require("./index");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("./schema");
//                              ------USER-----
//create
const createUser = async (data) => {
    const [user] = await index_1.db.insert(schema_1.users).values(data).returning();
    return user;
};
exports.createUser = createUser;
//get user
const getUserById = async (id) => {
    return await index_1.db.query.users.findFirst({ where: (0, drizzle_orm_1.eq)(schema_1.users.id, id) });
};
exports.getUserById = getUserById;
//update user data
const updateUser = async (id, data) => {
    const [user] = await index_1.db
        .update(schema_1.users)
        .set(data)
        .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
        .returning();
    return user;
};
exports.updateUser = updateUser;
//create or update user
const upsertUser = async (data) => {
    const existingUser = await getUserById(data.id);
    if (existingUser)
        return updateUser(data.id, data);
    return createUser(data);
};
exports.upsertUser = upsertUser;
//                              ------PRODUCTS------
//create
const createProduct = async (data) => {
    const [product] = await index_1.db.insert(schema_1.products).values(data).returning();
    return product;
};
exports.createProduct = createProduct;
//get a product
const getByProductId = async (id) => {
    return await index_1.db.query.products.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.products.id, id),
        with: {
            user: true,
            comments: {
                with: { user: true },
                orderBy: (comments, { desc }) => [desc(comments.createdAt)],
            },
        },
    });
};
exports.getByProductId = getByProductId;
//get all product
const getAllProducts = async () => {
    return await index_1.db.query.products.findMany({
        with: { user: true, comments: true },
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
};
exports.getAllProducts = getAllProducts;
//get a product by used id
const getProductByUserId = async (userId) => {
    return await index_1.db.query.products.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.products.userId, userId),
        with: { user: true },
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
};
exports.getProductByUserId = getProductByUserId;
//update
const updateProduct = async (id, data) => {
    const existingProduct = await getByProductId(id);
    if (!existingProduct)
        throw new Error(`Product with an ${id} is not found`);
    const [product] = await index_1.db
        .update(schema_1.products)
        .set(data)
        .where((0, drizzle_orm_1.eq)(schema_1.products.id, id))
        .returning();
    return product;
};
exports.updateProduct = updateProduct;
//delete
const deleteProduct = async (id) => {
    const existingProduct = await getByProductId(id);
    if (!existingProduct)
        throw new Error(`Product with an ${id} is not found`);
    const [product] = await index_1.db
        .delete(schema_1.products)
        .where((0, drizzle_orm_1.eq)(schema_1.products.id, id))
        .returning();
    return product;
};
exports.deleteProduct = deleteProduct;
//                                 ------COMMENTS-------
//add comment
const createComment = async (data) => {
    const [comment] = await index_1.db.insert(schema_1.comments).values(data).returning();
    return comment;
};
exports.createComment = createComment;
//delete comment
const deleteComment = async (id) => {
    const existingProduct = getCommentById(id);
    if (!existingProduct)
        throw new Error(`Comment with an ${id} is not found`);
    const [comment] = await index_1.db
        .delete(schema_1.comments)
        .where((0, drizzle_orm_1.eq)(schema_1.comments.id, id))
        .returning();
    return comment;
};
exports.deleteComment = deleteComment;
//get comment by id
const getCommentById = async (id) => {
    return await index_1.db.query.comments.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.comments.id, id),
        with: { user: true },
    });
};
exports.getCommentById = getCommentById;

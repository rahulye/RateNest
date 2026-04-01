/** @format */

import { db } from "./index";
import { eq } from "drizzle-orm";
import {
	users,
	products,
	comments,
	type NewUser,
	type NewComment,
	type NewProduct,
	Product,
} from "./schema";

//                              ------USER-----
//create
const createUser = async (data: NewUser) => {
	const [user] = await db.insert(users).values(data).returning();
	return user;
};
//get user
const getUserById = async (id: string) => {
	return await db.query.users.findFirst({ where: eq(users.id, id) });
};
//update user data
const updateUser = async (id: string, data: Partial<NewUser>) => {
	const [user] = await db
		.update(users)
		.set(data)
		.where(eq(users.id, id))
		.returning();
	return user;
};
//create or update user
const upsertUser = async (data: NewUser) => {
	const existingUser = await getUserById(data.id);
	if (existingUser) return updateUser(data.id, data);
	return createUser(data);
};

//                              ------PRODUCTS------
//create
const createProduct = async (data: NewProduct) : Promise<Product> => {
	const [product] = await db.insert(products).values(data).returning();
	return product;
};
//get a product
const getByProductId = async (id: string): Promise<Product | undefined> => {
	return await db.query.products.findFirst({
		where: eq(products.id, id),
		with: {
			user: true,
			comments: {
				with: { user: true },
				orderBy: (comments, { desc }) => [desc(comments.createdAt)],
			},
		},
	});
};
//get all product
const getAllProducts = async (): Promise<Product[] | undefined> => {
	return await db.query.products.findMany({
		with: { user: true , comments: true},
		orderBy: (products, { desc }) => [desc(products.createdAt)],
	});
};
//get a product by used id
const getProductByUserId = async (userId: string): Promise<Product[]> => {
	return await db.query.products.findMany({
		where: eq(products.userId, userId),
		with: { user: true },
		orderBy: (products, { desc }) => [desc(products.createdAt)],
	});
};
//update
const updateProduct = async (id: string, data: Partial<NewProduct>) :Promise<Product> => {
	const existingProduct = await getByProductId(id);
	if (!existingProduct) throw new Error(`Product with an ${id} is not found`);
	const [product] = await db
		.update(products)
		.set(data)
		.where(eq(products.id, id))
		.returning();
	return product;
}; 
//delete
const deleteProduct = async (id: string) : Promise<Product> => {
	const existingProduct = await getByProductId(id);
	if (!existingProduct) throw new Error(`Product with an ${id} is not found`);
	const [product] = await db
		.delete(products)
		.where(eq(products.id, id))
		.returning();
	return product;
};

//                                 ------COMMENTS-------
//add comment
const createComment = async (data: NewComment) => {
	const [comment] = await db.insert(comments).values(data).returning();
	return comment;
};
//delete comment
const deleteComment = async (id: string) => {
	const existingProduct = getCommentById(id);
	if (!existingProduct) throw new Error(`Comment with an ${id} is not found`);
	const [comment] = await db
		.delete(comments)
		.where(eq(comments.id, id))
		.returning();
	return comment;
};
//get comment by id
const getCommentById = async (id: string) => {
	return await db.query.comments.findFirst({
		where: eq(comments.id, id),
		with: { user: true },
	});
};

export {
	createUser,
	updateUser,
	upsertUser,
	getUserById,
	createProduct,
	getByProductId,
	getAllProducts,
	getProductByUserId,
	updateProduct,
	deleteProduct,
	createComment,
	deleteComment,
	getCommentById,
};

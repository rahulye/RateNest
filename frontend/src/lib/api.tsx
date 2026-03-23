/** @format */

import api from "./axios";
import type { UserBody } from "../types/user";
import type { CreateProductBody, Product, UpdateProductBody } from "../types/product";
import type { CommentBody } from "../types/comment";
import type { ApiResponse } from "../types/api";

// USERS API
const syncUser = async (userData: UserBody): Promise<ApiResponse<UserBody>> => {
	const { data } = await api.post("/users/sync", userData);
	return data;
};

// PRODUCTS API
const getAllProducts = async (): Promise<ApiResponse<Product[]>> => {
	const { data } = await api.get("/products/");
	return data;
};
const getByProductId = async (id: string): Promise<ApiResponse<Product>> => {
	const { data } = await api.get(`/products/${id}`);
	return data;
};
const getProductByUserId = async (): Promise<ApiResponse<Product[]>> => {
	const { data } = await api.get("/products/my");
	return data;
};
const createProduct = async (
	productData: CreateProductBody,
): Promise<ApiResponse<Product>> => {
	const { data } = await api.post("/products/", productData);
	return data;
};
const updateProduct = async (
	productId: string,
	productData : UpdateProductBody,
): Promise<ApiResponse<Product>> => {
	const { data } = await api.patch(`/products/${productId}`, productData);
	return data;
};
const deleteProduct = async (
	productId: string,
): Promise<ApiResponse<Product>> => {
	const { data } = await api.delete(`/products/${productId}`);
	return data;
};

// COMMENTS API
const createComment = async (
	productId: string,
	content: CommentBody,
): Promise<ApiResponse<CommentBody>> => {
	const { data } = await api.post(`/comments/${productId}`, content);
	return data;
};
const deleteComment = async (
	commentId: string,
): Promise<ApiResponse<CommentBody>> => {
	const { data } = await api.delete(`/comments/${commentId}`);
	return data;
};

export {
	syncUser,
	getAllProducts,
	getByProductId,
	getProductByUserId,
	createProduct,
	updateProduct,
	deleteProduct,
	createComment,
	deleteComment,
};

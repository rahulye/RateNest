/** @format */
import * as queries from "../db/queries";
import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import type { UpdateProductBody, ProductBody } from "../types/product";

//fetch all products (public)
const getAllProducts = async (req: Request, res: Response) => {
	try {
		const products = await queries.getAllProducts();
		return res.status(200).json({ status: "Success", data: products });
	} catch (err) {
		console.error("Error fetching all products", err);
		return res
			.status(500)
			.json({ status: "Error", message: "Failed to fetch all products" });
	}
};
//fetch a product by product id (public)
const getByProductId = async (req: Request, res: Response) => {
	try {
		const productId = req.params.productId as string;
		if (!productId)
			return res
				.status(400)
				.json({ status: "Error", message: "Invalid Product id" });
		const product = await queries.getByProductId(productId);
		if (!product)
			return res
				.status(404)
				.json({ status: "Error", message: "Product is not found" });
		return res.status(200).json({ status: "Success", data: product });
	} catch (err) {
		console.error("Error fetching a product by product id ", err);
		return res
		.status(500)
		.json({ status: "Error", message: "Failed to fetch a product by product id" });
	}
};
//fetch my products (protected)
const getProductByUserId = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId)
			return res.status(401).json({ status: "Error", message: "Unauthorized" });
		const products = await queries.getProductByUserId(userId);
		res.status(200).json({
			status: "Success",
			data: products,
		});
	} catch (err) {
		console.error("Error fetching a product by user id ", err);
		return res.status(500).json({
			status: "Error",
			message: "Failed to fetch a product by user id",

		});
	}
};
// create a product (protected)
const createProduct = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId)
			return res.status(401).json({
				status: "Error",
				message: "Unauthorized",
			});
		const { title, description, imageURL } = req.body as ProductBody;
		if (!title || !description || !imageURL)
			return res.status(400).json({
				status: "Error",
				message: "Title, Description and imageURL are required",
			});
		const product = await queries.createProduct({
			userId,
			title,
			description,
			imageURL,
		});
		return res.status(200).json({
			status: "Success",
			data: product,
		});
	} catch (err) {
		console.error("Error creating a product", err);
		return res.status(500).json({
			status: "Error",
			message: "Failed to create a product",
		});
	}
};
// update a product by product id (protected)
const updateProduct = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId)
			return res.status(401).json({
				status: "Error",
				message: "Unauthorized",
			});
		const productId = req.params.productId as string;
		if (!productId)
			return res.status(400).json({
				status: "Error",
				message: "Invalid Product id",
			});
		//check existence
		const existingProduct = await queries.getByProductId(productId);
		if (!existingProduct)
			return res.status(404).json({
				status: "Error",
				message: "Product not found",
			});
		//check user have access
		if (existingProduct.userId !== userId)
			return res.status(403).json({
				status: "Error",
				message: "You do not have permission to perform this action",
			});
		const updateData = req.body as UpdateProductBody;
		if (Object.keys(updateData).length === 0)
			return res.status(400).json({
				status: "Error",
				message: "At least one field is required to update",
			});

		// Whitelist allowed update fields
		const { title, description, imageURL } = updateData;
		const sanitizedUpdate = {
			...(title !== undefined && { title }),
			...(description !== undefined && { description }),
			...(imageURL !== undefined && { imageURL }),
		};

		if (Object.keys(sanitizedUpdate).length === 0)
			return res.status(400).json({
				status: "Error",
				message: "At least one valid field is required to update",
			});

		// updateData contains { title, description, imageURL };
		const product = await queries.updateProduct(productId, {
			userId,
			...sanitizedUpdate
		});
		return res.status(200).json({
			status: "Success",
			data: product,
		});
	} catch (err) {
		console.error("Error creating a product", err);
		return res.status(500).json({
			status: "Error",
			message: "Failed to create a product",
		});
	}
};
//delete a product (protected)
const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId)
			return res.status(401).json({ status: "Error", message: "Unauthorized" });
		const productId = req.params.productId as string;
		if (!productId)
			return res.status(400).json({
				status: "Error",
				message: "Invalid Product id",
			});
		//check existence
		const existingProduct = await queries.getByProductId(productId);
		if (!existingProduct)
			return res.status(404).json({
				status: "Error",
				message: "Product not found",
			});
		//check user have access
		if (existingProduct.userId !== userId)
			return res.status(403).json({
				status: "Error",
				message: "You do not have permission to perform this action",
			});
		const product = await queries.deleteProduct(productId);
		res.status(200).json({
			status: "Success",
			message: "Product deleted Successfully",
			data: product,
		});
	} catch (err) {
		console.error("Error to delete a product ", err);
		return res
			.status(500)
			.json({ status: "Error", message: "Failed to delete a product" });
	}
};

export {
	getAllProducts,
	getByProductId,
	getProductByUserId,
	deleteProduct,
	createProduct,
	updateProduct,
};

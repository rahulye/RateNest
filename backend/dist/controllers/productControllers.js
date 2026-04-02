"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.createProduct = exports.deleteProduct = exports.getProductByUserId = exports.getByProductId = exports.getAllProducts = void 0;
/** @format */
const queries = __importStar(require("../db/queries"));
const express_1 = require("@clerk/express");
//fetch all products (public)
const getAllProducts = async (req, res) => {
    try {
        const products = await queries.getAllProducts();
        return res.status(200).json({ status: "Success", data: products });
    }
    catch (err) {
        console.error("Error fetching all products", err);
        return res
            .status(500)
            .json({ status: "Error", message: "Failed to fetch all products" });
    }
};
exports.getAllProducts = getAllProducts;
//fetch a product by product id (public)
const getByProductId = async (req, res) => {
    try {
        const productId = req.params.productId;
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
    }
    catch (err) {
        console.error("Error fetching a product by product id ", err);
        return res
            .status(500)
            .json({ status: "Error", message: "Failed to fetch a product by product id" });
    }
};
exports.getByProductId = getByProductId;
//fetch my products (protected)
const getProductByUserId = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId)
            return res.status(401).json({ status: "Error", message: "Unauthorized" });
        const products = await queries.getProductByUserId(userId);
        res.status(200).json({
            status: "Success",
            data: products,
        });
    }
    catch (err) {
        console.error("Error fetching a product by user id ", err);
        return res.status(500).json({
            status: "Error",
            message: "Failed to fetch a product by user id",
        });
    }
};
exports.getProductByUserId = getProductByUserId;
// create a product (protected)
const createProduct = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId)
            return res.status(401).json({
                status: "Error",
                message: "Unauthorized",
            });
        const { title, description, imageURL } = req.body;
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
    }
    catch (err) {
        console.error("Error creating a product", err);
        return res.status(500).json({
            status: "Error",
            message: "Failed to create a product",
        });
    }
};
exports.createProduct = createProduct;
// update a product by product id (protected)
const updateProduct = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId)
            return res.status(401).json({
                status: "Error",
                message: "Unauthorized",
            });
        const productId = req.params.productId;
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
        const updateData = req.body;
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
    }
    catch (err) {
        console.error("Error creating a product", err);
        return res.status(500).json({
            status: "Error",
            message: "Failed to create a product",
        });
    }
};
exports.updateProduct = updateProduct;
//delete a product (protected)
const deleteProduct = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId)
            return res.status(401).json({ status: "Error", message: "Unauthorized" });
        const productId = req.params.productId;
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
    }
    catch (err) {
        console.error("Error to delete a product ", err);
        return res
            .status(500)
            .json({ status: "Error", message: "Failed to delete a product" });
    }
};
exports.deleteProduct = deleteProduct;

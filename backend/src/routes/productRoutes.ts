/** @format */

import { Router } from "express";
const router = Router();
import * as productControllers from "../controllers/productControllers";
import { requireAuth } from "@clerk/express";


// GET /api/products/ => get all products (public)
router.get("/", productControllers.getAllProducts);


// GET /api/products/my => get current user products only by user (protected - owner only)
router.get("/my",requireAuth(), productControllers.getProductByUserId);


// POST /api/products/ => create a product only by current user (protected - owner only)
router.post("/", requireAuth(), productControllers.createProduct);

// GET /api/products/:productId => get a product by product Id (public)
router.get("/:productId", productControllers.getByProductId);

// PUT /api/products/:productId => update a product only by current user (protected - owner only)
router.put("/:productId", requireAuth(), productControllers.updateProduct);

// PUT /api/products/:productId => delete a product only by current user (protected - owner only)
router.delete("/:productId", requireAuth(), productControllers.deleteProduct);

export default router;

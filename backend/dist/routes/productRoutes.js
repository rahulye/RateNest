"use strict";
/** @format */
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
const express_1 = require("express");
const router = (0, express_1.Router)();
const productControllers = __importStar(require("../controllers/productControllers"));
const express_2 = require("@clerk/express");
// GET /api/products/ => get all products (public)
router.get("/", productControllers.getAllProducts);
// GET /api/products/my => get current user products only by user (protected - owner only)
router.get("/my", (0, express_2.requireAuth)(), productControllers.getProductByUserId);
// POST /api/products/ => create a product only by current user (protected - owner only)
router.post("/", (0, express_2.requireAuth)(), productControllers.createProduct);
// GET /api/products/:productId => get a product by product Id (public)
router.get("/:productId", productControllers.getByProductId);
// PATCH /api/products/:productId => update a product only by current user (protected - owner only)
router.patch("/:productId", (0, express_2.requireAuth)(), productControllers.updateProduct);
// DELETE /api/products/:productId => delete a product only by current user (protected - owner only)
router.delete("/:productId", (0, express_2.requireAuth)(), productControllers.deleteProduct);
exports.default = router;

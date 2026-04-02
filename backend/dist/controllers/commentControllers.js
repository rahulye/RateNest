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
exports.deleteComment = exports.createComment = void 0;
const express_1 = require("@clerk/express");
const queries = __importStar(require("../db/queries"));
const createComment = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId)
            return res.status(401).json({
                status: "Error",
                message: "Missing authentication field.",
            });
        const productId = req.params.productId;
        if (!productId)
            return res
                .status(400)
                .json({ status: "Error", message: "Missing product id." });
        const existingProduct = await queries.getByProductId(productId);
        if (!existingProduct)
            return res
                .status(404)
                .json({ status: "Error", message: "Product not found" });
        const text = req.body.text;
        if (!text)
            return res
                .status(400)
                .json({ status: "Error", message: "Missing text field" });
        const comment = await queries.createComment({
            content: text,
            userId,
            productId,
        });
        return res.status(200).json({
            status: "Success",
            message: "Comment created Successfully",
            data: comment,
        });
    }
    catch (err) {
        console.error("Error creating a comment: ", err);
        return res.status(500).json({
            status: "Error",
            message: "Failed to create a comment",
        });
    }
};
exports.createComment = createComment;
const deleteComment = async (req, res) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId)
            return res.status(401).json({
                status: "Error",
                message: "Missing authentication field.",
            });
        const commentId = req.params.commentId;
        if (!commentId)
            return res
                .status(400)
                .json({ status: "Error", message: "Missing comment id." });
        const comment = await queries.getCommentById(commentId);
        if (!comment) {
            return res.status(404).json({
                status: "Error",
                message: "Comment not found.",
            });
        }
        if (userId !== comment.userId)
            return res.status(403).json({
                status: "Error",
                message: "You do not have permission to perform this action",
            });
        const deletedComment = await queries.deleteComment(commentId);
        return res.status(200).json({
            status: "Success",
            message: "Comment deleted Successfully",
            data: deletedComment,
        });
    }
    catch (err) {
        console.error("Error deleting a comment: ", err);
        return res.status(500).json({
            status: "Error",
            message: "Failed to delete a comment",
        });
    }
};
exports.deleteComment = deleteComment;

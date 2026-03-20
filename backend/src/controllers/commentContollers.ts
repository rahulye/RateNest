/** @format */

import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import * as queries from "../db/queries";

const createComment = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId)
			return res.status(401).json({
				status: "Error",
				message: "Missing authentication field.",
			});
		const productId = req.params.productId as string;
		if (!productId)
			return res
				.status(400)
				.json({ status: "Error", message: "Missing product id." });
		const existingProduct = await queries.getByProductId(productId);
		if (!existingProduct)
			return res
				.status(404)
				.json({ status: "Error", message: "Product not found" });

		const { content } = req.body;
		if (!content)
			return res
				.status(400)
				.json({ status: "Error", message: "Missing content field" });

		if (userId !== content.userId)
			return res.status(403).json({
				status: "Error",
				message: "You do not have permission to perform this action",
			});
		const comment = await queries.createComment({
			content,
			userId,
			productId,
		});
		return res.status(200).json({
			status: "Success",
			message: "Comment created Successfully",
			data: comment,
		});
	} catch (err) {
		console.error("Error creating a comment: ", err);
		return res.status(500).json({
			status: "Error",
			message: "Failed to create a comment",
		});
	}
};

const deleteComment = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req);
		if (!userId)
			return res.status(401).json({
				status: "Error",
				message: "Missing authentication field.",
			});
		const commentId = req.params.commentId as string;
		if (!commentId)
			return res
				.status(400)
				.json({ status: "Error", message: "Missing comment id." });
		const comment = await queries.getCommentById(commentId);
		if (!comment)
			return res
				.status(404)
				.json({ status: "Error", message: "Comment not found" });

		const { content } = req.body;
		if (!content)
			return res
				.status(400)
				.json({ status: "Error", message: "Missing content field" });

		if (userId !== comment.userId)
			return res.status(403).json({
				status: "Error",
				message: "You do not have permission to perform this action",
			});
		const deleteComment = await queries.deleteComment(commentId);
		return res.status(200).json({
			status: "Success",
			message: "Comment deleted Successfully",
			data: deleteComment,
		});
	} catch (err) {
		console.error("Error deleting a comment: ", err);
		return res.status(500).json({
			status: "Error",
			message: "Failed to delete a comment",
		});
	}
};

export { createComment, deleteComment };

import { Router } from "express";
const router = Router();
import { requireAuth } from "@clerk/express";
import * as commentController from "../controllers/commentControllers";

// POST /api/comments/:productId  => create a comment (protected) 
router.post("/:productId",requireAuth(),commentController.createComment);

// DELETE /api/comments/:commentId  => delete a comment (protected - owner only) 
router.delete("/:commentId",requireAuth(),commentController.deleteComment);

export default router;
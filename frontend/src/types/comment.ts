/** @format */

interface CommentBody {
	id: string;
	content: string;
	productId: string;
	createdAt: string;
	userId: string;
	user: CommentUser;
}

interface CreateComment {
	productId: string;
	content: string;
}

interface DeleteComment {
	commentId: string;
}

interface CommentUser {
	id: string;
	name: string;
	imageURL: string;
}

export type { CommentBody, CreateComment, DeleteComment };

/** @format */

import { useState } from "react";
import type { ProductWithUserAndComments } from "../types/product";
import {
	LogInIcon,
	MessageSquareIcon,
	SendIcon,
	Trash2Icon,
} from "lucide-react";
import { SignInButton, useAuth } from "@clerk/react";
import { useCreateComment, useDeleteComment } from "../hooks/useComments";
import { formatDistanceToNowStrict } from "date-fns";

interface Props {
	product: ProductWithUserAndComments;
	userId: string | null | undefined;
}

const CommentSection = ({ product, userId }: Props) => {
	const { isSignedIn } = useAuth();
	const [content, setContent] = useState("");
	const createComment = useCreateComment();
	const deleteComment = useDeleteComment(product.id);
	const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

	const handleDelete = (commentId: string) => {
		if (!confirm("Delete?")) return;
		setDeletingCommentId(commentId);
		deleteComment.mutate(commentId, {
			onSettled: () => setDeletingCommentId(null),
		});
	};
	const handleComment = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (!content.trim()) return;
		createComment.mutate(
			{ productId: product.id, content },
			{ onSuccess: () => setContent("") },
		);
	};
	return (
		<div className="space-y-4">
			{/* header */}
			<div className="flex items-center gap-2">
				<MessageSquareIcon className="text-primary"></MessageSquareIcon>
				<h3 className="font-bold ">Comments</h3>
				<span className="badge badge-neutral badge-sm">
					{product.comments.length}
				</span>
			</div>
			{/* Add comment */}
			{isSignedIn ? (
				<form onSubmit={handleComment} className="flex gap-2">
					<input
						type="text"
						placeholder="Add a comment..."
						className="input outline-0  input-sm flex-1 bg-base-200"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						disabled={createComment.isPending}
					/>
					<button
						type="submit"
						className="btn btn-primary btn-sm btn-square"
						disabled={createComment.isPending || !content.trim()}
					>
						{createComment.isPending ? (
							<span className="loading loading-spinner loading-xs" />
						) : (
							<SendIcon className="size-4" />
						)}
					</button>
				</form>
			) : (
				<div className="flex items-center justify-between bg-base-200 rounded-lg p-3">
					<span className="text-sm text-base-content/60">
						Sign in to join the conversation
					</span>
					<SignInButton mode="modal">
						<button className="btn btn-primary btn-sm gap-1">
							<LogInIcon className="size-4" />
							Sign In
						</button>
					</SignInButton>
				</div>
			)}
			{/* Comments */}
			{product.comments.length === 0 ? (
				<div className="text-base-content/80 text-sm p-5 flex justify-center gap-2">
					<MessageSquareIcon></MessageSquareIcon>
					No comments yet. Be the first!
				</div>
			) : (
				product.comments.map((comment) => (
					<div className="chat chat-start flex flex-col" key={comment.id}>
						<div className="chat-header py-1 space-x-0.5">
							<span className="text-xs ml-5">{comment.user.name}</span>
							<time className="opacity-50 px-1">
								{formatDistanceToNowStrict(new Date(comment.createdAt), {
									addSuffix: true,
								})}
							</time>
						</div>
						<div className="flex gap-4 items-start">
							<img
								className="avatar size-7 rounded-full"
								src={comment.user.imageURL}
								alt={`${comment.user.name}'s avatar`}
							/>							<div className="chat-bubble chat-bubble-neutral">
								{comment.content}
							</div>
						</div>
						{userId === comment.userId && (
							<div className="chat-footer">
								<button
									onClick={() => handleDelete(comment.id)}
									className="btn btn-ghost btn-xs text-error"
									disabled={deletingCommentId === comment.id}
								>
									{deletingCommentId === comment.id ? (
										<span className="loading loading-spinner loading-xs" />
									) : (
										<Trash2Icon className="size-3" />
									)}
								</button>
							</div>
						)}
					</div>
				))
			)}
		</div>
	);
};

export default CommentSection;

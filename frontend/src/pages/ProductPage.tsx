/** @format */

import { useAuth } from "@clerk/react";
import {
	ArrowLeftIcon,
	CalendarIcon,
	EditIcon,
	Trash2Icon,
	User2Icon,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { useDeleteProductById, useGetProductById } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import CommentSection from "../components/CommentSection";

const ProductPage = () => {
	const { userId } = useAuth();
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const deleteProduct = useDeleteProductById();
	const { isLoading, isError, data: product } = useGetProductById(id!);
	if (!id) {
		return (
			<div className="flex flex-col items-center gap-5">
				<span>Invalid product ID.</span>
				<Link to={"/"}>
					<div className="btn btn-primary btn-ghost btn-sm outline">
						<ArrowLeftIcon className="size-4"></ArrowLeftIcon>
						Home
					</div>
				</Link>
			</div>
		);
	}
	if (isLoading) return <LoadingSpinner />;
	if (isError || !product)
		return (
			<div className="flex flex-col items-center gap-5">
				<span>Product not found.</span>
				<Link to={"/"}>
					<div className="btn btn-primary btn-ghost btn-sm outline">
						<ArrowLeftIcon className="size-4"></ArrowLeftIcon>
						Home
					</div>
				</Link>
			</div>
		);
	const isOwner = userId === product?.data.userId;
	const handleMutate = (id: string) => {
		if (confirm("Delete this product permanently?")) {
			deleteProduct.mutate(id, {
				onSuccess: () => navigate("/"),
			});
		}
	};
	const date = new Date(product.data.createdAt).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
	return (
		<div className="max-w-4xl mx-auto space-y-5 py-5">
			<div className="flex justify-between flex-1 ">
				<Link to={"/"}>
					<div className="btn btn-ghost" role="button">
						<ArrowLeftIcon className="size-4" />
						back
					</div>
				</Link>
				<div className="flex items-center justify-between">
					{/* Edit and Delete  */}
					{isOwner && (
						<>
							<Link to={`/edit/${product?.data.id}`} className="btn btn-ghost">
								<EditIcon className="size-4"></EditIcon>
								<span>Edit</span>
							</Link>
							<button
								className="btn btn-ghost bg-red-700"
								disabled={deleteProduct.isPending}
								onClick={() => handleMutate(product.data.id)}
							>
								{deleteProduct.isPending ? (
									<span className="loading loading-spinner loading-sm" />
								) : (
									<Trash2Icon className="size-4 text-primary-content"></Trash2Icon>
								)}
								<span className="text-primary-content">Delete</span>
							</button>
						</>
					)}
				</div>
			</div>
			{/* Hero */}
			{/* Product*/}
			<div className="gap-4 lg:grid-cols-2 grid">
				{/* Product Image */}
				<div className="card">
					<div className="rounded-box h-full flex justify-center bg-base-300/50 overflow-hidden">
						<figure className="p-5">
							<img
								className="h-80 rounded-box object-contain"
								src={product.data.imageURL}
								alt={product.data.title}
							></img>
						</figure>
					</div>
				</div>
				{/* Product Info */}
				<div className="card">
					<div className="card-body flex justify-between rounded-box bg-base-300/50">
						<div className="card-title">{product.data.title}</div>
						<div className="flex gap-5">
							<div className="flex-nowrap gap-2 items-center flex text-base-content/50">
								<CalendarIcon className="size-4"></CalendarIcon>
								{date}
							</div>
							<div className="flex-nowrap gap-2 items-center flex text-base-content/50">
								<User2Icon className="size-4"></User2Icon>
								{product.data.user.name}
							</div>
						</div>
						<div className="divider h-1"></div>
						<div className="text-sm text-base-content/80 whitespace-pre-wrap">
							{product.data.description}
						</div>
						<div className="divider h-1"></div>
						{product.data.user && (
							<div className="card-actions flex space-x-1 text-start">
								<div className="avatar">
									<div className="w-6 rounded-full">
										<img src={product.data.user.imageURL} alt={`${product.data.user.name}'s avatar`} />
									</div>
								</div>
								<p className="text-base-content/80">{product.data.user.name}</p>
							</div>
						)}
					</div>
				</div>
			</div>
			{/* Comments */}
			<div className="card bg-base-300/80 ">
				<div className="card-body">
					<CommentSection product={product.data} userId={userId} />
				</div>
			</div>
		</div>
	);
};

export default ProductPage;

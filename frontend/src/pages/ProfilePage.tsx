/** @format */

import {
	EditIcon,
	EyeIcon,
	PackageIcon,
	PlusIcon,
	Trash2Icon,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDeleteProductById, useMyProducts } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";

const ProfilePage = () => {
	const navigate = useNavigate();
	const { data: product, error, isLoading } = useMyProducts();
	const deleteProduct = useDeleteProductById();
	if (isLoading) return <LoadingSpinner></LoadingSpinner>;
	if (error) {
		return (
			<div role="alert" className="alert alert-error">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<span>Something went wrong. Please refresh the page.</span>
			</div>
		);
	}
	const handleDelete = (id: string) => {
		if (confirm("Delete this product permanently?")) deleteProduct.mutate(id);
	};

	return (
		<div className="flex flex-col gap-5">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="font-bold text-2xl">My Products</h1>
					<p className="text-base-content/50 text-xs">manage your listings</p>
				</div>
				<Link to={"/create"} className="btn btn-primary btn-sm">
					<PlusIcon className="size-4"></PlusIcon>
					<span className="text-xs">New</span>
				</Link>
			</div>
			{/* total product */}
			<div className="card">
				<div className="card-body gap-0.5 rounded-box bg-base-300/80 flex">
					<span className="text-base-content/50 text-xs">Total Products</span>
					<p className="text-3xl font-semibold text-primary">
						{product?.data.length || 0}
					</p>
				</div>
			</div>
			{/* products */}
			{product?.data?.length===0 ? (
				<div className="card bg-base-300">
					<div className="card-body items-center text-center py-16">
						<PackageIcon className="size-16 text-base-content/20" />
						<h3 className="card-title text-base-content/50">No products yet</h3>
						<p className="text-base-content/40 text-sm">
							Start by creating your first product
						</p>
						<Link to="/create" className="btn btn-primary btn-sm mt-4">
							Create Product
						</Link>
					</div>
				</div>
			) : (
				product?.data.map((item) => {
					return (
						<div className="card" key={item.id}>
							<div className="card-side rounded-box bg-base-300/80 flex">
								<figure className="w-42 shrink-0">
									<img
										className="min-h-40 h-full"
										src={item.imageURL}
										alt={item.title}
									/>
								</figure>
								<div className="p-4 flex flex-col flex-1 justify-between">
									<div>
										<span className="text-lg font-semibold">{item.title}</span>
										<span className="line-clamp-2 text-base-content/50">
											{item.description}
										</span>
									</div>
									<div className="card-actions justify-end mt-2">
										<button
											onClick={() => navigate(`/product/${item.id}`)}
											className="btn btn-ghost btn-xs gap-1"
										>
											<EyeIcon className="size-3" /> View
										</button>
										<button
											onClick={() => navigate(`/edit/${item.id}`)}
											className="btn btn-ghost btn-xs gap-1"
										>
											<EditIcon className="size-3" /> Edit
										</button>
										<button
											onClick={() => handleDelete(item.id)}
											className="btn btn-ghost btn-xs text-error gap-1"
											disabled={deleteProduct.isPending}
										>
											<Trash2Icon className="size-3" /> Delete
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

export default ProfilePage;

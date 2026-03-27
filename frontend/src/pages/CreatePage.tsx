/** @format */

import {
	ArrowLeftIcon,
	FileTextIcon,
	ImageIcon,
	PackagePlus,
	TypeIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCreateProducts } from "../hooks/useProducts";

const CreatePage = () => {
	const navigate = useNavigate();
	const createProduct = useCreateProducts();
	const [formData, setFormData] = useState({
		title: "",
		imageURL: "",
		description: "",
	});
	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault(); // to not reload the page if there 
		createProduct.mutate(formData, {
			onSuccess: () => {
				navigate("/");
			},
		});
	};
	return (
		<div className="max-w-2xl mx-auto space-y-5 py-10">
			<Link to={"/"} className="btn btn-ghost	">
				<ArrowLeftIcon className="size-4"></ArrowLeftIcon>
				<span>back</span>
			</Link>
			<div className="card bg-base-300 p-3">
				<div className="card-body space-y-4">
					<h1 className="card-title text-lg gap-3">
						<PackagePlus className="text-primary size-5"></PackagePlus>
						New Product
					</h1>
					<form className="space-y-2" onSubmit={handleSubmit}>
						{/* {NAME} */}
						<label className="input space-x-2 w-full validator border border-base-300 hover:border-base-content/50 outline-0 transition-all bg-base-200">
							<TypeIcon className="size-4 text-base-content/50"></TypeIcon>
							<input
								type="text"
								required
								placeholder="Product Title"
								pattern="[A-Za-z][A-Za-z0-9\-]*"
								minLength={3}
								maxLength={25}
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
								title="Only letters, numbers or dash"
							/>
						</label>
						<p className="validator-hint">
							Must be 3 to 25 characters and containing only letters, numbers or
							dash
						</p>
						{/* Image URL */}
						<label className="input validator space-x-2 bg-base-200 outline-0 w-full border border-base-300 hover:border-base-content/50 transition-all">
							<ImageIcon className="size-4 text-base-content/50"></ImageIcon>
							<input
								type="url"
								required
								placeholder="https://"
								value={formData.imageURL}
								onChange={(e) =>
									setFormData({ ...formData, imageURL: e.target.value })
								}
								pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
								title="Must be valid URL"
							/>
						</label>
						{formData.imageURL && (
							<div className="overflow-hidden mt-5 rounded-box max-h-120 flex items-center justify-center">
								<img
									src={formData.imageURL}
									onError={(e) => (e.currentTarget.removeAttribute("src"))}
									alt="preview failed"
								></img>
							</div>
						)}
						<p className="validator-hint">Must be valid URL</p>
						{/* Description */}
						<div className="form-control">
							<div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300 hover:border-base-content/50 transition-all">
								<FileTextIcon className="size-4 text-base-content/50 mt-1" />
								<textarea
									placeholder="Description"
									className="grow bg-transparent resize-none focus:outline-none min-h-30"
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									required
								/>
							</div>
						</div>

						{createProduct.isError && (
							<div className="alert alert-error" role="alert">
								Failed to create. Try again.
							</div>
						)}
						<button
							type="submit"
							className="btn btn-primary mt-5"
							disabled={createProduct.isPending}
						>
							{createProduct.isPending ? (
								<span className="loading-spinner loading"></span>
							) : (
								"Create Product"
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreatePage;

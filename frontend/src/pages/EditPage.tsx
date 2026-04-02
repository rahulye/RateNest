/** @format */

import { useAuth } from "@clerk/react";
import EditProductForm from "../components/EditProductForm";
import { useGetProductById, useUpdateProduct } from "../hooks/useProducts";
import { Link, useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

const EditPage = () => {
	const { userId } = useAuth();
	const { id } = useParams();
	const product = useGetProductById(id!);
	const updateProduct = useUpdateProduct();
	if (!product.data?.data ) {
		return <LoadingSpinner />;
	}
	if (!product || product.data?.data.userId !== userId) {
		return (
			<div className="card bg-base-300 max-w-md mx-auto">
				<div className="card-body items-center text-center">
					<h2 className="card-title text-error">
						{!product ? "Not found" : "Access denied"}
					</h2>
					<Link to="/" className="btn btn-primary btn-sm">
						Go Home
					</Link>
				</div>
			</div>
		);
	}
	return (
		<EditProductForm
			product={product.data?.data}
			updateProduct={updateProduct}
		></EditProductForm>
	);
};

export default EditPage;

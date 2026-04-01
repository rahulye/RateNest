/** @format */

import { useProducts } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import { PackageIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import { SignUpButton, useAuth } from "@clerk/react";

const HomePage = () => {
	const { data: products, isLoading, error } = useProducts();
	const { isSignedIn } = useAuth();
	if (isLoading) return <LoadingSpinner />;
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
	return (
		<div className="space-y-10">
			{/* hero */}
			<div className="hero bg-base-300 rounded-box">
				<div className="hero-content flex-col lg:flex-row-reverse py-10">
					<div className="text-center lg:text-left">
						<h1 className="text-4xl lg:text-5xl font-bold leading-tight">
							Share Your <span className="text-primary">Products</span>
						</h1>
						<p className="py-4 text-base-content/80">
							Upload, discover, and connect with creators.
						</p>
						{ isSignedIn ? (
							<Link to="/create" className="btn btn-primary btn-sm">
								Publish Product
							</Link>
						) : (
							<SignUpButton mode="modal">
								<button className="btn btn-primary btn-sm">
									<SparklesIcon className="size-4"></SparklesIcon>
									Get Started
								</button>
							</SignUpButton>
						)}
					</div>
				</div>
			</div>
			{/* products */}
			<h2 className="flex items-center gap-2 font-bold">
				<PackageIcon className="text-primary size-5"></PackageIcon>
				All Products
			</h2>
			{products!.data!.length === 0 ? (
				<div className="card py-16 bg-base-300 w-full">
					<div className="card-body items-center text-center">
						<PackageIcon className="size-16 text-base-content/20"></PackageIcon>
						<h2 className="card-title text-base-content/50 mb-5">
							No products yet
						</h2>
						<Link to={"/create"}>
							<button className="bg-primary btn btn-primary btn-sm">
								Create Product
							</button>
						</Link>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{products!.data!.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</div>
	);
};

export default HomePage;

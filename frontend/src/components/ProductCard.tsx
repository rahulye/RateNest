/** @format */

import type { ProductWithUserAndComments } from "../types/product";
import { Link } from "react-router";
import { MessageCircleIcon } from "lucide-react";

interface Props {
	product: ProductWithUserAndComments;
}

const onWeekAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);

const ProductCard = ({ product }: Props) => {
	const isNew = new Date(product.createdAt) > onWeekAgo;

	return (
		<Link
			to={`/product/${product.id}`}
			className="transition-all rounded-box duration-100 hover:scale-101 bg-base-300/50 tooltip tooltip-info"
			data-tip={isNew ? `Added within a day` : ""}
		>
			<figure className="p-3 overflow-hidden aspect-4/3 flex items-center justify-center">
				<img
					className="rounded-box transition-transform duration-100 hover:scale-101 h-full w-full object-contain"
					src={product.imageURL}
					alt="product image"
				/>
			</figure>
			<div className="card-body p-5">
				<h2 className="card-title">
					{product.title}
					{isNew && <div className="badge-sm badge badge-secondary">NEW</div>}
				</h2>
				<p className="text-base-content/80 line-clamp-2 text-xs">
					{product.description}
				</p>
				<div className="divider"></div>
				{product.user && (
					<div className="card-actions flex space-x-1 text-start">
						<div className="avatar">
							<div className="w-6 rounded-full">
								<img src={product.user.imageURL}></img>
							</div>
						</div>
						<p className="text-base-content/80">{product.user.name}</p>
					</div>
				)}
				{product.comments && (
					<div className="flex">
						<MessageCircleIcon></MessageCircleIcon>
						<p className="text-base-content/80 text-sm">
							{product.comments.length}
						</p>
					</div>
				)}
			</div>
		</Link>
	);
};

export default ProductCard;

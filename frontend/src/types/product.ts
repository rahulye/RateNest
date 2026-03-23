/** @format */
interface Product {
	id: string;
	title: string;
	description: string;
	imageURL: string;
	createdAt: string;
	updatedAt: string;
	userId: string;
}

interface CreateProductBody {
	title: string;
	description: string;
	imageURL: string;
}

type UpdateProductBody = Partial<CreateProductBody>;
export type { UpdateProductBody, Product , CreateProductBody};

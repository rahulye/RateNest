/** @format */

interface ProductBody {
	title: string;
	description: string;
	imageURL: string;
}

type UpdateProductBody = Partial<ProductBody>

export type { ProductBody , UpdateProductBody };

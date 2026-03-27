/** @format */
import type { UserBody } from "./user";
import type { CommentBody } from "./comment";
interface ProductBody {
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

interface ProductWithUserAndComments extends ProductBody {
	user: UserBody
	comments: CommentBody[]; 
}

export type { UpdateProductBody, ProductBody , CreateProductBody, ProductWithUserAndComments};

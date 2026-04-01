/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getByProductId,
	getProductByUserId,
	updateProduct,
} from "../lib/api";
import type { CreateProductBody, ProductBody, UpdateProductBody } from "../types/product";
import type { ApiResponse } from "../types/api";

// get all products
const useProducts = () => {
	return useQuery({
		queryKey: ["products"],
		queryFn: getAllProducts,
	});
};

// create product 
const useCreateProducts = () => {
	return useMutation<ApiResponse<ProductBody>, Error, CreateProductBody>({
		mutationFn: createProduct,
	});
};

// get product by id 
const useGetProductById = (id: string) => {
	return useQuery({
		queryKey: ["product", id],
		queryFn: () => getByProductId(id),
		enabled: !!id,  //Use enabled ONLY when a query depends on something that may be undefined
	});
};

// delete product
const useDeleteProductById = () => {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse<ProductBody>, Error, string>({
		mutationFn: (id) => deleteProduct(id),
		onSuccess: (_, id) => {
			queryClient.invalidateQueries({ queryKey: ["myProducts"] });
			queryClient.invalidateQueries({ queryKey: ["product", id] });
		},
	});
};

// my products
const useMyProducts = () => {
	return useQuery({
		queryKey: ["myProducts"],
		queryFn: getProductByUserId,
	});
};

// update product
const useUpdateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation<
		ApiResponse<ProductBody>,
		Error,
		{ id: string; data: UpdateProductBody }
	>({
		mutationFn: ({ id, data }) => updateProduct(id, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({
				queryKey: ["product", variables.id],
			});
			queryClient.invalidateQueries({ queryKey: ["myProducts"] });
		},
	});
};

export {
	useProducts,
	useCreateProducts,
	useGetProductById,
	useDeleteProductById,
	useMyProducts,
	useUpdateProduct,
};

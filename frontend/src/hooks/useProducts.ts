/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getByProductId,
	getProductByUserId,
} from "../lib/api";
// get all products
const useProducts = () => {
	return useQuery({
		queryKey: ["products"],
		queryFn: getAllProducts,
	});
};
// create products
const useCreateProducts = () => {
	return useMutation({
		mutationFn: createProduct,
	});
};
// get product by id
const useGetProducyById = (id: string) => {
	return useQuery({
		queryKey: ["product", id],
		queryFn: () => getByProductId(id),
		enabled: !!id,
	});
};

// delete product by id
const useDeleteProductById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteProduct(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["myProducts"] });
		},
	});
};

const useMyProducts = () => {
	return useQuery({
		queryKey: ["myProducts"],
		queryFn: getProductByUserId,
	});
};

export {
	useProducts,
	useCreateProducts,
	useGetProducyById,
	useDeleteProductById,
	useMyProducts,
};

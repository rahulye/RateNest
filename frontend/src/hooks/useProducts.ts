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
const useGetProductById = (id: string) => {
	return useQuery({
		queryKey: ["product", id],
		queryFn: () => getByProductId(id),
		enabled: !!id,  //Use enabled ONLY when a query depends on something that may be undefined
	});
};

// delete product by id
const useDeleteProductById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteProduct(id),
		onSuccess: (_,id) => {
			queryClient.invalidateQueries({ queryKey: ["myProducts"] });
			queryClient.invalidateQueries({ queryKey: ["product", id] });
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
	useGetProductById,
	useDeleteProductById,
	useMyProducts,
};

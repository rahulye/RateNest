/** @format */

import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "../lib/api";
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
		mutationFn: createProduct
	})
}


export {useProducts, useCreateProducts};

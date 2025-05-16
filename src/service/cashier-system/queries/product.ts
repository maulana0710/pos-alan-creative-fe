import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getProducts } from "../api/product";

export function useGetProducts() {
  return useQuery({
    queryKey: ["Get products"],
    queryFn: getProducts,
  });
}

export function useGetAllProducts() {
  return useQuery({
    queryKey: ["Get all products"],
    queryFn: getAllProducts,
  });
}

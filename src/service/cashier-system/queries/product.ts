import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getProducts } from "../api/product";
import { TRequestParams } from "@/types";

export function useGetProducts({ pagination }: TRequestParams) {
  return useQuery({
    queryKey: ["Get products", pagination],
    queryFn: () => getProducts({ pagination }),
  });
}

export function useGetAllProducts() {
  return useQuery({
    queryKey: ["Get all products"],
    queryFn: getAllProducts,
  });
}

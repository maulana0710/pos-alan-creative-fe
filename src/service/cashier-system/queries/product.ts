import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/product";

export function useGetProducts() {
  return useQuery({
    queryKey: ["Get products"],
    queryFn: getProducts,
  });
}

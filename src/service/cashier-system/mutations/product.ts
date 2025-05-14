import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TStoreProductReqBody } from "@/types/product";
import { storeProduct, updateProduct } from "../api/product";

export const useStoreProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["Store product"],
    mutationFn: (data: TStoreProductReqBody) => storeProduct(data),
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get products"] });
    },
    onSettled: () => {},
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationKey: ["Update product"],
    mutationFn: ({ uuid, data }: { uuid: string; data: TStoreProductReqBody }) => updateProduct(uuid, data),
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  });
};

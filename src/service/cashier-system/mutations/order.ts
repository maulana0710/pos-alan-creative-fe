import { useMutation } from "@tanstack/react-query";
import { TStoreOrderReqBody } from "@/types/order";
import { storeOrder } from "../api/order";

export const useStoreOrder = () => {
  return useMutation({
    mutationKey: ["Store order"],
    mutationFn: (data: TStoreOrderReqBody) => storeOrder(data),
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  });
};
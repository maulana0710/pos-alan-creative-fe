import { useMutation } from "@tanstack/react-query";
import { TStoreOrderReqBody } from "@/types/order";
import { storeFirstOrder, storeRepeatOrder } from "../api/order";

export const useStoreFirstOrder = () => {
  return useMutation({
    mutationKey: ["Store first order"],
    mutationFn: (data: TStoreOrderReqBody) => storeFirstOrder(data),
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  });
};

export const useStoreRepeatOrder = () => {
  return useMutation({
    mutationKey: ["Store repeat order"],
    mutationFn: (data: TStoreOrderReqBody) => storeRepeatOrder(data),
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  });
};

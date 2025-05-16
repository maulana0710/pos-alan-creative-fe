import { TStoreProductionHeadReqBody, TStoreProductionTargetReqBody } from "@/types/production";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeProductionHead, generateProductionLabel, generateProductionLabels, storeProductionTarget } from "../api/production";


export const useStoreProductionHead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["Store production head"],
    mutationFn: (data: TStoreProductionHeadReqBody) => storeProductionHead(data),
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get production heads"] });
    },
    onSettled: () => {},
  });
};

export const useGenerateProductionLabel = () => {
  return useMutation({
    mutationKey: ["Generate production label"],
    mutationFn: (orderno: string) => generateProductionLabel(orderno),
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  });
};

export const useGenerateProductionLabels = () => {
  return useMutation({
    mutationKey: ["Generate production labels"],
    mutationFn: ({ prod_code, printed }: { prod_code: string; printed?: string | null }) =>
      generateProductionLabels(prod_code, printed),
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  });
};

export const useStoreProductionTarget = () => {
  return useMutation({
    mutationKey: ["Store production target"],
    mutationFn: (data: TStoreProductionTargetReqBody) => storeProductionTarget(data),
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  });
};

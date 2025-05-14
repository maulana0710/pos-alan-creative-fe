import { useQuery } from "@tanstack/react-query";
import { getOrder, getOrders } from "../api/order";
import { TRequestParams } from "@/types";

export function useGetOrders({ filtering, pagination }: TRequestParams) {
  return useQuery({
    queryKey: ["Get orders", filtering, pagination],
    queryFn: () => getOrders({ filtering, pagination }),
  });
}

export function useGetOrder(uuid: string) {
  return useQuery({
    queryKey: ["Get order", uuid],
    queryFn: () => getOrder(uuid),
  });
}



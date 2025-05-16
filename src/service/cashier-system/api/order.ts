import { authorizedAxiosInstance } from ".";
import { TRequestParams } from "@/types";
import { TGetOrderResBody, TGetOrdersResBody, TStoreOrderReqBody } from "@/types/order";

export const getOrders = async ({ filtering, pagination }: TRequestParams) => {
  const filteringParams = new URLSearchParams();
  const paginationParams = new URLSearchParams();

  if (filtering?.search) {
    filteringParams.append("search", filtering.search.toString());
  }

  if (filtering?.status_method) {
    filteringParams.append("status_method", filtering.status_method.toString());
  }

  if (pagination?.page) paginationParams.append("page", pagination.page.toString());
  if (pagination?.pageSize) paginationParams.append("per_page", pagination.pageSize.toString());
  if (pagination?.page) paginationParams.append("page", pagination.page.toString());

  const response = await authorizedAxiosInstance.get(`/app/order?${filteringParams.toString()}&${paginationParams}`);
  return response.data as TGetOrdersResBody;
};

export const getOrder = async (uuid: string) => {
  const response = await authorizedAxiosInstance.get(`/app/order/${uuid}`);
  return response.data as TGetOrderResBody;
};

export const storeOrder = async (data: TStoreOrderReqBody) => {
  const response = await authorizedAxiosInstance.post("/app/order/", data);
  return response.data;
};


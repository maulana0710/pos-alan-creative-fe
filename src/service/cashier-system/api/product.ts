import { TRequestParams } from "@/types";
import { authorizedAxiosInstance } from ".";
import * as TProduct from "@/types/product";

export const getProducts = async ({ pagination }: TRequestParams) => {
  const filteringParams = new URLSearchParams();
  const paginationParams = new URLSearchParams();

  if (pagination?.page) paginationParams.append("page", pagination.page.toString());
  if (pagination?.pageSize) paginationParams.append("per_page", pagination.pageSize.toString());

  const response = await authorizedAxiosInstance.get(
    `/app/master-data/product?${filteringParams.toString()}&${paginationParams.toString()}`
  );
  return response.data as TProduct.TGetProductsResBody;
};
export const getAllProducts = async () => {
  const response = await authorizedAxiosInstance.get("/app/master-data/all-products");
  return response.data as TProduct.TGetAllProductsResBody;
};

export const storeProduct = async (data: TProduct.TStoreProductReqBody) => {
  const response = await authorizedAxiosInstance.post("/app/master-data/product", data);
  return response.data;
};

export const updateProduct = async (uuid: string ,data: TProduct.TStoreProductReqBody) => {
  const response = await authorizedAxiosInstance.put(`/app/master-data/product/${uuid}`, data);
  return response.data as TProduct.TGetProductsResBody;
};

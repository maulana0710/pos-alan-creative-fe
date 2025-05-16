import { TRequestParams } from "@/types";
import { authorizedAxiosInstance } from ".";
import { TGetProductionHeadsResBody, TGetProductionHeadResBody, TGetProductionDetailsResBody, TStoreProductionHeadReqBody, TGenerateProductionLabelResBody, TGenerateProductionLabelsResBody, TGetProductionReportingProductsResBody, TStoreProductionTargetReqBody } from "@/types/production";

export const getProductionHeads = async ({ filtering, pagination }: TRequestParams) => {
  const filteringParams = new URLSearchParams();
  const paginationParams = new URLSearchParams();

  if (filtering?.search) {
    filteringParams.append("search", filtering.search.toString());
    filteringParams.append("search_column", "name");
  }
  if (pagination?.page) paginationParams.append("page", pagination.page.toString());
  if (pagination?.pageSize) paginationParams.append("per_page", pagination.pageSize.toString());

  const response = await authorizedAxiosInstance.get(
    `/app/order?${filteringParams.toString()}&${paginationParams.toString()}`
  );

  return response.data as TGetProductionHeadsResBody;
};

export const getProductionHead = async (prod_code: string) => {
  const response = await authorizedAxiosInstance.get(`/app/order/${prod_code}`);
  return response.data as TGetProductionHeadResBody;
};

export const getProductionDetails = async (
  prod_code: string,
  { filtering, pagination, printed }: TRequestParams = {}
) => {
  const filteringParams = new URLSearchParams();
  const paginationParams = new URLSearchParams();

  if (filtering?.search) {
    filteringParams.append("search", filtering.search.toString());
    filteringParams.append("search_column", "name");
  }
  if (pagination?.page) paginationParams.append("page", pagination.page.toString());
  if (pagination?.pageSize) paginationParams.append("per_page", pagination.pageSize.toString());
  if (printed?.printed !== null && printed?.printed !== undefined) {
    filteringParams.append("printed", printed.printed.toString());
  }

  const response = await authorizedAxiosInstance.get(
    `/app/order/${prod_code}/detail?${filteringParams.toString()}&${paginationParams.toString()}`
  );

  return response.data as TGetProductionDetailsResBody;
};

export const storeProductionHead = async (data: TStoreProductionHeadReqBody) => {
  const response = await authorizedAxiosInstance.post("/app/order", data);
  return response.data;
};

export const generateProductionLabel = async (orderno: string) => {
  const response = await authorizedAxiosInstance.post(`/app/order/${orderno}/print-label`);
  return response.data as TGenerateProductionLabelResBody;
};

export const generateProductionLabels = async (prod_code: string, printed?: string | null) => {
  const response = await authorizedAxiosInstance.post(`/app/order/${prod_code}/print-labels`, null, {
    params: { printed },
  });
  return response.data as TGenerateProductionLabelsResBody;
};

export const getProductionReportingProducts = async (first_date: string, last_date: string) => {
  const filteringParams = new URLSearchParams();

  if (first_date && last_date) {
    filteringParams.append("first_date", first_date);
    filteringParams.append("last_date", last_date);
  }

  const response = await authorizedAxiosInstance.get(`/app/dashboard/product-all?${filteringParams.toString()}`);
  return response.data as TGetProductionReportingProductsResBody;
};

export const storeProductionTarget = async (data: TStoreProductionTargetReqBody) => {
  const response = await authorizedAxiosInstance.post("/app/dashboard/production-target", data);
  return response.data;
};

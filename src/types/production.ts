import { TBaseResponse } from ".";
import { TPagination } from "./pagination";

export type TProductionHead = {
  id: number;
  branch_id: number;
  delivery_date: string;
  production_code: string;
  branch: {
    id: number;
    uuid: string;
    name: string;
  };
};

export type TGetProductionHeadsResBody = TBaseResponse & {
  data: TPagination & {
    data: TProductionHead[];
  };
};

export type TGetProductionHeadResBody = TBaseResponse & {
  data: {
    item: TProductionHead;
  };
};

export type TStoreProductionHeadReqBody = {
  branch_uuid: string;
  delivery_date: string;
};

export type TStoreProductionTargetReqBody = {
  product: string;
  production_date: string;
  target_qty: number;
};

export type TProductionDetail = {
  id: number;
  barcode: number;
  product_package: number;
  custom_request: string;
  delivery_date: string;
  customer: number;
  address_id: number;
  address: string;
  printed: number;
};

export type TGetProductionDetailsResBody = TBaseResponse & {
  data: TPagination & {
    data: TProductionDetail[];
  };
};

export type TGenerateProductionLabelReqBody = unknown;
export type TGenerateProductionLabelResBody = TBaseResponse & {
  data: {
    file_path: string;
  };
};
export type TGenerateProductionLabelsResBody = TBaseResponse & {
  data: {
    file_path: string;
  };
};

export type TGetProductionReportingProductsResBody = TBaseResponse & {
  data: {
    items: {
      id: number;
      name: string;
      product: number;
      tanggal: string;
      total: string;
    }[];
  };
};

export type TGetProductionReportingProductsReqBody = {
  first_date: string;
  last_date: string;
  // printed: string | null;
};

export type TProductionTableDataItem = {
  index: number;
  branch: string;
  date: string;
  code: string;
  actions: { item: TProductionHead };
};

export type TProductionDetailTableDataItem = {
  index: number;
  date: string;
  name: string;
  phone: string;
  address: string;
  actions: { item: TProductionDetail };
};

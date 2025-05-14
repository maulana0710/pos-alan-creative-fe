import { TBaseResponse } from ".";
import { TPagination } from "./pagination";

export type TStatusMethod = "first_order" | "repeat_order";
export type TOrderType = "pre_order" | "ready_stock";
export type TOrderStatus = "success" | "pending";

export type TOrder = {
  id: number;
  uuid: string;
  orderno: string;
  status_method: TStatusMethod;
  order_type: TOrderType;
  status: TOrderStatus;
  grand_total: string;
  payment_proof?: string;
  payment_date?: string;
  total_bill?: string | null;
  changes?: unknown | null;
  qty?: string;
  voucher?: unknown | null;
  address_id: number | null;
  address: string | null;
  delivery_date: string;
  delivered_time?: string | number;
  split_box: "1" | "0";
  delivery_method: {
    id: number;
    name: string;
  };
  created_by: {
    id: number;
    name: string;
    image: string | null;
  };
  request_delete_at: string | null;
  product_packages: {
    id: number;
    uuid: string;
    name: string;
    image: string | null;
    price: number;
  };
  order_details?: TOrderPackage[];
  order_package?: TOrderPackage[];
  created_at: string;
};

export type TOrderPackage = {
  order_type: string;
  id: number;
  order_id: number;
  product_package: number;
  voucher: unknown | null;
  delivery_date: string | null;
  customer: number;
  address_id: unknown | null;
  address: unknown | null;
  product_packages: {
    id: number;
    uuid: string;
    name: string;
    image: string;
    price: number;
  };
  order_details: {
    id: number;
    product: {
      id: number;
      uuid: string;
      name: string;
      potongan: number;
      description: string;
      catatan: string;
      image: string | null;
      price: string;
    };
    order: number;
    qty: number;
    price: string;
    total: string;
  }[];
};

export type TStoreOrderReqBody = {
  order_type: string;
  customer: string;
  payment_method: string;
  delivered_time: string;
  split_box: number;
  delivery: {
    method: string;
    price: string;
    date: string;
    address?: string;
  };
  order_package: {
    product_package: string;
    products: {
      uuid: string;
      qty: string;
    }[];
  }[];
};

export type TGetOrdersResBody = TBaseResponse & {
  data: TPagination & {
    data: TOrder[];
  };
};

export type TGetOrderResBody = TBaseResponse & {
  data: {
    item: TOrder;
  };
};

export type TGetOrderResponse = TBaseResponse & {
  data: TOrder;
};

export type TCreateOrderResponse = TBaseResponse & {
  data: {
    data: TOrder;
    total: number;
  };
};

export type TOrderTableDataAttribute = {
  index: number;
  uuid: string;
  status: TOrderStatus;
  status_method?: TStatusMethod;
  orderno: { uuid: string; orderno: string; status_method: TStatusMethod };
  branch: { name: string };
  createdBy: { name: string; created_at: string };
  actions: { order: TOrder };
};

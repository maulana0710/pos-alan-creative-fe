import { TBaseResponse } from ".";
import { TPagination } from "./pagination";

export type TOrderStatus = "success" | "pending";

export type TOrder = {
  id: number;
  uuid: string;
  orderno: string;
  name: string;
  qty: number;
  image: string;
  price: number;
  status: TOrderStatus;
  grand_total: string;
  changes?: unknown | null;
  order_details?: TOrderPackage[];
  order_package?: TOrderPackage[];
  created_at: string;
};

export type TCartItem = {
  id: number;
  uuid: string;
  name: string;
  image: string;
  price: number;
  qty: number;
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
  total_payment: number;
  grand_total: number;
  change: number;
  order_package: {
    products: {
      uuid: string;
      qty: number;
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
  branch: { name: string };
  createdBy: { name: string; created_at: string };
  actions: { order: TOrder };
};

import { TBaseResponse } from "./index";
import { TPagination } from "./pagination";


export type TProduct = {
  id: number;
  uuid: string;
  name: string;
  image: string;
  price: number;
  fl_active: "1" | "0";
  created_at: string;
  updated_at: string;
};

export type TGetProductsResBody = TBaseResponse & {
  data: TPagination & {
    data: TProduct[];
  };
};

export type TStoreProductReqBody = {
  name: string;
  price: string;
  image: File | null;
  fl_active: "1" | "0";
};

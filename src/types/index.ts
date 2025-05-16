
export type TBaseResponse = {
  success: boolean;
  code: number;
  locale: string;
  message: string;
};

export type TKeyValue = {
  uuid: string;
  name?: string;
  label?: string;
};

export type TSelectOption = {
  value?: string | number;
  label?: string;
  name?: string;
  code?: string | number;
};

export type TGroupedOption = {
  readonly label: string;
  readonly options: readonly TSelectOption[];
};

export type TPagination = {
  page: number;
  pageSize: number;
};

export type TErrorResponse = {
  status: string | boolean;
  message?: string;
  data?: unknown;
};

export type TRequestParams = {
  filtering?: { search?: string; status_method?: string };
  sorting?: { sort_column?: string; sort_order?: string };
  pagination?: { page?: number; per_page?: number; pageSize?: number };
  printed?: { printed: number | string | null };
};

export type TFilteringStates = {
  search: string;
  stage_status: string;
};

export type TGender = "L" | "P";

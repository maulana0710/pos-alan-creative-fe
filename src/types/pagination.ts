export type TPagination = {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [
    {
      url: string | null;
      label: string;
      active: boolean;
    },
    {
      url: string;
      label: string;
      active: boolean;
    },
    {
      url: string | null;
      label: string;
      active: boolean;
    }
  ];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

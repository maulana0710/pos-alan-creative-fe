import { ReactNode } from "react";

export interface TNavItemBase {
  id?: string;
  name: string;
  icon?: ReactNode;
  path: string;
  badge?: string;
  badgeIndicator?: ReactNode;
  grp_name?: string;
}

export interface TNavItemWithChildren extends TNavItemBase {
  childrens: (TNavItemBase | TNavItemWithChildren)[];
}

export type TNavItem = TNavItemBase | TNavItemWithChildren;

export type TNavMenu = {
  group: string;
  contents: TNavItem[];
}[];

export type TNavMenuItem = {
  group: string;
  contents: TNavItem[];
}[];

export const NavMenu: TNavMenu = [
  {
    group: "transaksi",
    contents: [
      {
        name: "transaksi",
        path: "/transaksi",
        badge: "",
        childrens: [],
      },
    ],
  },
  {
    group: "food",
    contents: [
      {
        name: "food",
        path: "/food",
        badge: "",
        childrens: [],
      },
    ],
  },
];

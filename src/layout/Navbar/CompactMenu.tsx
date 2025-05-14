import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { compactMenu } from "@/utils/CompactNavInit";

import { NavMenu, TNavMenuItem } from "./NavMenu";
import NavHeader from "./NavHeader";

type TCompactMenuProps = {
  state: { pathname: string };
};

const CompactMenu: React.FC<TCompactMenuProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const width = 1200;

  const [authorizedNavMenu, setAuthorizedNavMenu] = React.useState<TNavMenuItem>([]);

  const handleDocumentClick = React.useCallback(
    (e: MouseEvent) => {
      if (width >= 1200) {
        const target = (e.target as Element).closest(".more-nav-item");
        const extra = (e.target as Element).closest(".extra-link");
        const navLink = (e.target as Element).closest(".nav-link");

        if (target && !extra && navLink) {
          e.preventDefault();
          const href = navLink.getAttribute("href");
          if (href) {
            router.prefetch(href);
            router.push(href);
          }
        }
      }
    },
    [width, router]
  );

  const handleMenuClick = React.useCallback(
    (path?: string) => {
      if (path) {
        router.push(path);
      }
    },
    [router]
  );

  const isActiveNavItem = (currentPath: string, menuPath: string): boolean => {
    if (menuPath === "/" + currentPath.split("/")[1]) {
      return true;
    }

    const pathSegments = currentPath.split("/");
    const menuSegments = menuPath.split("/");

    return pathSegments[1] === menuSegments[1];
  };

  React.useEffect(() => {
    setAuthorizedNavMenu(NavMenu);
  }, []);

  React.useEffect(() => {
    if (width) {
      compactMenu();
    }
  }, [width]);

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  return (
    <div className="h-full w-full">
      <NavHeader />
      <div className="overflow-y-auto h-full">
        <div className="ms-16 flex gap-4">
          {authorizedNavMenu?.map((item, index) => (
            <React.Fragment key={index}>
              {item.contents.map((menus, ind) => {
                const isActive = isActiveNavItem(pathname, menus.path);
                return (
                  <div
                    key={ind}
                    className={`${isActive ? "border-b-4 border-blue-500 text-blue-500" : ""}`}
                  >
                    <Link
                      href={menus.path}
                      onClick={() => handleMenuClick(menus.path)}
                      className={`block px-4 text-xl hover:bg-gray-100 ${
                        pathname === menus.path
                          ? "font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {menus.name}
                    </Link>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompactMenu;

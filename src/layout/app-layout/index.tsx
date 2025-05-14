"use client";
import React from "react";

import PageFooter from "../Footer/PageFooter";
import CompactNav from "../Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className=""
      data-layout="navbar"
      data-navbar-style={""}
      data-layout-style={"default"}
      data-menu="light"
      data-footer="simple"
    >
      <CompactNav />
      <div className="mt-20 bg-gray-300 min-h-screen">
        {children}
        <PageFooter />
      </div>
    </div>
  );
};

export default MainLayout;

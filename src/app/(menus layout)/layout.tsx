"use client";
import MainLayout from "@/layout/app-layout";
import React from "react";

const AppsLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default AppsLayout;

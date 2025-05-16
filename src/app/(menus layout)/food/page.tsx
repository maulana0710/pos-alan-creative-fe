"use client";
import React from "react";

// import { TProduct } from "@/types/product";

import ProductPageHeader from "./components/main/ProductPageHeader";
import ProductPageBody from "./components/main/ProductPageBody";

const ProductPage: React.FC = () => {
  const [showAddProductModal, setShowAddProductModal] = React.useState<boolean>(false);

  return (
    <>
      <div className="mx-16">
        <ProductPageHeader action={{ toggle: () => setShowAddProductModal(!showAddProductModal) }} />
        <ProductPageBody />
      </div>
    </>
  );
};

export default ProductPage;

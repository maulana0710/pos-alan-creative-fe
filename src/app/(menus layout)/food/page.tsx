"use client";
import React from "react";

// import { TProduct } from "@/types/product";

import ProductPageHeader from "./components/main/ProductPageHeader";
import ProductPageBody from "./components/main/ProductPageBody";
import { TProduct } from "@/types/product";

const ProductPage: React.FC = () => {
  const [showAddProductModal, setShowAddProductModal] = React.useState<boolean>(false);
  const [showEditProductModal, setShowEditProductModal] = React.useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = React.useState<TProduct | null>(null);
  console.log("🚀 ~ selectedProduct:", selectedProduct)

  const toggleEditProductModal = (item?: TProduct) => {
    if (item) {
      setSelectedProduct(item);
      setShowEditProductModal(true);
    } else {
      setShowEditProductModal(!showEditProductModal);
      if (!showEditProductModal) {
        setSelectedProduct(null);
      }
    }
  };

  return (
    <>
      <div className="mx-16">
        <ProductPageHeader action={{ toggle: () => setShowAddProductModal(!showAddProductModal) }} />
        <ProductPageBody action={{ toggleEditProductModal }} />
      </div>
    </>
  );
};

export default ProductPage;

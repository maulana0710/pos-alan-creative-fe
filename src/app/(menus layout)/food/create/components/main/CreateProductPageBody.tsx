/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useStoreProduct } from "@/service/cashier-system/mutations/product";
import { TStoreProductReqBody } from "@/types/product";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import ImageUploadDropzone from "../components/UploadImage";

const CreateProductPageBody = () => {
  const [requestResponse, setRequestResponse] = useState<{
    message: string | any;
    isError: boolean;
  } | null>(null);

  const storeProductMutation = useStoreProduct();

  const methods = useForm<TStoreProductReqBody>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const handleSubmission = async (data: TStoreProductReqBody) => {
    setRequestResponse(null);
  
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
  
      // Image harus berupa File, pastikan ini valid
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
  
      const storeProduct = await storeProductMutation.mutateAsync(formData as any);
  
      if (storeProduct.success === true) {
        toast.success("Product successfully added", { duration: 1500 });
        reset();
      }
    } catch (error: any) {
      setRequestResponse({
        message: error.response?.data?.message || "Something went wrong.",
        isError: true,
      });
    }
  };
  

  return (
    <div className="bg-white min-h-screen p-6">
      {requestResponse && (
        <div className="text-red-600 text-sm mb-4">
          {requestResponse.message}
        </div>
      )}

      <h2 className="text-blue-500 font-bold text-xl mb-6">Tambahkan Menu</h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmission)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Menu</label>
            <input
              {...register("name", { required: "Name is required" })}
              className={`w-full border rounded px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs font-bold mt-1">{errors.name.message}</p>
            )}
          </div>

          <ImageUploadDropzone />

          <div>
            <label className="block text-sm font-medium mb-1">Harga Menu</label>
            <div className="flex">
              <div className="py-2 px-3 self-center border rounded-s-md text-lg text-white bg-blue-400">Rp.</div>
              <input
                {...register("price", { required: "Price is required" })}
                className={`w-full border rounded px-3 py-2 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="text-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition opacity-70"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateProductPageBody;

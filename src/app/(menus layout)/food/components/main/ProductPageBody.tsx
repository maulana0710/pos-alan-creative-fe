"use client";

import React, { useState } from "react";
import { useGetProducts } from "@/service/cashier-system/queries/product";
import { TProduct } from "@/types/product";
import Error from "@/components/shared/http-response/Error";
import Null from "@/components/shared/http-response/Null";
import Image from "next/image";
import { rupiah } from "@/utils/currency";

type TProductPageBodyProps = {
  action: {
    toggleEditProductModal: (item?: TProduct) => void;
  };
};

const ProductPageBody: React.FC<TProductPageBodyProps> = () => {
  const { data, isLoading, isError } = useGetProducts();
  const [pagination, setPagination] = useState({ page: 1 });
  const products = data?.data;

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const totalPages = products
    ? Math.ceil(products.total / products.per_page)
    : 0;

  if (isError) return <Error />;

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!isLoading && !isError && products && (
        <div className="overflow-x-auto">
          {products.data.length > 0 ? (
            <>
              <table className="min-w-full text-left text-sm border-collapse">
                <thead className="bg-white">
                  <tr>
                    <th className="min-w-[150px] p-2 font-medium text-gray-700">
                      #
                    </th>
                    <th className="min-w-[200px] p-2 font-medium text-gray-700">
                      Nama
                    </th>
                    <th className="min-w-[150px] p-2 font-medium text-gray-700">
                      Foto
                    </th>
                    <th className="p-2 font-medium text-gray-700">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {products.data.map((value, index) => (
                    <React.Fragment key={value.id}>
                      <tr className="border-b last:border-none">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{value.name}</td>
                        <td className="p-2">
                          <div className="flex items-center">
                            <Image
                              src={value.image}
                              alt={value.name}
                              className="w-10 h-10 object-cover rounded"
                              width={40}
                              height={40}
                            />
                          </div>
                        </td>
                        <td className="p-2">{rupiah(value.price)}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center mt-4 text-sm">
                <div>
                  Showing {products.from} to {products.to} of {products.total}{" "}
                  entries
                </div>
                <div>
                  <ul className="inline-flex gap-1">
                    <li>
                      <button
                        className={`px-3 py-1 border rounded ${
                          pagination.page <= 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                      >
                        Previous
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        const current = pagination.page;
                        return (
                          page === 1 ||
                          page === totalPages ||
                          (page >= current - 1 && page <= current + 1) ||
                          (current <= 3 && page <= 5) ||
                          (current >= totalPages - 2 && page >= totalPages - 4)
                        );
                      })
                      .map((page, idx, array) => {
                        const showEllipsisBefore =
                          idx > 0 && array[idx - 1] !== page - 1;
                        return (
                          <React.Fragment key={page}>
                            {showEllipsisBefore && (
                              <li>
                                <span className="px-2 py-1 text-gray-500">
                                  ...
                                </span>
                              </li>
                            )}
                            <li>
                              <button
                                className={`px-3 py-1 border rounded ${
                                  pagination.page === page
                                    ? "bg-blue-500 text-white"
                                    : ""
                                }`}
                                onClick={() => handlePageChange(page)}
                              >
                                {page}
                              </button>
                            </li>
                          </React.Fragment>
                        );
                      })}

                    <li>
                      <button
                        className={`px-3 py-1 border rounded ${
                          pagination.page >= totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page >= totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <Null />
          )}
        </div>
      )}
    </>
  );
};

export default ProductPageBody;

"use client";

import Image from "next/image";
import { TCartItem } from "@/types/order";
import { rupiah } from "@/utils/currency";
import React from "react";

type PaymentProps = {
  totalPayment: number;
  setTotalPayment: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
  cart: TCartItem[];
  onClose: () => void;
  onSubmit: (payment: number) => void;
};

export default function Payment({
  totalPayment,
  setTotalPayment,
  totalPrice,
  cart,
  onClose,
  onSubmit,
}: PaymentProps) {
  const change = totalPayment > totalPrice ? totalPayment - totalPrice : 0;

  const handlePay = () => {
    onSubmit(totalPayment);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full flex p-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Detail Pesanan</h2>
          <table className="w-full">
            <thead className="bg-gray-200 text-left text-sm">
              <tr>
                <th className="px-2 py-1">#</th>
                <th className="px-2 py-1">Nama</th>
                <th className="px-2 py-1">Foto</th>
                <th className="px-2 py-1">Harga</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="text-sm odd:bg-gray-100">
                  <td className="px-2 py-1">{index + 1}</td>
                  <td className="px-2 py-1">
                    {item.name} x {item.qty}
                  </td>
                  <td className="px-2 py-1">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded object-cover"
                    />
                  </td>
                  <td className="px-2 py-1">{rupiah(item.price * item.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-64 pl-6 flex flex-col justify-between">
          <div>
            <label className="block font-medium mb-2">Uang Pembeli (Rp)</label>
            <input
              type="number"
              className="w-full border rounded px-2 py-1 mb-4"
              value={totalPayment}
              onChange={(e) => setTotalPayment(parseInt(e.target.value || "0"))}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 border py-1 rounded hover:bg-gray-100"
            >
              Close
            </button>
            <button
              onClick={handlePay}
              className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
            >
              Pay!
            </button>
          </div>
          <div className="mt-2 text-red-600 text-sm">
            Kembalian: Rp. {change.toLocaleString("id-ID")}
          </div>
        </div>
      </div>
    </div>
  );
}

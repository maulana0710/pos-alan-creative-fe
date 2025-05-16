"use client";

import Null from "@/components/shared/http-response/Null";
import { useGetAllProducts } from "@/service/cashier-system/queries/product";
import Image from "next/image";
import Profile from "@/assets/icon/male";
import { useState } from "react";
import { TProduct } from "@/types/product";
import { TCartItem, TStoreOrderReqBody } from "@/types/order";
import { useStoreOrder } from "@/service/cashier-system/mutations/order";
import { toast } from "sonner";
import Payment from "./modal/Payment";
import { useGenerateProductionLabel } from "@/service/cashier-system/mutations/production";

export default function Transaction() {
  const { data, isLoading, isError } = useGetAllProducts();
  const products = data?.data;
  const [requestResponse, setRequestResponse] = useState<string>();
  const generateProductionLabelMutation = useGenerateProductionLabel();
  const [cart, setCart] = useState<TCartItem[]>([]);

  const handleAddToCart = (product: TProduct) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handlePrintLabel = async () => {    
    if (!requestResponse) {
      toast.error("Save bill FIRST.", {
        duration: 1500,
      });
      return;
    }
    try {
      const generate = await generateProductionLabelMutation.mutateAsync(requestResponse);
      if (generate.success === true) {
        const filePath = generate.data.file_path;
        toast.success("Label has been generated", {
          duration: 1500,
        });
        window.open(filePath, "_blank");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Save bill FIRST.", {
        duration: 1500,
      });
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const storeOrderMutation = useStoreOrder();
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [change, setChange] = useState<number>(0);

  const handleSubmitOrder = async () => {
    if (cart.length === 0) return;

    const grandTotal = totalPrice;
    const calculatedChange = totalPayment - grandTotal;
    setChange(calculatedChange);

    const orderPayload: TStoreOrderReqBody = {
      total_payment: totalPayment,
      grand_total: grandTotal,
      change: totalPayment == 0 ? change : calculatedChange,
      order_package: [
        {
          products: cart.map((item) => ({
            uuid: item.uuid, // make sure uuid tersedia di TProduct / TOrder
            qty: item.qty,
          })),
        },
      ],
    };

    try {
      const storeOrder = await storeOrderMutation.mutateAsync(orderPayload);
      setRequestResponse(storeOrder.data.item.orderno)
      if (storeOrder.success === true) {
        toast.success("Order successfully added", { duration: 1500 });
      }
    } catch (error) {
      toast.error("Order faild to added", { duration: 1500 });
      console.log("🚀 ~ handleSubmitOrder ~ error:", error);
    }
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="grid grid-cols-3 p-4 gap-6">
      {showModal && (
        <Payment
          cart={cart}
          totalPayment={totalPayment}
          setTotalPayment={setTotalPayment}
          totalPrice={totalPrice}
          onClose={() => setShowModal(false)}
          onSubmit={() => {
            handleSubmitOrder();
            setShowModal(false);
          }}
        />
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!isLoading && !isError && products && (
        <div className="col-span-2 overflow-x-auto p-6 justify-items-center">
          {products.items.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 w-full lg:w-3/4">
              {products.items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleAddToCart(item)}
                  className="shadow rounded overflow-hidden border hover:shadow-lg cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-2 text-center bg-white">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-blue-500 text-sm">
                      Rp. {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Null />
          )}
        </div>
      )}

      <div className="bg-white shadow rounded p-4 mt-6 w-full lg:w-1/4 min-w-[300px] justify-self-center">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg border rounded-full">
            <Profile />
          </span>
          <h2 className="text-lg font-semibold">Pesanan</h2>
        </div>

        <div className="space-y-2 mb-4 max-h-80 overflow-y-auto">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Image
                src={item.image}
                alt={item.name}
                width={40}
                height={40}
                className="rounded object-cover"
              />
              <div className="flex justify-between w-full text-sm">
                <p>
                  {item.name} x {item.qty}
                </p>
                <p className="text-blue-500">
                  Rp. {(item.qty * item.price).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleClearCart}
            className="cursor-pointer border border-red-400 text-red-400 py-2 rounded hover:bg-red-100"
          >
            Clear Cart
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleSubmitOrder}
              className="cursor-pointer flex-1 bg-green-400 text-white py-2 rounded hover:bg-green-500"
            >
              Save Bill
            </button>
            <button
              onClick={handlePrintLabel}
              className="cursor-pointer flex-1 bg-green-400 text-white py-2 rounded hover:bg-green-500"
            >
              Print Bill
            </button>
          </div>
          <button
            onClick={() => setShowModal(!showModal)}
            className="cursor-pointer bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
          >
            Charge Rp. {totalPrice.toLocaleString("id-ID")}
          </button>
        </div>
      </div>
    </div>
  );
}

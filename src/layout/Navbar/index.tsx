"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { Toaster } from "sonner";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CompactMenu from "./CompactMenu";

const CompactNav: React.FC = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md ${
        pathname ? "bg-gray-100" : ""
      }`}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <CompactMenu state={{ pathname }} />
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-40 hidden"
          />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={false}
        transition={Slide}
        limit={1}
      />

      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          style: { marginTop: "80px", zIndex: "999999" },
        }}
      />
    </div>
  );
};

export default CompactNav;

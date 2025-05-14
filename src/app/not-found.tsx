"use client";
import Image from "next/image";
import Link from "next/link";

import fatalErrorImg from "@/assets/img/macaroni-fatal-error.png";

const PagNotFoundDemonstration: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-wrap w-full max-w-screen-xl">
        <div className="lg:block lg:w-1/2 p-8 flex items-center justify-center">
          <Image
            src={fatalErrorImg}
            alt="404 Error"
            className="w-2/3 max-w-sm"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-lg text-gray-700">
              Sorry, the requested page cannot be found. Try finding with another name.
            </p>
            <Link
              href="/"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
            >
              Return to app
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagNotFoundDemonstration;

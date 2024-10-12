import React from "react";
import Image from "next/image";
import BikeGallery from "@/components/bikegallery";
import CheckoutCard from "@/components/checkoutcard";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

type paramsProps = {
  params: { id: string };
};

export default function Page({ params }: paramsProps) {
  const { id: bikeId } = params;
  return (
    <div className="flex justify-center min-h-screen mt-5">
      <div className="max-w-[100rem] w-full p-6">
        <div className="flex flex-col md:flex-row gap-10">
          <BikeGallery></BikeGallery>
          <CheckoutCard></CheckoutCard>
        </div>
        <div className="mt-10 px-5 space-y-3">
          <h2 className="text-2xl font-medium">
            Honda Activa 125 |{" "}
            <span className="text-lg text-gray-800">
              Endurace AL 2XS Ultegra Schaltung • Road Bike{" "}
            </span>
          </h2>
          <div className="space-y-1">
            <p className="flex gap-2 items-center text-sm text-gray-500">
              <FaLocationDot className="" />
              High Rise
            </p>
            <div className="flex gap-3">
              <p className="flex gap-2 items-center ">
                <FaStar className="text-yellow-400" />
                4.8
              </p>
              <p className="underline">12 Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import BikeGallery from "@/components/bikegallery";

type paramsProps = {
  params: { id: string };
};

export default function Page({ params }: paramsProps) {
  const { id: bikeId } = params;
  return (
    <div className="flex justify-center min-h-screen mt-5">
      <div className="max-w-[100rem] w-full p-6">
        <div className="flex gap-10">
          <BikeGallery></BikeGallery>
          <div className="card-shadow flex-grow p-10 rounded-xl">
            <h2 className="text-main text-xl font-medium">90₹ / hour</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

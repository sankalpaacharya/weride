import Image from "next/image";
import React from "react";
import RentalModal from "@/components/rentalmodal";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";

export default function index({ imageName }: { imageName: String }) {
  return (
    <div className="md:mt-10 shadow-xl p-3 py-5 relative rounded-lg flex flex-col">
      <Image
        className="border rounded-xl w-[20rem] h-[17rem] object-cover"
        alt="bike"
        src={`/images/${imageName}`}
        width={500}
        height={500}
      />
      <div className="space-y-4">
        <div className="mt-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Honda Activa 125
          </h2>
          <div className="mt-3 space-y-1">
            <div className="flex space-x-2 items-center">
              <FaRegUserCircle color="#481885" />
              <p className="text-sm text-gray-800">Vinit Thakkar</p>
            </div>
            <div className="">
              <p className="text-sm text-gray-800 flex space-x-2 items-center">
                <MdDirectionsBike color="#481885" />
                <p className="text-sm text-gray-800">Last Booked by Sankalpa</p>
              </p>
            </div>
          </div>
        </div>
        <RentalModal>
          <Button className="cursor-pointer text-md px-3 py-1 rounded-lg mt-2 w-full text-white">
            Rent
          </Button>
        </RentalModal>
      </div>
      <div></div>
    </div>
  );
}

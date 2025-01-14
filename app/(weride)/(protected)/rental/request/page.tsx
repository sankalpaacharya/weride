import React from "react";
import Image from "next/image";
import scooter from "@/public/images/scooter.png";
import { ChevronRight } from "lucide-react";
type Props = {};

export default function Page({}: Props) {
  return (
    <div className="container md:p-10 mark flex justify-center">
      <div className="bg-gray-100 rounded p-3 w-[30rem] shadow-md">
        <div className="grid grid-cols-2">
          <Image height={200} width={200} src={scooter} alt="scooter"></Image>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold">Honda Activa 125</h3>
              <ChevronRight className="ml-auto" />
            </div>
            <span className="bg-orange-300 w-fit px-3 py-1 rounded-full text-xs">
              Pending
            </span>
            <div className="space-y-1 mt-3">
              <p>
                Location: <span className="font-semibold">Bhaijipura</span>
              </p>
              <p>
                Duration: <span className="font-semibold">4 hours</span>
              </p>
              <p>
                Distance: <span className="font-semibold">10 KM</span>
              </p>
              <p>
                Amount: <span className="font-semibold">₹120</span>
              </p>
            </div>
            <div className="flex items-center mt-3">
              <div className="w-[10px] h-[10px] bg-indigo-500 rounded-full z-10"></div>
              <div className="h-[2px] w-full border-t border-dashed border-gray-400 mx-2"></div>
              <div className="w-[10px] h-[10px] bg-gray-900 rounded-full z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

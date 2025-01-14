import React from "react";
import Image from "next/image";
import scooter from "@/public/images/scooter.png";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
type Props = {};

export default function Page({}: Props) {
  return (
    <div className="container md:p-10 flex justify-center">
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
          </div>
        </div>
        <div className="px-10 mt-5 space-y-2">
          <div className="flex items-cente px-3">
            <div className="w-[12px] h-[10px] bg-indigo-500 rounded-full z-10 border border-3 shadow-xl"></div>
            <div className="h-px w-full border-t border-dashed border-gray-400 mx-2"></div>
            <div className="w-[12px] h-[10px] bg-gray-900 rounded-full z-10 border border-3 shadow-xl"></div>
          </div>
          <div className="flex text-xs text-gray-700">
            <div className="">
              <p className="font-semibold">2024/1/17</p>
              <p>10:00am</p>
            </div>
            <div className="ml-auto">
              <p className="font-semibold">2024/1/17</p>
              <p>1:00pm</p>
            </div>
          </div>

          <p className="text-xs text-gray-700">
            Please review the rental request and review within 30 minutes. The
            request will be expire after this time
          </p>
        </div>
        <div className="flex gap-4 mt-3">
          <Button className="w-full">Accept</Button>
          <Button variant={"destructive"} className="w-full">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

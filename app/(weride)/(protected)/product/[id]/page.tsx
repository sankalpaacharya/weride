"use client";
import React from "react";
import BikeGallery from "@/components/bikegallery";
import CheckoutCard from "@/components/checkoutcard";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { FaRegSmileBeam } from "react-icons/fa";
import { PiMedalLight } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type ParamsProps = {
  params: { id: string };
};

const BikeInfo: React.FC = () => (
  <div className="mt-10 space-y-5">
    <h2 className="text-2xl font-medium">
      Honda Activa 125 |{" "}
      <span className="text-lg text-gray-800">
        Endurace AL 2XS Ultegra Schaltung • Road Bike
      </span>
    </h2>
    <div className="space-y-1">
      <p className="flex gap-2 items-center text-sm text-gray-500">
        <FaLocationDot />
        High Rise
      </p>
      <div className="flex gap-3">
        <p className="flex gap-2 items-center">
          <FaStar className="text-yellow-400" />
          4.8
        </p>
        <p className="underline">12 Reviews</p>
      </div>
    </div>
    <p className="md:w-3/5">
      Beautiful, lightweight carbon racing bike with disc brakes (I don't know
      the exact weight, but about 7 kg), frame size 51 (suitable for riders
      between 1.65m and 1.80m tall). The Ultegra 11-speed is versatile, so it's
      suitable even for steep hills. {/* ... rest of the description ... */}
    </p>
  </div>
);

const OwnerInfo: React.FC = () => (
  <div className="md:mt-20 mt-10 flex gap-4">
    <Avatar className="md:w-[5rem] w-[3rem] md:h-[5rem] h-[3rem]">
      <AvatarImage width={200} src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div>
      <h3 className="md:text-xl font-medium">Vinit Thakkar</h3>
      <p className="text-sm text-gray-600">Response time &lt;10mins</p>
      <div className="mt-2 flex flex-col md:text-lg font-medium">
        <div className="flex md:flex-row flex-col md:space-x-3">
          <p className="flex gap-2 items-center">
            <FaStar className="text-main" />
            4.8
          </p>
          <p className="flex gap-2 items-center">
            <FaRegSmileBeam className="text-main" />
            Member Since 2023
          </p>
          <p className="flex gap-2 items-center">
            <PiMedalLight className="text-main" />
            Verified
          </p>
        </div>
        <Button className="w-fit mt-3">Profile</Button>
      </div>
    </div>
  </div>
);

const BikePage: React.FC<ParamsProps> = ({ params }) => {
  const { id: bikeId } = params;

  return (
    <div className="flex justify-center min-h-screen mt-5">
      <div className="max-w-[100rem] w-full">
        <div className="flex flex-col lg:flex-row gap-10">
          <BikeGallery />
          <CheckoutCard />
        </div>
        <div className="p-6">
          <BikeInfo />
          <OwnerInfo />
        </div>
      </div>
    </div>
  );
};

export default BikePage;

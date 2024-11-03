import React, { useState } from "react";
import { MdIosShare } from "react-icons/md";
import RentalModal from "../rentalmodal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function CheckoutCard() {
  const [kiloMeters, setKiloMeters] = useState(10);
  const pricePerKilometer = 7;
  return (
    <div className="md:shadow-cardshadow shadow-none flex-grow md:p-10 px-5 rounded-xl">
      <div className="space-y-1">
        <h2 className="text-main text-2xl font-medium">
          {pricePerKilometer}₹ / KM(s)
        </h2>
        <p className="text-sm text-gray-600">360₹ / 4hrs</p>
      </div>
      <span className="text-main flex gap-2 mt-5">
        <MdIosShare size={20} />
        Share
      </span>
      <div className="mt-5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="hours">kilometers</Label>
          <Select onValueChange={(value) => setKiloMeters(parseInt(value))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="location">Location</Label>
          <Input type="text" id="location" placeholder="Enter location" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-1 text-gray-700 text-sm ">
        <p className="text-left">
          {pricePerKilometer}₹ x {kiloMeters} KM(s)
        </p>
        <p className="text-right font-bold">
          {pricePerKilometer * kiloMeters}₹
        </p>
        <p className="text-left">Service fee</p>
        <p className="text-right font-bold">0.0₹</p>
        <p className="text-left">Late fee</p>
        <p className="text-right">To be calculated</p>
        <hr />
        <hr />
        <p className="font-md mt-2 font-semibold">Total</p>
        <p className="font-md mt-2 font-semibold text-right">
          ₹{kiloMeters * pricePerKilometer}
        </p>
      </div>
      <div className="mt-10">
        <p className="text-xs text-gray-600">
          By clicking “Rent now“ you agree to the WeRide{" "}
          <Link target="_blank" href={"/tos"} className="underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link target="_blank" href={"/tos"} className="underline">
            Privacy Policy
          </Link>
          .
        </p>
        <RentalModal>
          <Button className="w-full mt-2">Rent Now</Button>
        </RentalModal>
      </div>
    </div>
  );
}

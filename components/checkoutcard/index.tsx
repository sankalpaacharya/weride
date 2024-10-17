import React from "react";
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
  return (
    <div className="md:shadow-cardshadow shadow-none flex-grow md:p-10 px-5 rounded-xl">
      <div className="space-y-1">
        <h2 className="text-main text-2xl font-medium">90₹ / hour</h2>
        <p className="text-sm text-gray-600">360₹ / 4hrs</p>
      </div>
      <span className="text-main flex gap-2 mt-5">
        <MdIosShare size={20} />
        Share
      </span>
      <div className="mt-5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="hours">Rent Hours</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
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

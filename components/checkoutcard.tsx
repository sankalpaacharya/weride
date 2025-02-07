"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { checkOutSchema, TcheckOutSchema } from "@/lib/schemas/checkOutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoTimeOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { Input } from "./ui/input";
import Link from "next/link";
import { MapPinHouse } from "lucide-react";
import RentalModal from "./rentalmodal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DURATION_OPTIONS = [
  { value: "1", label: "1 hour", displayDuration: "1 hour" },
  { value: "2", label: "2 hours", displayDuration: "2 hours" },
  { value: "3", label: "3 hours", displayDuration: "3 hours" },
  { value: "4", label: "4 hours", displayDuration: "4 hours" },
  { value: "5", label: "5 hours", displayDuration: "5 hours" },
  { value: "6", label: "6 hours", displayDuration: "6 hours" },
];

type CheckoutCardProps = {
  bikeId: string;
  ownerId: string;
  availability: string;
  price: number;
};

export default function CheckoutCard({
  bikeId,
  ownerId,
  availability,
  price,
}: CheckoutCardProps) {
  const PRICE_PER_HOUR = price;
  const [hours, setHours] = useState("1");
  const totalPrice = PRICE_PER_HOUR * parseInt(hours);
  const [pickUpLocation, setPickUpLocation] =
    useState<TcheckOutSchema["pickUpLocation"]>("High Rise Gate");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TcheckOutSchema>({
    resolver: zodResolver(checkOutSchema),
    mode: "onChange",
  });
  console.log(errors, isValid);
  const [formData, setFormData] = useState<TcheckOutSchema | {}>({});

  const submitForm = (data: TcheckOutSchema) => {
    setFormData({ ...data, pickUpLocation });
  };

  const getDisplayDuration = (hrs: string) => {
    const option = DURATION_OPTIONS.find((opt) => opt.value === hrs);
    return option?.displayDuration || `${hrs} hours`;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-primary">₹{price}</span>
            <span className="text-sm text-gray-500 ml-2">per hour</span>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
            {availability}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          {/* Duration Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-base">
              <IoTimeOutline className="text-primary" size={18} />
              Rental Duration
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {DURATION_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={hours === option.value ? "default" : "outline"}
                  className={`h-12 w-full ${
                    option.value === "24" ? "col-span-2" : ""
                  }`}
                  onClick={() => setHours(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          {/* Destination Location */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-base">
              <FaLocationDot className="text-primary" size={18} />
              Destination Location
            </Label>
            <Input
              type="text"
              className="h-12"
              placeholder="Enter your pickup location"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-destructive text-sm">
                {errors.location.message}
              </p>
            )}
          </div>

          {/*  Pick Up Location */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-base">
              <MapPinHouse className="text-primary" size={18} />
              Pickup Location
            </Label>
            <Select
              defaultValue="High Rise Gate"
              onValueChange={(value: TcheckOutSchema["pickUpLocation"]) =>
                setPickUpLocation(value)
              }
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Pickup Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High Rise Gate">High Rise Gate</SelectItem>
                <SelectItem value="Cafeteria Gate">Cafeteria Gate</SelectItem>
                <SelectItem value="Boys UG Gate">Boys UG Gate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between text-sm">
              <span>Base rate ({getDisplayDuration(hours)})</span>
              <span className="font-medium">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Insurance & Protection</span>
              <span className="font-medium text-green-600">Included</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service fee</span>
              <span className="font-medium">₹0</span>
            </div>
            <div className="h-px bg-gray-200 my-2" />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
          {/* Terms and Rent Button */}
          <div className="space-y-4">
            <p className="text-xs text-gray-600">
              By clicking "Rent now" you agree to the WeRide{" "}
              <Link href="/tos" className="text-primary hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>

            <RentalModal
              formData={{
                ...formData,
                bikeId,
                ownerId,
                hour: parseInt(hours),
                pickUpLocation,
              }}
            >
              <Button
                disabled={!isValid}
                className="w-full h-12 text-base font-medium"
                type="submit"
              >
                Request to Book
              </Button>
            </RentalModal>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

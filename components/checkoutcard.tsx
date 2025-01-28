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
import RentalModal from "./rentalmodal";

const PRICE_PER_MINUTE = 40 / 60; // ₹40 per hour = ₹0.67 per minute
const DURATION_OPTIONS = [
  { value: "30", label: "30 mins", displayDuration: "30 minutes" },
  { value: "60", label: "1 hour", displayDuration: "1 hour" },
  { value: "120", label: "2 hours", displayDuration: "2 hours" },
  { value: "180", label: "3 hours", displayDuration: "3 hours" },
  { value: "1440", label: "Full day", displayDuration: "24 hours" },
];

type CheckoutCardProps = {
  bikeId: string;
  ownerId: string;
};

export default function CheckoutCard({ bikeId, ownerId }: CheckoutCardProps) {
  const [minutes, setMinutes] = useState("60");
  const totalPrice = Math.round(PRICE_PER_MINUTE * parseInt(minutes));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TcheckOutSchema>({
    resolver: zodResolver(checkOutSchema),
    mode: "onChange",
  });

  const [formData, setFormData] = useState<TcheckOutSchema | {}>({});

  const submitForm = (data: TcheckOutSchema) => {
    setFormData(data);
  };

  const getDisplayDuration = (mins: string) => {
    const option = DURATION_OPTIONS.find((opt) => opt.value === mins);
    return option?.displayDuration || `${mins} minutes`;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-primary">₹40</span>
            <span className="text-sm text-gray-500 ml-2">per hour</span>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
            Available Now
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
                  variant={minutes === option.value ? "default" : "outline"}
                  className={`h-12 w-full ${
                    option.value === "1440" ? "col-span-2" : ""
                  }`}
                  onClick={() => setMinutes(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Pickup Location */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-base">
              <FaLocationDot className="text-primary" size={18} />
              Pickup Location
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

          {/* Price Breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between text-sm">
              <span>Base rate ({getDisplayDuration(minutes)})</span>
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
                durationInMinutes: parseInt(minutes),
              }}
            >
              <Button
                disabled={!isValid}
                className="w-full h-12 text-base font-medium"
                type="submit"
              >
                Rent Now
              </Button>
            </RentalModal>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

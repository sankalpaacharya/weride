import React, { useState } from "react";
import { MdIosShare } from "react-icons/md";
import RentalModal from "../rentalmodal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { checkOutSchema, TcheckOutSchema } from "@/lib/schemas/checkOutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const PRICE_PER_KM = 7;
const HOURLY_RATES = [
  { value: "10", hours: 1 },
  { value: "15", hours: 2 },
  { value: "25", hours: 3 },
  { value: "30", hours: 4 },
  { value: "40", hours: 5 },
];

const KILOMETER_OPTIONS = [10, 15, 25, 30, 40];

export default function CheckoutCard() {
  const [kiloMeters, setKiloMeters] = useState("10");
  const [hours, setHours] = useState("1");
  const totalPrice = PRICE_PER_KM * parseInt(kiloMeters);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TcheckOutSchema>({ resolver: zodResolver(checkOutSchema) });
  console.log(errors);

  const [formData, setFormData] = useState<TcheckOutSchema | {}>({});

  const submitForm = (data: TcheckOutSchema) => {
    console.log("this is the form data", data);
    data.kilometer = kiloMeters;
    data.hour = hours;
    setFormData(data);
  };

  return (
    <div className="md:shadow-cardshadow shadow-none flex-grow md:p-10 px-5 rounded-xl sticky top-0 h-fit">
      <form onSubmit={handleSubmit((data) => submitForm(data))}>
        <div className="space-y-1">
          <h2 className="text-main text-2xl font-medium">
            {PRICE_PER_KM}₹ / KM(s)
          </h2>
          <p className="text-sm text-gray-600">360₹ / 4hrs</p>
        </div>
        <span className="text-main flex gap-2 mt-5">
          <MdIosShare size={20} />
          Share
        </span>
        <div className="mt-5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="hours">Hour</Label>
            <Select onValueChange={(hours) => setHours(hours)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Hours" />
              </SelectTrigger>
              <SelectContent>
                {HOURLY_RATES.map((rate) => (
                  <SelectItem key={rate.value} value={rate.value}>
                    {rate.hours}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="kilometers">Kilometers</Label>
              <Select onValueChange={(value) => setKiloMeters(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Kilometers" />
                </SelectTrigger>
                <SelectContent>
                  {KILOMETER_OPTIONS.map((km) => (
                    <SelectItem key={km} value={km.toString()}>
                      {km}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              id="location"
              placeholder="Enter location"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{`${errors.location.message}`}</p>
            )}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-1 text-gray-700 text-sm ">
          <p className="text-left">
            {PRICE_PER_KM}₹ x {kiloMeters} KM(s)
          </p>
          <p className="text-right font-bold">{totalPrice}₹</p>
          <p className="text-left">Service fee</p>
          <p className="text-right font-bold">0.0₹</p>
          <p className="text-left">Late fee</p>
          <p className="text-right">To be calculated</p>
          <hr />
          <hr />
          <p className="font-md mt-2 font-semibold">Total</p>
          <p className="font-md mt-2 font-semibold text-right">₹{totalPrice}</p>
        </div>

        <div className="mt-10">
          <p className="text-xs text-gray-600">
            By clicking &quot;Rent now&quot; you agree to the WeRide{" "}
            <Link target="_blank" href={"/tos"} className="underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link target="_blank" href={"/tos"} className="underline">
              Privacy Policy
            </Link>
            .
          </p>
          <RentalModal formData={formData}>
            <Button
              disabled={errors ? true : false}
              className="w-full mt-2"
              type="submit"
            >
              Rent Now
            </Button>
          </RentalModal>
        </div>
      </form>
    </div>
  );
}

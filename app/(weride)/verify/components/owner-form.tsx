"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ownerIdentitySchema,
  TownerIdentitySchema,
} from "@/app/schemas/ownerIdentitySchema";

export default function OwnerForm() {
  const [fuelType, setFuelType] = useState("petrol");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TownerIdentitySchema>({
    resolver: zodResolver(ownerIdentitySchema),
  });

  const submitForm = (data: TownerIdentitySchema) => {
    if (
      fuelType == "petrol" ||
      fuelType == "cycle" ||
      fuelType == "electric" ||
      fuelType == "diesel"
    ) {
      data.fuelType = fuelType;
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(submitForm)}>
      <Card className="mx-auto max-w-sm md:max-w-md mb-10 md:w-[100rem]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Owner Identity Verification
          </CardTitle>
          <CardDescription>
            Please fill in the details below. If you have already filled in the
            details, please wait for account verification. This is a manual
            process and may take several hours or up to a day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="collegeIDPhoto">
                College ID Card Photo (Both Side)
              </Label>
              <Input
                {...register("collegeIDPhoto")}
                id="collegeIDPhoto"
                type="file"
                placeholder="319"
              />
              {errors.collegeIDPhoto && (
                <p className="text-red-500 text-sm">
                  {`${errors.collegeIDPhoto.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostelIDPhoto">
                Hostel ID Card Photo (Both Side)
              </Label>
              <Input
                {...register("hostelIDPhoto")}
                id="hostelIDPhoto"
                type="file"
                placeholder="319"
              />
              {errors.hostelIDPhoto && (
                <p className="text-red-500 text-sm">
                  {`${errors.hostelIDPhoto.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <Input
                {...register("profilePhoto")}
                id="password"
                type="file"
                placeholder="319"
              />
              {errors.profilePhoto && (
                <p className="text-red-500 text-sm">
                  {`${errors.profilePhoto.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehiclePhoto">Vehicle Photo</Label>
              <Input
                {...register("vehiclePhoto")}
                id="password"
                type="file"
                placeholder="319"
              />
              {errors.vehiclePhoto && (
                <p className="text-red-500 text-sm">
                  {`${errors.vehiclePhoto.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="QRPhoto">QR Photo for payment</Label>
              <Input
                {...register("QRPhoto")}
                id="QRPhoto"
                type="file"
                placeholder="319"
              />
              {errors.QRPhoto && (
                <p className="text-red-500 text-sm">
                  {`${errors.QRPhoto.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostelBlock">Hostel Block</Label>
              <Input
                {...register("hostelBlock")}
                id="email"
                type="text"
                placeholder="A1"
              />
              {errors.hostelBlock && (
                <p className="text-red-500 text-sm">
                  {`${errors.hostelBlock.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostelRoom">Room no</Label>
              <Input
                {...register("hostelRoom")}
                id="password"
                type="text"
                placeholder="319"
              />
              {errors.hostelRoom && (
                <p className="text-red-500 text-sm">
                  {`${errors.hostelRoom.message}`}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleName">Vehicle Name</Label>
              <Input
                {...register("vehicleName")}
                id="password"
                type="text"
                placeholder="Honda Activa 6G"
              />
              {errors.vehicleName && (
                <p className="text-red-500 text-sm">
                  {`${errors.vehicleName.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="messageToRenter">Message To Renters</Label>
              <Textarea
                {...register("messageToRenter")}
                placeholder="This message will be displayed to renter while booking vehicle."
              />
              {errors.messageToRenter && (
                <p className="text-red-500 text-sm">
                  {`${errors.messageToRenter.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Fuel Type</Label>
              <Select
                defaultValue="petrol"
                onValueChange={(value) => setFuelType(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="cycle">Cycle</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-main hover:bg-mainhover"
              >
                Verify
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

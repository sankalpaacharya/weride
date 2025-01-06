"use client";
import React, { useState } from "react";
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
} from "@/lib/schemas/ownerIdentitySchema";
import { ownerIdentityAction } from "@/lib/actions/ownerIdentifyForm";
import toast from "react-hot-toast";

export default function OwnerForm({ isPending }: { isPending: boolean }) {
  const [fuelType, setFuelType] = useState("petrol");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TownerIdentitySchema>({
    resolver: zodResolver(ownerIdentitySchema),
  });

  const submitForm = async (data: TownerIdentitySchema) => {
    if (
      fuelType == "petrol" ||
      fuelType == "cycle" ||
      fuelType == "electric" ||
      fuelType == "diesel"
    ) {
      data.fuelType = fuelType;
    }
    const ownerFormData = new FormData();
    ownerFormData.append("collegeIDPhoto", data.collegeIDPhoto[0]);
    ownerFormData.append("hostelIDPhoto", data.hostelIDPhoto[0]);
    ownerFormData.append("QRPhoto", data.QRPhoto[0]);
    ownerFormData.append("profilePhoto", data.profilePhoto[0]);
    ownerFormData.append("vehiclePhotoFront", data.vehiclePhotoFront[0]);
    ownerFormData.append("vehiclePhotoBack", data.vehiclePhotoBack[0]);
    ownerFormData.append("vehiclePhotoSide", data.vehiclePhotoSide[0]);
    ownerFormData.append("drivingLiscencePhoto", data.drivingLiscencePhoto[0]);
    ownerFormData.append("hostelBlock", data.hostelBlock);
    ownerFormData.append("hostelRoom", data.hostelRoom);
    ownerFormData.append("vehicleName", data.vehicleName);
    ownerFormData.append("messageToRenter", data.messageToRenter);
    ownerFormData.append("collegeID", data.messageToRenter);
    ownerFormData.append("rollno", data.rollno);
    ownerFormData.append("fuelType", fuelType);
    ownerFormData.append("vehicleDescription", data.vehicleDescription);
    const response = await ownerIdentityAction(ownerFormData);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    if (response.success) {
      toast.success(response.success);
      return;
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(submitForm)}>
      <Card className="mx-auto max-w-sm md:max-w-md mb-10 md:w-[100rem]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {isPending
              ? "⏳Wait!, Your Account is Being Reviewed"
              : "Owner Identity Verification"}
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
                <span className="text-xs mx-1 text-red-500">200KB</span>
              </Label>
              <Input
                disabled={isPending}
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
                <span className="text-xs mx-1 text-red-500">200KB</span>
              </Label>
              <Input
                disabled={isPending}
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
              <span className="text-xs mx-1 text-red-500">200KB</span>
              <Input
                disabled={isPending}
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
              <Label htmlFor="vehiclePhoto">Vehicle Photo- Front View</Label>
              <span className="text-xs mx-1 text-red-500">200KB</span>
              <Input
                disabled={isPending}
                {...register("vehiclePhotoFront")}
                id="password"
                type="file"
                placeholder="319"
              />
              {errors.vehiclePhotoFront && (
                <p className="text-red-500 text-sm">
                  {`${errors.vehiclePhotoFront.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehiclePhoto">Vehicle Photo- Side View</Label>
              <span className="text-xs mx-1 text-red-500">200KB</span>
              <Input
                disabled={isPending}
                {...register("vehiclePhotoSide")}
                id="password"
                type="file"
                placeholder="319"
              />
              {errors.vehiclePhotoSide && (
                <p className="text-red-500 text-sm">
                  {`${errors.vehiclePhotoSide.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehiclePhoto">Vehicle Photo- Back View</Label>
              <span className="text-xs mx-1 text-red-500">200KB</span>
              <Input
                disabled={isPending}
                {...register("vehiclePhotoBack")}
                id="password"
                type="file"
                placeholder="319"
              />
              {errors.vehiclePhotoBack && (
                <p className="text-red-500 text-sm">
                  {`${errors.vehiclePhotoBack.message}`}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="QRPhoto">QR Photo for payment</Label>
              <span className="text-xs mx-1 text-red-500">200KB</span>
              <Input
                disabled={isPending}
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
              <Label htmlFor="Driving Liscence">Driving Liscence</Label>
              <span className="text-xs mx-1 text-red-500">200KB</span>
              <Input
                disabled={isPending}
                {...register("drivingLiscencePhoto")}
                id="drivingLiscence"
                type="file"
                placeholder="319"
              />
              {errors.drivingLiscencePhoto && (
                <p className="text-red-500 text-sm">
                  {`${errors.drivingLiscencePhoto.message}`}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hostelBlock">Hostel Block</Label>
              <Input
                disabled={isPending}
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
                disabled={isPending}
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
              <Label htmlFor="hostelRoom">Roll no</Label>
              <Input
                disabled={isPending}
                {...register("rollno")}
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
                disabled={isPending}
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
              <div className="space-y-2">
                <Label htmlFor="messageToRenter">Vehicle Description</Label>
                <Textarea
                  disabled={isPending}
                  {...register("vehicleDescription")}
                  placeholder="write the vehicle description, min 100 characters"
                />
                {errors.vehicleDescription && (
                  <p className="text-red-500 text-sm">
                    {`${errors.vehicleDescription.message}`}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="messageToRenter">Message To Renters</Label>
              <Textarea
                disabled={isPending}
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
                disabled={isPending}
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
                disabled={isSubmitting || isPending}
                type="submit"
                className="w-full bg-main hover:bg-mainhover"
              >
                {isPending ? "Waiting for Verification" : "Verify"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

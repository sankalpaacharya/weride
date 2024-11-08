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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  renterIdentitySchema,
  TrenterIdentitySchema,
} from "@/app/schemas/renterIdentitySchema";
import { renterFormAction } from "@/app/actions";

export default function RenterForm({
  isPending: formState = false,
}: {
  isPending: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrenterIdentitySchema>({
    resolver: zodResolver(renterIdentitySchema),
  });
  const [isPending, setIsPending] = useState(formState);
  const submitForm = async (data: TrenterIdentitySchema) => {
    try {
      const formData = new FormData();

      if (data.collegeIDPhoto?.[0]) {
        formData.append("collegeIDPhoto", data.collegeIDPhoto[0]);
      }
      if (data.hostelIDPhoto?.[0]) {
        formData.append("hostelIDPhoto", data.hostelIDPhoto[0]);
      }
      if (data.drivingLicencePhoto?.[0]) {
        formData.append("drivingLicencePhoto", data.drivingLicencePhoto[0]);
      }
      if (data.profilePhoto?.[0]) {
        formData.append("profilePhoto", data.profilePhoto[0]);
      }

      formData.append("hostelBlock", data.hostelBlock);
      formData.append("hostelRoom", data.hostelRoom);
      formData.append("rollno", data.rollno);

      const response = await renterFormAction(formData);

      if (response.error) {
        console.error(response.error);
        return;
      }
      if (response.sucess) {
        setIsPending(true);
        return;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Card className="mx-auto max-w-md md:w-[100rem]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {isPending
              ? "⏳Wait!, Your Account is Being Reviewed"
              : "Renter Identity Verification"}
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
                disabled={isPending}
                {...register("collegeIDPhoto")}
                id="collegeIDPhoto"
                type="file"
                placeholder="319"
                accept="image/*"
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
                disabled={isPending}
                {...register("hostelIDPhoto")}
                id="hostelIDPhoto"
                type="file"
                placeholder="319"
                accept="image/*"
              />
              {errors.hostelIDPhoto && (
                <p className="text-red-500 text-sm">
                  {`${errors.hostelIDPhoto.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="drivingLicencePhoto">
                Driving Licence Photo (Both Side)
              </Label>
              <Input
                disabled={isPending}
                {...register("drivingLicencePhoto")}
                id="drivingLicencePhoto"
                type="file"
                placeholder="319"
                accept="image/*"
              />
              {errors.drivingLicencePhoto && (
                <p className="text-red-500 text-sm">
                  {`${errors.drivingLicencePhoto.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Profile Photo</Label>
              <Input
                disabled={isPending}
                {...register("profilePhoto")}
                id="profilePhoto"
                type="file"
                placeholder="319"
                accept="image/*"
              />
              {errors.profilePhoto && (
                <p className="text-red-500 text-sm">
                  {`${errors.profilePhoto.message}`}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hostelBlock">Hostel Block</Label>
              <Input
                disabled={isPending}
                {...register("hostelBlock")}
                id="hostelBlock"
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
                id="hostelRoom"
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
              <Label htmlFor="rollno">Roll no</Label>
              <Input
                disabled={isPending}
                {...register("rollno")}
                id="rollno"
                type="text"
                placeholder="22BCP890"
              />
              {errors.rollno && (
                <p className="text-red-500 text-sm">
                  {`${errors.rollno?.message}`}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-main hover:bg-mainhover"
              >
                {isPending ? "Waiting for verification" : "Verify"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

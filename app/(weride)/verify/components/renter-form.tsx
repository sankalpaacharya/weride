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
} from "@/lib/schemas/IdentificationFormSchema";
import { renterFormAction } from "@/lib/actions/renterIdentifyForm";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { image_compress_webp } from "../utils/imageProcessor";

// remove hostel id and other fields
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
        formData.append(
          "collegeIDPhoto",
          (await image_compress_webp(data.collegeIDPhoto[0])) as Blob,
        );
      }
      if (data.drivingLicencePhoto?.[0]) {
        formData.append(
          "drivingLicencePhoto",
          (await image_compress_webp(data.drivingLicencePhoto[0])) as Blob,
        );
      }
      const response = await renterFormAction(formData);

      if (response.error) {
        toast.error(response.error);
        return;
      }
      if (response.success) {
        setIsPending(true);
        toast.success(response.success);
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
            <br />
            😩 We Know it's annoying to fill forms but it's just for your and
            the bike owner's safety 💂
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="collegeIDPhoto">
                College ID Card Photo (Front){" "}
              </Label>
              <Input
                disabled={isPending}
                {...register("collegeIDPhoto")}
                id="collegeIDPhoto"
                type="file"
                accept="image/*"
              />
              {errors.collegeIDPhoto && (
                <p className="text-red-500 text-sm">
                  {`${errors.collegeIDPhoto.message}`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="drivingLicencePhoto">
                Driving Licence Photo (Front)
              </Label>
              <Input
                disabled={isPending}
                {...register("drivingLicencePhoto")}
                id="drivingLicencePhoto"
                type="file"
                accept="image/*"
              />
              {errors.drivingLicencePhoto && (
                <p className="text-red-500 text-sm">
                  {`${errors.drivingLicencePhoto.message}`}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-main hover:bg-mainhover"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : null}
                {isPending ? "Waiting for verification" : "Verify"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

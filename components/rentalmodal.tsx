"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import toast from "react-hot-toast";
import { checkOutSchema, TcheckOutSchema } from "@/lib/schemas/checkOutSchema";
import { rentCheckoutAction } from "@/lib/actions/rentCheckout";

interface RentalModal {
  children: ReactNode;
  formData: TcheckOutSchema | {};
}

export default function RentalModal({ children, formData }: RentalModal) {
  const [selectedTab, setSelectedTab] = useState("terms");
  const [isTosAccepted, setIsTosAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleNextClick = () => {
    if (!isTosAccepted) {
      toast.error("Please accept the terms of service");
      return;
    }
    setSelectedTab("checkout");
  };

  const submitForm = async (data: TcheckOutSchema | {}) => {
    console.log(data);
    const result = checkOutSchema.safeParse(data);
    console.log(result);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    const response = await rentCheckoutAction(result.data);
    if (response?.error) {
      toast.error(response.error);
      setSelectedTab("terms");
      return;
    }
    if (response.success) {
      toast.success(response.success);
      setIsLoading(false);
      window.location.href = "/ride";
      return;
    }
  };

  useEffect(() => {
    if (selectedTab === "checkout") {
      submitForm(formData);
    }
  }, [selectedTab]);

  const onModalChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedTab("terms");
      setIsTosAccepted(false);
    }
  };

  const renderContent = () => {
    if (selectedTab === "terms") {
      return (
        <div>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription asChild>
            <div>
              <ScrollArea className="h-[500px] rounded-md p-4">
                <div className="space-y-2 mt-5">
                  <span className="text-md font-bold text-gray-800">
                    Vehicle Rental Agreement
                  </span>
                  <div>
                    <span className="font-bold">3.1. Rental Duration:</span> You
                    as a rider agree to rent the vehicle for the duration agreed
                    upon with the vehicle owner. Any extension of time may incur
                    late fees as per our Late Fee Policy{" "}
                    <Link className="underline" href="/tos">
                      (read late fees policy)
                    </Link>
                  </div>
                  <div>
                    <span className="font-bold">3.2. Rental Fees:</span> You
                    agree to pay the hourly rental fee as set by the vehicle
                    owner. The full amount is due at the end of the rental
                    period.
                  </div>
                  <div>
                    <span className="font-bold">
                      3.3. Petrol Refill Requirement:
                    </span>{" "}
                    Riders are responsible for refueling as needed during the
                    rental period. Refill costs, supported by proof (e.g., a
                    receipt or fuel meter photo), will be deducted from the
                    total rental cost.
                  </div>
                </div>
                <div className="space-y-2 mt-5">
                  <span className="text-md font-bold text-gray-800">
                    Vehicle Condition
                  </span>
                  <div>
                    <span className="font-bold">5.1. Inspection:</span> Both the
                    rider and the owner must inspect the vehicle before the
                    rental period begins, noting any pre-existing damage.
                  </div>
                  <div>
                    <span className="font-bold">5.2. Damage or Loss:</span>{" "}
                    Riders bear full responsibility for any damage or loss
                    incurred during the rental period. In the event of damage,
                    you must compensate the vehicle owner for the cost of
                    repairs or replacement.
                  </div>
                  <div>
                    <span className="font-bold">5.3. Cleanliness:</span> The
                    vehicle must be returned in a clean condition. A cleaning
                    fee of Rs 200 will be charged if the vehicle is returned
                    excessively dirty.
                  </div>
                </div>
                <div className="space-y-2 mt-5">
                  <span className="text-md font-bold text-gray-800">
                    Reckless Driving Policy
                  </span>
                  <div>
                    Reckless driving is strictly prohibited while using any
                    vehicle rented through our platform. This includes, but is
                    not limited to, excessive speeding, aggressive maneuvers,
                    driving under the influence, or any dangerous driving
                    behavior. Reports or evidence of reckless driving may result
                    in immediate termination of the rental agreement, forfeiture
                    of any deposits, and a permanent ban from our platform.{" "}
                    <Link className="underline" href="/tos">
                      (read more)
                    </Link>
                  </div>
                </div>
                <div className="flex items-center my-5 space-x-2">
                  <Checkbox
                    id="terms"
                    checked={isTosAccepted}
                    onCheckedChange={(checked) =>
                      setIsTosAccepted(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have read all the terms and conditions and I accept it.
                  </label>
                </div>
              </ScrollArea>
            </div>
          </DialogDescription>
          <div className="flex justify-end mt-5">
            <Button
              type="button"
              disabled={!isTosAccepted}
              onClick={handleNextClick}
            >
              Next
            </Button>
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div>
          <DialogTitle>Hold Tight, Your Ride is Almost Ready...</DialogTitle>
          <DialogDescription asChild>
            <div className="h-[400px] flex flex-col items-center justify-center">
              <Image
                src="/images/animation.gif"
                unoptimized
                className="mt-10 h-[20rem]"
                alt="Loading animation"
                width={320}
                height={320}
                priority
              />
              Warming Up the Wheels for You..
            </div>
          </DialogDescription>
        </div>
      );
    }

    return (
      <div>
        <DialogTitle>Rental Confirmation</DialogTitle>
        <DialogDescription className="flex flex-col items-center justify-center h-[400px]">
          <Image
            src="/images/tick_animation.gif"
            alt="tick"
            width={100}
            height={100}
          />
          <span className="text-xl font-semibold text-center">
            Your rental is confirmed!
          </span>
          <span className="text-center mt-2">
            Thank you for renting with us. Enjoy your ride!
          </span>
        </DialogDescription>
        <div className="flex justify-end mt-5">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </div>
      </div>
    );
  };

  return (
    <Dialog onOpenChange={onModalChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="px-3">{renderContent()}</DialogContent>
    </Dialog>
  );
}

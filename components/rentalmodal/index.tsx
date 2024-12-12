"use client";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

interface RentalModal {
  children: ReactNode;
}

export default function RentalModal({ children }: RentalModal) {
  const [selectedTab, setSelectedTab] = useState("terms");
  const [isTosAccepted, setIsTosAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNextClick = () => {
    if (!isTosAccepted) {
      toast.error("Please accept the terms of service");
      return;
    }
    setSelectedTab("checkout");
  };

  const onModalChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedTab("terms");
      setIsTosAccepted(false);
    }
  };

  return (
    <Dialog onOpenChange={onModalChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="px-3">
        {selectedTab === "terms" ? (
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
                      <span className="font-bold">3.1. Rental Duration:</span>{" "}
                      You as a rider agree to rent the vehicle for the duration
                      agreed upon with the vehicle owner. Any extension of time
                      will result in late fees charge levied on the rider{" "}
                      <Link className="underline" href="/">
                        (read late fees policy)
                      </Link>
                    </div>
                    <div>
                      <span className="font-bold">3.2. Rental Fees:</span> You
                      agree to pay the hourly rental fee as set by the vehicle
                      owner. The rental fee must be paid in full before the
                      rental period begins.
                    </div>
                    <div>
                      <span className="font-bold">
                        3.3. Petrol Refill Requirement:
                      </span>{" "}
                      Riders must refill the vehicle to the petrol level
                      specified by the owner (pre-decided) before returning the
                      vehicle. Failure to do so will result in additional
                      charges.
                    </div>
                  </div>
                  <div className="space-y-2 mt-5">
                    <span className="text-md font-bold text-gray-800">
                      Vehicle Condition
                    </span>
                    <div>
                      <span className="font-bold">5.1. Inspection:</span> Both
                      the Rider and the Owner must inspect the vehicle before
                      the rental period begins, noting any pre-existing damage.
                    </div>
                    <div>
                      <span className="font-bold">5.2. Damage or Loss:</span>{" "}
                      Riders are responsible for any damage or loss that occurs
                      during the rental period. In case of any damage, the rider
                      agrees to compensate the vehicle owner for the cost of
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
                      vehicle rented through our platform. While weride does not
                      have direct control over the actions of users, any reports
                      or evidence of reckless driving may result in immediate
                      termination of the rental agreement, forfeiture of any
                      deposits, and a permanent ban from our platform.{" "}
                      <Link className="underline" href="/">
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
                type="submit"
                disabled={!isTosAccepted}
                onClick={handleNextClick}
              >
                Next
              </Button>
            </div>
          </div>
        ) : isLoading ? (
          <div>
            <DialogTitle>Hold Tight, Your Ride is Almost Ready...</DialogTitle>
            <DialogDescription asChild>
              <div className="h-[400px] flex flex-col items-center justify-center">
                <Image
                  src="/images/animation.gif"
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
        ) : (
          <div>
            <DialogTitle>Rental Confirmation</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col items-center justify-center h-[400px]">
                <CheckCircle size={64} className="text-green-500 mb-4" />
                <p className="text-xl font-semibold text-center">
                  Your rental is confirmed!
                </p>
                <p className="text-center mt-2">
                  Thank you for renting with us. Enjoy your ride!
                </p>
              </div>
            </DialogDescription>
            <div className="flex justify-end mt-5">
              <Button onClick={() => onModalChange(false)}>Close</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

"use client";
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
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface RentalModalProps {
    children: ReactNode;
}

const TermsAndConditions = ({
    isTosAccepted,
    onTosToggle,
    onNextClick,
}: {
    isTosAccepted: boolean;
    onTosToggle: () => void;
    onNextClick: () => void;
}) => (
    <>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogDescription>
            <ScrollArea className="h-[500px] rounded-md p-4">
                <ul className="space-y-2 mt-5">
                    <p className="text-md font-bold text-gray-800">
                        Vehicle Rental Agreement
                    </p>
                    <li>
                        <span className="font-bold">3.1. Rental Duration:</span> You
                        agree to rent the vehicle for the duration agreed upon with
                        the vehicle owner. Any extension of time will result in late
                        fees charged to the rider{" "}
                        <Link className="underline" href="/">
                            (read late fees policy)
                        </Link>
                    </li>
                    <li>
                        <span className="font-bold">3.2. Rental Fees:</span> You agree
                        to pay the hourly rental fee as set by the vehicle owner. The
                        rental fee must be paid in full before the rental period
                        begins.
                    </li>
                    <li>
                        <span className="font-bold">3.3. Petrol Refill Requirement:</span>{" "}
                        Riders must refill the vehicle to the petrol level specified by
                        the owner before returning the vehicle. Failure to do so will
                        result in additional charges.
                    </li>
                </ul>
                <ul className="space-y-2 mt-5">
                    <p className="text-md font-bold text-gray-800">Vehicle Condition</p>
                    <li>
                        <span className="font-bold">5.1. Inspection:</span> Both the
                        Rider and the Owner must inspect the vehicle before the rental
                        period begins, noting any pre-existing damage.
                    </li>
                    <li>
                        <span className="font-bold">5.2. Damage or Loss:</span> Riders
                        are responsible for any damage or loss that occurs during the
                        rental period. In case of any damage, the rider agrees to
                        compensate the vehicle owner for the cost of repairs or
                        replacement.
                    </li>
                    <li>
                        <span className="font-bold">5.3. Cleanliness:</span> The vehicle
                        must be returned in a clean condition. A cleaning fee of Rs 200
                        will be charged if the vehicle is returned excessively dirty.
                    </li>
                </ul>
                <ul className="space-y-2 mt-5 list-disc">
                    <p className="text-md font-bold text-gray-800">
                        Reckless Driving Policy
                    </p>
                    <p>
                        Reckless driving is strictly prohibited while using any vehicle
                        rented through our platform. Any reports or evidence of reckless
                        driving may result in immediate termination of the rental
                        agreement, forfeiture of any deposits, and a permanent ban from
                        our platform. Additionally, renters are fully responsible for
                        any legal consequences, fines, penalties, or damages resulting
                        from reckless driving{" "}
                        <Link className="underline" href="/">
                            (read more)
                        </Link>
                    </p>
                </ul>
                <div className="flex items-center my-5 space-x-2">
                    <Checkbox
                        checked={isTosAccepted}
                        onClick={onTosToggle}
                        id="terms"
                    />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I have read all the terms of service and I accept it.
                    </label>
                </div>
            </ScrollArea>
        </DialogDescription>
        <div className="flex justify-end mt-5">
            <Button disabled={!isTosAccepted} onClick={onNextClick}>
                Next
            </Button>
        </div>
    </>
);

const VehicleInformation = ({ onNextClick }: { onNextClick: () => void }) => (
    <>
        <DialogTitle>Vehicle Information 🛵</DialogTitle>
        <DialogDescription>
            <ScrollArea className="h-[500px] rounded-md p-4">
                <div className="space-y-4">
                    <VehicleDetail label="Owner" value="Vinit Thakkar" />
                    <VehicleDetail label="Vehicle Model" value="Honda Activa 6G" />
                    <VehicleDetail label="Fuel Type" value="Petrol" />
                    <VehicleDetail label="Fuel Efficiency" value="45 km/l" />
                    <VehicleDetail label="Top Speed" value="85 km/h" />
                    <VehicleDetail label="Seating Capacity" value="2 persons" />
                    <VehicleDetail label="Features" value="Helmet included" />
                    <VehicleDetail label="Insurance" value="Covered" />
                    <VehicleDetail
                        label="Rental Terms"
                        value="Minimum 2 hours, No off-road"
                    />
                    <OwnerMessage />
                </div>
            </ScrollArea>
        </DialogDescription>
        <div className="flex justify-end mt-5">
            <Button onClick={onNextClick}>Next</Button>
        </div>
    </>
);

const VehicleDetail = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between">
        <span className="font-semibold text-gray-700">{label}:</span>
        <span className="text-gray-600">{value}</span>
    </div>
);

const OwnerMessage = () => (
    <div className="flex justify-center">
        <div className="gap-5 flex p-3 w-full rounded-lg bg-[#388bc1] text-white">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold">Owner Message</p>
                <p className="font-normal">
                    Please ride carefully, don&apos;t damage the vehicle. Enjoy your
                    ride.
                </p>
            </div>
        </div>
    </div>
);

const RideInformation = ({
    hours,
    onHourChange,
    onNextClick,
}: {
    hours: number;
    onHourChange: (hours: number) => void;
    onNextClick: () => void;
}) => (
    <>
        <DialogTitle>Ride Information</DialogTitle>
        <DialogDescription className="flex flex-col justify-between">
            <ScrollArea className="h-[500px] rounded-md p-4">
                <div className="flex flex-col gap-5 px-1">
                    <InputField label="Destination Location" />
                    <SliderField
                        label={`Hours (${hours})`}
                        value={hours}
                        onValueChange={onHourChange}
                    />
                    <InputField label="Emergency Contact" type="number" />
                    <PriceNegotiation hours={hours} />
                </div>
            </ScrollArea>
            <div className="px-4 flex gap-1">
                <p className="text-md font-medium">Price:</p>
                <p className="text-md">₹{100 * hours}</p>
            </div>
        </DialogDescription>
        <div className="flex gap-2 justify-end mt-5">
            <Button onClick={onNextClick}>Rent Now</Button>
        </div>
    </>
);

const InputField = ({ label, type = "text" }: { label: string; type?: string }) => (
    <div className="space-y-1">
        <Label>{label}</Label>
        <Input type={type} />
    </div>
);

const SliderField = ({
    label,
    value,
    onValueChange,
}: {
    label: string;
    value: number;
    onValueChange: (value: number) => void;
}) => (
    <div className="space-y-2">
        <Label>{label}</Label>
        <Slider
            minStepsBetweenThumbs={1}
            onValueChange={(hour) => onValueChange(Math.max(hour[0], 1))}
            defaultValue={[1]}
            max={5}
            step={1}
        />
    </div>
);

const PriceNegotiation = ({ hours }: { hours: number }) => (
    <div className="space-y-3">
        <Label>Negotiate Price</Label>
        <div className="flex gap-5 items-center flex-wrap">
            {[10, 20, 30].map((priceReduction) => (
                <Button
                    key={priceReduction}
                    onClick={() => toast.success(`Price Reduced by ₹${priceReduction}`)}
                >
                    {`₹${100 * hours - priceReduction}`}
                </Button>
            ))}
        </div>
    </div>
);

export function RentalModal({ children }: RentalModalProps) {
    const [step, setStep] = useState(1);
    const [hours, setHours] = useState(1);
    const [isTosAccepted, setIsTosAccepted] = useState(false);

    const handleNextClick = () => setStep(step + 1);

    const handleTosToggle = () => setIsTosAccepted(!isTosAccepted);

    const handleHourChange = (value: number) => setHours(value);

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                {step === 1 && (
                    <TermsAndConditions
                        isTosAccepted={isTosAccepted}
                        onTosToggle={handleTosToggle}
                        onNextClick={handleNextClick}
                    />
                )}
                {step === 2 && <VehicleInformation onNextClick={handleNextClick} />}
                {step === 3 && (
                    <RideInformation
                        hours={hours}
                        onHourChange={handleHourChange}
                        onNextClick={handleNextClick}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}

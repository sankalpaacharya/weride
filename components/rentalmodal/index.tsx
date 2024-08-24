"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { ReactNode, useState } from "react"
import toast from "react-hot-toast"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface RentalModal {
    children: ReactNode
}

export default function RentalModal({ children }: RentalModal) {
    const [selectedTab, setSelectedTab] = useState("tab1");
    const [isTosAccepted, setIsTosAccepted] = useState(false);
    const [hours, setHours] = useState<any>(1);
    const handleNextClick = () => {
        if (isTosAccepted === false) {
            toast.error("Accept the terms of service")
            return
        }
        if (selectedTab === "tab1") setSelectedTab("tab2");
        if (selectedTab === "tab2") setSelectedTab("tab3");
    }

    const onModalChange = (isOpen: boolean) => {
        setSelectedTab("tab1");
        setIsTosAccepted(false);

    }
    return (
        <Dialog onOpenChange={onModalChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="px-3">
                <div className="tabs">
                    <div className="tab-content">
                        <div className={`tab  ${selectedTab === "tab1" ? "active" : ""}`}>
                            <DialogTitle>Terms and Conditions</DialogTitle>
                            <DialogDescription>
                                <ScrollArea className="h-[500px] rounded-md  p-4">
                                    <ul className="space-y-2 mt-5">
                                        <p className="text-md font-bold text-gray-800">Vehicle Rental Agreement</p>
                                        <li className=""> <span className="font-bold">3.1. Rental Duration:</span>  You as a rider agree to rent the vehicle for the duration agreed upon with the vehicle owner. Any extension of time will result in late fees charge levied on the rider <Link className="underline" href={'/'}>(read late fees policy)</Link></li>
                                        <li className=""> <span className="font-bold">3.2. Rental Fees:</span> You agree to pay the hourly rental fee as set by the vehicle owner. The rental fee must be paid in full before the rental period begins.</li>
                                        <li className=""> <span className="font-bold">3.3. Petrol Refill Requirement:</span> Riders must refill the vehicle to the petrol level specified by the owner(pre-decided) before returning the vehicle. Failure to do so will result in additional charges.</li>
                                    </ul>
                                    <ul className="space-y-2 mt-5">
                                        <p className="text-md font-bold text-gray-800">Vehicle Condition
                                        </p>
                                        <li className=""> <span className="font-bold">5.1. Inspection:</span> Both the Rider and the Owner must inspect the vehicle before the rental period begins, noting any pre-existing damage.</li>
                                        <li className=""> <span className="font-bold">5.2. Damage or Loss:</span> Riders are responsible for any damage or loss that occurs during the rental period. In case of any damage, the rider agrees to compensate the vehicle owner for the cost of repairs or replacement.</li>
                                        <li className=""> <span className="font-bold">5.3. Cleanliness:</span> The vehicle must be returned in a clean condition. A cleaning fee of Rs 200 will be charged if the vehicle is returned excessively dirty.</li>
                                    </ul>
                                    <ul className="space-y-2 mt-5 list-disc">
                                        <p className="text-md font-bold text-gray-800">Reckless Driving Policy
                                        </p>
                                        <p>Reckless driving is strictly prohibited while using any vehicle rented through our platform.
                                            While weride does not have direct control over the actions of users, any reports or evidence of reckless driving may result in immediate termination of the rental agreement, forfeiture of any deposits, and a permanent ban from our platform. Additionally, renters are fully responsible for any legal consequences, fines, penalties, or damages resulting from reckless driving
                                            <Link className="underline" href="/"> (read more).</Link>
                                        </p>
                                    </ul>
                                    <div className="flex items-center my-5 space-x-2">
                                        <Checkbox onClick={() => setIsTosAccepted(!isTosAccepted)} id="terms" />
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
                                <Button disabled={!isTosAccepted} className="" onClick={handleNextClick}>Next</Button>
                            </div>
                        </div>
                        <div className={`tab ${selectedTab === "tab2" ? "active" : ""}`}>
                            <DialogTitle>Vehicle Information 🛵</DialogTitle>
                            <DialogDescription>
                                <ScrollArea className="h-[500px] rounded-md  p-4">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-700">Owner:</span>
                                            <span className="text-gray-600">Vinit Thakkar</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-700">Vehicle Model:</span>
                                            <span className="text-gray-600">Honda Activa 6G</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-700">Fuel Type:</span>
                                            <span className="text-gray-600">Petrol</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-700">Fuel Efficiency:</span>
                                            <span className="text-gray-600">45 km/l</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-700">Top Speed:</span>
                                            <span className="text-gray-600">85 km/h</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-700">Seating Capacity:</span>
                                            <span className="text-gray-600">2 persons</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-700">Features:</span>
                                            <span className="text-gray-600">Helmet included</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-700">Insurance:</span>
                                            <span className="text-gray-600">Covered</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-700">Rental Terms:</span>
                                            <span className="text-gray-600">Minimum 2 hours, No off-road</span>
                                        </div>

                                        <div className="flex justify-center ">
                                            <div className="gap-5 flex p-3 w-full rounded-lg bg-[#388bc1] text-white">
                                                <div className="">
                                                    <Avatar>
                                                        <AvatarImage src="https://github.com/shadcn.png" />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div>
                                                    <p className="font-bold">Owner Message</p>
                                                    <p className="font-normal ">Please ride Carefully, don't damage the vehicle. Enjoy your ride. There is nothing to say so fuck off</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>
                            </DialogDescription>
                            <div className="flex justify-end mt-5">
                                <Button className="" onClick={handleNextClick}>Next</Button>
                            </div>
                        </div>
                        <div className={`tab ${selectedTab === "tab3" ? "active" : ""}`}>
                            <DialogTitle>Ride Information</DialogTitle>
                            <DialogDescription className="flex flex-col justify-between">
                                <ScrollArea className="h-[500px] rounded-md p-4">
                                    <div className="flex flex-col">
                                        <div className="flex flex-col gap-5 px-1">
                                            <div className="space-y-1">
                                                <Label>Destination Location</Label>
                                                <Input></Input>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Hours ({hours})</Label>
                                                <Slider
                                                    className=""
                                                    minStepsBetweenThumbs={1}
                                                    onValueChange={(hour) => setHours(Math.max(hour[0], 1))}
                                                    defaultValue={[1]}
                                                    max={5}
                                                    step={1}
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <Label>Emergency Contact</Label>
                                                <Input type="number"></Input>
                                            </div>
                                            <div className="space-y-3">
                                                <Label>Negotiate Price</Label>
                                                <div className="flex gap-5 items-center flex-wrap">
                                                    <div className="p-3 cursor-pointer font-bold rounded-lg text-white shadow-lg bg-main">{(100 * hours) - 10}</div>
                                                    <div className="p-3 cursor-pointer font-bold rounded-lg text-white shadow-lg bg-main">{(100 * hours) - 20}</div>
                                                    <div className="p-3 cursor-pointer font-bold rounded-lg text-white shadow-lg bg-main">{(100 * hours) - 30}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>
                                <div className="px-4 flex gap-1">
                                    <p className="text-md font-medium">Price:</p>
                                    <p className="text-md">₹{100 * hours}</p>
                                </div>
                            </DialogDescription>
                            <div className="flex gap-2 justify-end mt-5">
                                <Button className="" onClick={handleNextClick}>Rent Now</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

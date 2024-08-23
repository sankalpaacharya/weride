"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

import Link from "next/link"
import { ReactNode, useState } from "react"

interface RentalModal {
    children: ReactNode
}

export default function RentalModal({ children }: RentalModal) {
    const [selectedTab, setSelectedTab] = useState("tab1");

    const handleNextClick = () => {
        if (selectedTab === "tab1") setSelectedTab("tab2");
        if (selectedTab === "tab2") setSelectedTab("tab3");
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="px-3">
                <div className="tabs">
                    <div className="tab-content">
                        <div className={`tab  ${selectedTab === "tab1" ? "active" : ""}`}>
                            <DialogTitle>Terms of Service</DialogTitle>
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

                                </ScrollArea>
                            </DialogDescription>
                            <div className="flex justify-end mt-5">
                                <Button className="bg-[#2874A6] hover:bg-[#388bc1]" onClick={handleNextClick}>Next</Button>
                            </div>
                        </div>
                        <div className={`tab ${selectedTab === "tab2" ? "active" : ""}`}>
                            <DialogTitle>Terms of Service 2</DialogTitle>
                            <DialogDescription>Content for tab 2</DialogDescription>
                            <Button onClick={handleNextClick}>Next</Button>
                        </div>
                        <div className={`tab ${selectedTab === "tab3" ? "active" : ""}`}>
                            <DialogTitle>Terms of Service 3</DialogTitle>
                            <DialogDescription>Content for tab 3</DialogDescription>
                            <Button onClick={handleNextClick}>Finish</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

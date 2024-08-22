import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function page() {
    return (
        <div className='w-full flex  flex-col items-center py-10'>
            <div className='flex flex-col gap-3 text-center px-3'>
                <h2 className='md:text-3xl text-2xl font-bold text-gray-700'>Do you have any Questions ?</h2>
                <p className='text-gray-600 md:text-lg text-sm font-medium'>We have answers(well, most of the times!)</p>
                <p className='text-gray-700 md:text-md text-sm'>Below you will find the most common questions asked on WeRide. Also, please feel free to
                    reach out to us if you have any further queries.
                </p>
            </div>
            <div className='md:w-[70%] w-[90%] mt-10'>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is this platform from the PDEU?</AccordionTrigger>
                        <AccordionContent>
                            No, this platform is not officially from PDEU. It is a private initiative developed with the specific goal of benefiting PDEU students. Our mission is to provide a convenient and secure way for students to rent vehicles within the campus community, ensuring ease of transportation.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What if my vehicle gets damaged by the renter?</AccordionTrigger>
                        <AccordionContent>
                            In the event that the vehicle is damaged during the rental period, the rider is responsible for covering the cost of repairs or, if necessary, replacement. We understand that accidents can happen, and we encourage open communication to resolve any issues fairly. Our goal is to ensure a positive experience for both the rider and the vehicle owner.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How is the price calculated ?</AccordionTrigger>
                        <AccordionContent>
                            You agree to pay the hourly rental fee as set by the vehicle owner. To ensure a smooth rental process, we kindly ask that the full rental fee be paid in advance, before the rental period begins.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>How can I register myself?</AccordionTrigger>
                        <AccordionContent>
                            After signing up and succesful creation of your weride account, you have two options, either put your vehicle on rent or rent vehicle for yourself.

                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Do I need driving license to rent a vehicle?</AccordionTrigger>
                        <AccordionContent>
                            Yes, you need to have a driving license for renting a vehicle. Please refer to the Terms & Conditions for more information.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

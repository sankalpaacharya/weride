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
                <h2 className='md:text-3xl text-2xl font-bold text-gray-700'>Do you Have any Questions ?</h2>
                <p className='text-gray-600 md:text-lg text-sm font-medium'>We have answers(well, most of the times!)</p>
                <p className='text-gray-700 md:text-md text-sm'>Below you will find the most common questions asked on WeRide. Also, please feel free to
                    reach out to us if you have any further query
                </p>
            </div>
            <div className='md:w-[70%] w-[90%] mt-10'>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is this platform from the PDEU?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What if my vechiel get damage by the renter?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It comes with default styles that matches the other
                            components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How Price is calculated ?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can disable it if you
                            prefer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>How to register my account?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can disable it if you
                            prefer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Do I need driving lisence to rent a vechiel</AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can disable it if you
                            prefer.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

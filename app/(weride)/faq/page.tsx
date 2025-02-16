import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function page() {
  return (
    <div className="w-full flex flex-col items-center py-10">
      <div className="flex flex-col gap-3 text-center px-3">
        <h2 className="md:text-3xl text-2xl font-bold text-gray-700">
          Do you have any Questions?
        </h2>
        <p className="text-gray-600 md:text-lg text-sm font-medium">
          We have answers (well, most of the time!).
        </p>
        <p className="text-gray-700 md:text-md text-sm">
          Below you will find the most commonly asked questions on Weride. Also,
          feel free to reach out to us if you have any further queries.
        </p>
      </div>
      <div className="md:w-[70%] w-[90%] mt-10">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is this platform from PDEU?</AccordionTrigger>
            <AccordionContent>
              No, this platform is not officially from PDEU. It is a private
              initiative developed with the goal of benefiting PDEU students.
              Our mission is to provide a convenient and secure way for students
              to rent vehicles within the campus community.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What if my vehicle gets damaged by the renter?
            </AccordionTrigger>
            <AccordionContent>
              If the vehicle is damaged during the rental period, the renter is
              responsible for covering the cost of repairs or, if necessary,
              replacement. We encourage open communication to resolve any issues
              fairly to ensure a positive experience for both the renter and the
              vehicle owner.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How is the price calculated?</AccordionTrigger>
            <AccordionContent>
              You agree to pay the hourly rental fee as set by the vehicle
              owner. Additionally, a distance-based charge of ₹2.8 per km will
              be applied. The total amount to be paid will be the sum of both
              charges, and it is paid only after the rental period has ended.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How can I register myself?</AccordionTrigger>
            <AccordionContent>
              After signing up and successfully creating your Weride account,
              you have two options: either list your vehicle for rent or rent a
              vehicle for yourself.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Do I need a driving license to rent a vehicle?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you need a valid driving license to rent a vehicle. Please
              refer to the Terms & Conditions for more details.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              Is Weride going to provide a helmet?
            </AccordionTrigger>
            <AccordionContent>
              Renters should try their best to arrange helmets themselves. If
              they are unable to do so, Weride will try to arrange one for them,
              but we do not guarantee helmet availability.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>Who is responsible for fuel?</AccordionTrigger>
            <AccordionContent>
              The renter is responsible for refueling the vehicle as needed
              during the rental period. If fuel is refilled, the amount paid by
              the renter at the fuel station will be deducted from the total
              rental amount (hourly + distance-based charges). However, the
              renter must provide proof of the fuel refill (a picture of the
              fuel meter or a bill receipt).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>
              What happens if I return the vehicle late?
            </AccordionTrigger>
            <AccordionContent>
              If you return the vehicle late, a 15-minute buffer will be
              provided beyond the agreed-upon time. After this buffer, a late
              fee will be charged based on the delay. The fee follows an
              increasing pattern, where the charge for each additional hour of
              delay progressively increases.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger>Can I cancel my booking?</AccordionTrigger>
            <AccordionContent>
              Yes, renters can cancel their request within the first 20 minutes
              after placing it. During this time, the owner also has the option
              to accept or reject the request. Once the rental request has been
              accepted and the rental period has begun, cancellation is
              discouraged, though there are no cancellation charges at the
              moment.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-10">
            <AccordionTrigger>
              What if I book a vehicle for 3 hours but only need it for 1 hour?
            </AccordionTrigger>
            <AccordionContent>
              If you initially book a vehicle for a longer duration but decide
              to return it earlier, you will still need to pay the full hourly
              rental amount for the booked duration. However, you will only be
              charged for the actual distance traveled, not for the initially
              estimated distance.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

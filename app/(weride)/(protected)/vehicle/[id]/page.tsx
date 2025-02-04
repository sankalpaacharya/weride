import React from "react";
import BikeGallery from "@/components/bikegallery";
import CheckoutCard from "@/components/checkoutcard";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { FaRegSmileBeam } from "react-icons/fa";
import { PiMedalLight } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getVehicleData } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import UnavailableTimeSlot from "@/components/timeslot";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type FAQItem = {
  question: string;
  answer: string;
};

type BikeProps = {
  title: string;
  description: string;
};

type OwnerProps = {
  name: string;
};

const faqData: FAQItem[] = [
  {
    question: "How long can I rent a bike?",
    answer:
      "You can rent a bike starting from 1 to a maximum of 5 hours after which a late fees charge will be applied on your total amount.",
  },
  {
    question: "How does the payment for the bike rental work?",
    answer:
      "You can pay the total amount for the bike rental to the owner directly through cash or online UPI after the completion of your rental period.",
  },
  {
    question: "How do I contact the Owner?",
    answer:
      "You can contact the owner using the contact details that are provided to you after the booking is confirmed.",
  },
  {
    question: "How can I make sure that the bike is protected against theft?",
    answer:
      "Make sure you are parking the bike in a secure, well lit area or near a busy road for enhanced security. Also, do check that parking is legal in the area.",
  },
];

const BikeInfo: React.FC<BikeProps> = ({ title, description }) => (
  <div className="space-y-2 mt-10">
    <h2 className="text-2xl font-medium">
      {title}|{" "}
      <span className="text-lg text-gray-800">
        Endurace AL 2XS Ultegra Schaltung • Road Bike
      </span>
    </h2>
    <div className="space-y-1">
      <p className="flex gap-2 items-center text-sm text-gray-500">
        <FaLocationDot />
        High Rise
      </p>
      <div className="flex gap-3">
        <p className="flex gap-2 items-center">
          <FaStar className="text-yellow-400" />
          4.8
        </p>
        <p className="underline">0 Reviews</p>
      </div>
    </div>
    <p className="md:w-3/5">
      Beautiful, lightweight carbon racing bike with disc brakes (I don&apos;t
      know the exact weight, but about 7 kg)&apos; frame size 51 (suitable for
      riders between 1.65m and 1.80m tall). The Ultegra 11-speed is versatile,
      so it&apos;s suitable even for steep hills.
    </p>
  </div>
);

const OwnerInfo: React.FC<OwnerProps> = ({ name }) => (
  <div className="md:mt-20 mt-10 flex gap-4">
    <Avatar className="md:w-[5rem] w-[3rem] md:h-[5rem] h-[3rem]">
      <AvatarImage width={200} src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div>
      <h3 className="md:text-xl font-medium">Owner H125</h3>
      <p className="text-sm text-gray-600">Response time &lt;10mins</p>
      <div className="mt-2 flex flex-col md:text-lg font-medium">
        <div className="flex md:flex-row flex-col md:space-x-3">
          <p className="flex gap-2 items-center">
            <FaStar className="text-main" />
            4.8
          </p>
          <p className="flex gap-2 items-center">
            <FaRegSmileBeam className="text-main" />
            Member Since 2023
          </p>
          <p className="flex gap-2 items-center">
            <PiMedalLight className="text-main" />
            Verified
          </p>
        </div>
        <Button className="w-fit mt-3">Profile</Button>
      </div>
    </div>
  </div>
);

async function BikePage({ params }: PageProps) {
  const { id: bikeId } = await params;
  const vehicleResponse = await getVehicleData(bikeId);
  if (vehicleResponse.error || !vehicleResponse.data) {
    redirect("/");
  }
  const vehicleDetails = vehicleResponse.data;

  return (
    <div className="flex justify-center min-h-screen mt-5">
      <div className="container space-y-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <BikeGallery bikeId={bikeId} />
          <CheckoutCard
            bikeId={bikeId}
            ownerId={vehicleDetails.owner_id}
            availability={vehicleDetails.availability}
          />
        </div>
        <div className="">
          <BikeInfo
            title={vehicleDetails.name}
            description={vehicleDetails.description}
          />
          <OwnerInfo name={vehicleDetails.owner_name} />
        </div>

        <UnavailableTimeSlot></UnavailableTimeSlot>

        <div className="md:mt-20 mt-20">
          <h2 className="text-2xl font-semibold">Full address of booking</h2>
          <p className="text-sm">Pdeu High Rise Hostel</p>
          <Image
            src={"/images/map.png"}
            height={100}
            width={2000}
            alt="map image"
            className="rounded-lg mt-5 w-full h-[10rem] md:h-fit object-cover border shadow"
          />
        </div>
        <div className="mt-20 space-y-5">
          <h2 className="text-2xl font-semibold">Good to Know</h2>
          <div className="grid md:text-base text-sm md:grid-cols-2 md:gap-10 gap-5  grid-rows-3">
            {faqData.map((faq, index) => (
              <div key={index}>
                <h3 className="font-semibold">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BikePage;

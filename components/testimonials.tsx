import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import chirag from "@/public/images/testimonials/Chirag.jpg";
import jay from "@/public/images/testimonials/Jay.jpg";
import dhariya from "@/public/images/testimonials/Dhariya.jpg";

type Props = {};

const testimonials = [
  {
    content: `Excellent Service!
Renting a bike from WeRide was super easy! The bike was in great shape, pickup was fast, and the price was fair. No surprises. I’d totally use them again!`,
    name: "Chirag Doshi",
    profile: chirag,
    role: "Vehicle Renter",
  },
  {
    content: `Great Platform for Owners!
   At first I hesitated but eventually listed my vehicle. Seems like a good way to earn some cash. Would definitely recommend it.`,

    name: "Jay Padalia",
    profile: jay,
    role: "Vehicle Owner",
  },
  {
    content: `Great Service!
    Had a great experience renting a bike from WeRide. Everything was super quick and simple, and the bike was just as described. The price was decent too. Definitely coming back!`,

    name: "Dhariya Soni",
    profile: dhariya,
    role: "Vehicle Renter",
  },
];
export default function Testimonials({}: Props) {
  return (
    <Carousel>
      <CarouselContent>
        {testimonials.map((item, index) => (
          <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
            <Card>
              <CardContent className="min-h-[18rem] h-fit space-y-5 flex flex-col justify-center p-10">
                <p>
                  {item.content.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>

                <div className="flex items-center space-x-2">
                  <img
                    width={100}
                    height={100}
                    className="h-10 w-10 rounded-full"
                    src={
                      typeof item.profile === "string"
                        ? item.profile
                        : item.profile.src
                    }
                    alt="sankalpa"
                  />
                  <div className="space-y-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <span className="text-sm text-gray-600">{item.role}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

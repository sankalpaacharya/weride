import React from "react";
import { Card, CardContent } from "./ui/card";
import chirag from "@/public/images/testimonials/Chirag.jpg";
import jay from "@/public/images/testimonials/Jay.jpg";
import dhariya from "@/public/images/testimonials/Dhariya.jpg";
import anonymous from "@/public/images/testimonials/anonymous.webp";
import yash from "@/public/images/testimonials/Yash.webp";
import shafin from "@/public/images/testimonials/Shafin.webp";
import pratyay from "@/public/images/testimonials/Pratyay.webp";
import { FaStar } from "react-icons/fa";

type Props = {};

const testimonials = [
  {
    content: `Excellent Service!
Renting a bike from WeRide was super easy! The bike was in great shape, pickup was fast, and the price was fair. No surprises. I’d totally use them again!`,
    name: "Chirag Dosi",
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
Had a great experience renting a bike from WeRide. Everything was super quick and simple, and the bike was just as described. Definitely coming back!`,
    name: "Dhariya Soni",
    profile: dhariya,
    role: "Vehicle Renter",
  },
  {
    content: `Rented a bike from WeRide last weekend. The booking was easy, and the bike was ready on time. The price was fair too. So, had a good experience. Would rent again.`,
    name: "Shafin Kazi",
    profile: shafin,
    role: "Vehicle Renter",
  },
  {
    content: `Rented a vehicle from Weride. Booking was easy, and the vehicle was clean and in good condition. Return was smooth too. Happy with the service and would use it again.`,
    name: "Kruti Dharsandiya",
    profile: anonymous,
    role: "Vehicle Renter",
  },
  {
    content: `I got a vehicle from WeRide, the booking was quick and the bike was ready on time, it was easy to ride and I didn’t face any problems during my trip.`,
    name: "Yash Lokwani",
    profile: yash,
    role: "Vehicle Renter",
  },
  {
    content: `Tried WeRide for the first time to rent a bike, the process was easy, the bike was fine for my trip, and I was able to return it without any problem. Would book again soon.`,
    name: "Pratyay Patel",
    profile: pratyay,
    role: "Vehicle Renter",
  },
  {
    content: `Used WeRide to rent a vehicle and it was a good experience, booking was simple, the bike was in working condition, and I had no issues riding it around.`,
    name: "Anup Gandhi",
    profile: anonymous,
    role: "Vehicle Renter",
  },
  {
    content: `I had a great experience using the WeRide platform to drive the Activa 3G. One of the best parts was its instant availability, which added to the overall convenience. Highly recommended!`,
    name: "Maitri Patel",
    profile: anonymous,
    role: "Vehicle Renter",
  },
  {
    content: `Excellent service and quality. Genuinely recommended to all college students. Thank you`,
    name: "Prayash Mishra",
    profile: anonymous,
    role: "Vehicle Renter",
  },
];

export default function Testimonials({}: Props) {
  return (
    <div className="w-full text-white overflow-hidden py-6 relative group">
      <div className="flex w-max animate-marquee space-x-14 px-4 group-hover:[animation-play-state:paused]">
        {testimonials.concat(testimonials).map((item, index) => (
          <Card
            key={index}
            className="w-[300px] min-h-[18rem] flex-shrink-0 p-[1px] bg-gradient-to-br from-white/30 to-white/10 shadow-xl rounded-xl overflow-hidden"
          >
            <div className="relative z-10 backdrop-blur-md bg-white/10 rounded-xl h-full border border-white/20">
              <CardContent className="h-full flex flex-col justify-between p-6">
                <p className="text-base leading-relaxed text-gray-600">
                  {item.content.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>

                <div className="flex items-center space-x-3 mt-4">
                  <img
                    src={
                      typeof item.profile === "string"
                        ? item.profile
                        : item.profile.src
                    }
                    alt={item.name}
                    className="h-12 w-12 rounded-full object-cover border border-white/30"
                  />
                  <div>
                    <h3 className="font-semibold text-black">{item.name} </h3>
                    <span className="text-xs  text-gray-700/80">
                      {item.role}
                    </span>
                    <span className="text-base flex flex-row text-yellow-400">
                      {" "}
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />{" "}
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
          </Card>
        ))}
      </div>
    </div>
  );
}

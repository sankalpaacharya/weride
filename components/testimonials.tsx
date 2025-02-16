import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";

type Props = {};

const testimonials = [
  {
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure aspernatur voluptate optio laudantium harum corrupti provident sint praesentium quasi tenetur nulla ducimus suscipit consequatur quia adipisci quibusdam, dolorum quidem nostrum!",

    name: "Sankalpa Acharya",
    profile: "https://github.com/sankalpaacharya.png",
    role: "Vehicle Owner",
  },
  {
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure aspernatur voluptate optio laudantium harum corrupti provident sint praesentium quasi tenetur nulla ducimus suscipit consequatur quia adipisci quibusdam, dolorum quidem nostrum!",

    name: "Sankalpa Acharya",
    profile: "https://github.com/sankalpaacharya.png",
    role: "Vehicle Owner",
  },
  {
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure aspernatur voluptate optio laudantium harum corrupti provident sint praesentium quasi tenetur nulla ducimus suscipit consequatur quia adipisci quibusdam, dolorum quidem nostrum!",

    name: "Sankalpa Acharya",
    profile: "https://github.com/sankalpaacharya.png",
    role: "Vehicle Owner",
  },
];
export default function Testimonials({}: Props) {
  return (
    <Carousel>
      <CarouselContent>
        {testimonials.map((item, index) => (
          <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
            <Card>
              <CardContent className="min:h-[15rem] h-fit space-y-5 flex flex-col justify-center p-10">
                <p>{item.content}</p>
                <div className="flex items-center space-x-2">
                  <img
                    width={100}
                    height={100}
                    className="h-10 w-10 rounded-full"
                    src={item.profile}
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

"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function BikeGallery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const images = [
    "/images/bike3.webp",
    "/images/bike3.webp",
    "/images/bike3.webp",
  ];

  const MobileCarousel = () => (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <img
              alt={`bike image ${index + 1}`}
              className="w-full h-auto rounded-xl"
              src={src}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );

  const DesktopGallery = () => (
    <div className="flex gap-3">
      <div className="flex flex-col gap-2">
        {images.slice(0, 2).map((src, index) => (
          <img
            key={index}
            alt={`bike image ${index + 1}`}
            width={100}
            className="aspect-video w-[10rem] cursor-pointer rounded-xl"
            height={100}
            src={src}
          />
        ))}
      </div>
      <img
        alt="main bike image"
        width={100}
        className="aspect-video w-[50rem] rounded-xl"
        height={100}
        src={images[0]}
      />
    </div>
  );

  return <div>{isMobile ? <MobileCarousel /> : <DesktopGallery />}</div>;
}

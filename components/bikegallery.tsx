"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function BikeGallery({ bikeId }: { bikeId: string }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  const baseUrl =
    "https://cxlnoycrdkdkdezryaph.supabase.co/storage/v1/object/public/Vehicle/" +
    bikeId;
  const images = [
    baseUrl + "_front.jpeg",
    baseUrl + "_side.jpeg",
    baseUrl + "_back.jpeg",
  ];

  const handleThumbnailClick = (index: number) => {
    setActiveImage(index);
  };

  return (
    <div className="w-[80%] md:w-full max-w-5xl mx-auto">
      {isMobile ? (
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <img
                  src={src}
                  alt={`Bike image ${index + 1}`}
                  className="w-full h-auto aspect-video rounded-xl object-fill"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="flex flex-row gap-4">
          <div className="w-1/5 flex flex-col gap-2">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-auto aspect-video object-cover rounded-xl cursor-pointer transition-opacity ${
                  index === activeImage
                    ? "brightness-95"
                    : "brightness-50 hover:brightness-95"
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
          <div className="w-4/5">
            <img
              src={images[activeImage]}
              alt={`Main bike image ${activeImage + 1}`}
              className="w-full h-auto rounded-xl object-fill aspect-video"
            />
          </div>
        </div>
      )}
    </div>
  );
}

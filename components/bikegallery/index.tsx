import React from "react";

export default function BikeGallery() {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-2">
        <img
          alt="bike image"
          width={100}
          className="aspect-video w-[10rem] cursor-pointer rounded-xl"
          height={100}
          src={`/images/bike3.webp`}
        />
        <img
          alt="bike image"
          width={100}
          className="aspect-video w-[10rem] cursor-pointer rounded-xl"
          height={100}
          src={`/images/bike3.webp`}
        />
      </div>
      <img
        alt="bike image"
        width={100}
        className="aspect-video w-[50rem] rounded-xl"
        height={100}
        src={`/images/bike3.webp`}
      />
    </div>
  );
}

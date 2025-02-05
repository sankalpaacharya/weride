"use client";
import bikeloading from "@/public/images/loadingbike.json";
import Lottie from "lottie-react";
import { TimeProgressBar } from "./rentalrequestcard";
import { useEffect, useState } from "react";
const PendingLoading = () => {
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const requestTimer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(requestTimer);
  }, [timeLeft]);

  return (
    <div className="flex flex-col border shadow-lg rounded-lg">
      <TimeProgressBar timeleft={timeLeft} />
      <div className="flex flex-col items-center">
        <Lottie
          animationData={bikeloading}
          loop={true}
          className="h-24 w-24 object-cover"
        />
        <p className="md:text-lg font-medium text-gray-500">
          Please wait, Owner will accept your booking
        </p>
      </div>
    </div>
  );
};

export default PendingLoading;

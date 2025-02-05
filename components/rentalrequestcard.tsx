"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, AlertTriangle, Timer } from "lucide-react";
import Image from "next/image";
import scooter from "@/public/images/scooter.png";
import { useEffect } from "react";

export const TimeProgressBar = ({ timeleft }: { timeleft: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div
        className="bg-purple-600 h-1.5 rounded-full transition-all duration-1000"
        style={{ width: `${(timeleft / (30 * 60)) * 100}%` }}
      />
    </div>
  );
};

export default function RentalRequestCard() {
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const requestTimer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(requestTimer);
  }, [timeLeft]);

  return (
    <Card className="max-w-md mx-auto bg-white shadow-lg">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <p className="font-mono font-bold text-lg text-gray-700 flex space-x-2 items-center">
                <Timer size={20} />
                <span>
                  {Math.floor(timeLeft / 60)}:
                  {String(timeLeft % 60).length < 2 ? "0" : ""}
                  {timeLeft % 60}
                </span>
              </p>
            </div>
            {timeLeft < 600 ? (
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Response required soon
                </span>
              </div>
            ) : null}
          </div>
          <TimeProgressBar timeleft={timeLeft} />
        </div>

        {/* Header with avatar and name */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500">
              <Image
                height={100}
                width={100}
                src={"https://github.com/sankalpaacharya.png"}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Sankalpa Acharya</h3>
            <span className="text-sm text-gray-500">Rental Request</span>
          </div>
        </div>

        {/* Vehicle details */}
        <div className="flex gap-6 mb-6">
          <div className="w-32 h-32 bg-gray-50 rounded-lg p-2">
            <Image
              src={scooter}
              alt="Honda Activa 125"
              height={100}
              width={100}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold">Honda Activa 125</h4>
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                Pending
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Bhajipura</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Timer className="w-4 h-4" />
                <span className="text-sm">4 hours</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Navigation className="w-4 h-4" />
                <span className="text-sm">10 KM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-b border-gray-100 py-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Start Time</p>
              <p className="font-medium">10:00am, 2024/1/17</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm text-gray-500">End Time</p>
              <p className="font-medium">1:00pm, 2024/1/17</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-2xl font-bold">₹120</p>
          </div>
          <p className="text-sm text-gray-500">
            Please respond within the given time
          </p>
        </div>

        <div className="flex gap-4">
          <Button variant="destructive" className="flex-1">
            Cancel
          </Button>
          <Button variant="default" className="flex-1">
            Accept
          </Button>
        </div>
      </div>
    </Card>
  );
}

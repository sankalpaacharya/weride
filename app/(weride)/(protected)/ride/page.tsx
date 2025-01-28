"use client";
import React, { useState, useEffect } from "react";
import { X, MapPin, Calendar, Bike, Phone, Mail, Gauge } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import QrCode from "@/public/images/QRimage.jpeg";

const ActiveRideStatus = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 30,
    seconds: 0,
  });

  const [rideData] = useState({
    startMeter: 36000,
    ratePerMin: 40,
    startTime: new Date(),
    owner: {
      name: "Sankalpa Acharya",
      phone: "+91 98765 43210",
      email: "sankalpa@example.com",
      rating: 4.8,
      totalRides: 6,
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        let newHours = prev.hours;
        let newMinutes = prev.minutes;
        let newSeconds = prev.seconds;

        if (newSeconds === 0) {
          if (newMinutes === 0) {
            if (newHours === 0) {
              return prev;
            }
            newHours--;
            newMinutes = 59;
          } else {
            newMinutes--;
          }
          newSeconds = 59;
        } else {
          newSeconds--;
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header with Vehicle Info */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-900">Active Ride</h1>
          <p className="text-gray-600">Honda Activa 125</p>
        </div>

        {/* Time Remaining Card */}
        <Card className="bg-gradient-to-br from-purple-900 to-purple-800 text-white overflow-hidden">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              <h2 className="text-xl font-medium">Time Remaining</h2>
              <div className="flex justify-center items-center gap-4">
                <div className="text-center bg-white/10 px-6 py-4 rounded-lg backdrop-blur-sm">
                  <div className="text-5xl font-bold">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-sm mt-1 opacity-80">Hours</div>
                </div>
                <div className="text-4xl font-bold">:</div>
                <div className="text-center bg-white/10 px-6 py-4 rounded-lg backdrop-blur-sm">
                  <div className="text-5xl font-bold">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-sm mt-1 opacity-80">Minutes</div>
                </div>
                <div className="text-4xl font-bold">:</div>
                <div className="text-center bg-white/10 px-6 py-4 rounded-lg backdrop-blur-sm">
                  <div className="text-5xl font-bold">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-sm mt-1 opacity-80">Seconds</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rest of the component remains unchanged */}
        {/* Meter Reading Card */}
        <Card className="border-2 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="text-purple-900" />
              Meter Reading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Initial Reading</div>
                <div className="text-2xl font-bold text-purple-900">
                  {rideData.startMeter.toLocaleString()} km
                </div>
                <div className="text-xs text-gray-400">Verified by Owner</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Rate</div>
                <div className="text-2xl font-bold text-purple-900">
                  ₹{rideData.ratePerMin}/hr
                </div>
                <div className="text-xs text-gray-400">
                  Final reading at return
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Owner Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Owner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                  <img
                    src="https://github.com/sankalpaacharya.png"
                    alt="Owner"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {rideData.owner.name}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      ★ {rideData.owner.rating}
                      <span className="text-gray-500 text-sm">
                        ({rideData.owner.totalRides} rides)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} className="text-purple-900" />
                    <a
                      href={`tel:${rideData.owner.phone}`}
                      className="hover:text-purple-900"
                    >
                      {rideData.owner.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} className="text-purple-900" />
                    <a
                      href={`mailto:${rideData.owner.email}`}
                      className="hover:text-purple-900"
                    >
                      {rideData.owner.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ride Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Ride Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-purple-900" />
                <div>
                  <div className="font-medium">Pickup Location</div>
                  <div className="text-gray-600">Bhajipura</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-purple-900" />
                <div>
                  <div className="font-medium">Rental Period</div>
                  <div className="text-gray-600">30 minutes</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment QR Card */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-center">
              <div className="bg-gray-100 p-6 rounded-lg inline-block mx-auto">
                <Image
                  height={400}
                  width={400}
                  alt="Owner QR code"
                  src={QrCode}
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-900">₹20</div>
                <div className="text-gray-600">
                  Scan to pay after ride completion
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Final amount will be calculated based on duration
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 sticky bottom-6">
          <button className="flex-1 bg-purple-900 text-white py-4 rounded-lg flex items-center justify-center gap-2 font-medium">
            <X size={20} />
            End Ride
          </button>
          <button className="flex-1 border-2 border-purple-900 text-purple-900 py-4 rounded-lg font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveRideStatus;

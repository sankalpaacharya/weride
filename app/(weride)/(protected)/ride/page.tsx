"use client";
import React, { useState, useEffect } from "react";
import { X, MapPin, Calendar, Share2, Bike, Phone, Mail } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import QrCode from "@/public/images/QRimage.jpeg";

const ActiveRideStatus = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [rideData] = useState({
    startMeter: 36000,
    ratePerKm: 7,
    basePrice: 105,
    currentMeter: 36015,
    owner: {
      name: "Sankalpa Acharya",
      phone: "+91 98765 43210",
      email: "sankalpa@example.com",
      rating: 4.8,
      totalRides: 6,
    },
  });

  // Calculate time left
  useEffect(() => {
    const endTime = new Date("2024/1/17 13:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      setTimeLeft({
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-900">Active Ride</h1>
          <p className="text-gray-600">Honda Activa 125</p>
        </div>
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
        {/* Time Remaining Card */}
        <Card className="bg-purple-900 text-white">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold">Time Remaining</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">{timeLeft.hours}</div>
                  <div className="text-sm opacity-80">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-sm opacity-80">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-sm opacity-80">Seconds</div>
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
                  <div className="text-gray-600">10:00 AM - 1:00 PM</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bike className="text-purple-900" />
                <div>
                  <div className="font-medium">Rate</div>
                  <div className="text-gray-600">₹7/km</div>
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
                ></Image>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-900">₹120</div>
                <div className="text-gray-600">Scan to pay</div>
                <p className="text-sm text-gray-400">
                  Only pay once the ride is completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="flex-1 bg-purple-900 text-white py-3 rounded-lg flex items-center justify-center gap-2">
            <X size={20} />
            End Ride
          </button>
          <button className="flex-1 border-2 border-purple-900 text-purple-900 py-3 rounded-lg">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveRideStatus;

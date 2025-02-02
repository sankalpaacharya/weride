"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const RideTimer = ({ initialTime }: { initialTime: any }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialTime.hours || 0,
    minutes: initialTime.minutes || 0,
    seconds: initialTime.seconds || 0,
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
    <Card className="bg-gradient-to-br from-purple-900 to-purple-800 text-white overflow-hidden">
      <CardContent className="pt-8 pb-8">
        <div className="text-center space-y-6">
          <h2 className="text-xl font-medium">Time Remaining</h2>
          <div className="flex justify-center items-center gap-4">
            <div className="text-center bg-white/10 md:px-6 px-3 py-4 rounded-lg backdrop-blur-sm">
              <div className="md:text-5xl text-3xl font-bold">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-sm mt-1 opacity-80">Hours</div>
            </div>
            <div className="text-4xl font-bold">:</div>
            <div className="text-center bg-white/10 md:px-6 px-3 py-4 rounded-lg backdrop-blur-sm">
              <div className="md:text-5xl text-3xl font-bold">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-sm mt-1 opacity-80">Minutes</div>
            </div>
            <div className="text-4xl font-bold">:</div>
            <div className="text-center bg-white/10 px-3 md:px-6 py-4 rounded-lg backdrop-blur-sm">
              <div className="md:text-5xl text-3xl font-bold">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-sm mt-1 opacity-80">Seconds</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideTimer;

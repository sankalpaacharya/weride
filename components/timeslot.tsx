import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import { CalendarCheck } from "lucide-react";
type Props = {};

const UnavailableTime = {
  Monday: [{ start: "10:30", end: "11:00" }],
  Tueday: [{ start: "10:30", end: "11:00" }],
  Wednesday: [{ start: "10:30", end: "11:00" }],
  Thursday: [{ start: "10:30", end: "11:00" }],
  Friday: [{ start: "10:30", end: "11:00" }],
  Saturday: [{ start: "10:30", end: "11:00" }],
  Sunday: [{ start: "10:30", end: "11:00" }],
};

type Day = keyof typeof UnavailableTime;

export default function UnavailableTimeSlot({}: Props) {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>
          <p className="text-lg flex items-center space-x-1 font-medium text-red-500">
            <Timer size={20} />
            <span>Unavailable time slot</span>
          </p>
        </CardTitle>
        <CardContent className="space-y-3">
          {Object.keys(UnavailableTime).map((day) => {
            const timeSlots = UnavailableTime[day as Day];
            return (
              <div key={day} className="space-y-1">
                <p className="font-semibold flex space-x-1 items-center">
                  <CalendarCheck size={15} />
                  <span>{day}</span>
                </p>
                <div className="space-y-1">
                  {timeSlots.map((slot, index) => (
                    <Button variant={"outline"} key={index}>
                      {slot.start} - {slot.end}
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </CardHeader>
    </Card>
  );
}

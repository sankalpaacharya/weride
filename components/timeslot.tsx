import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, CalendarCheck } from "lucide-react";

type Props = {};

const UnavailableTime = {
  Monday: [],
  Tueday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
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
      </CardHeader>
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
                {timeSlots.length > 0 ? (
                  timeSlots.map((slot: any, index) => (
                    <Button variant="outline" key={index}>
                      {slot.start} - {slot.end}
                    </Button>
                  ))
                ) : (
                  <span className="text-gray-500">No slot</span>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

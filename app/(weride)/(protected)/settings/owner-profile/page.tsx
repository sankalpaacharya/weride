"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Bike } from "lucide-react";

const OwnerProfileSettings = () => {
  return (
    <div className="">
      <div className="">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Vehicle Settings</CardTitle>
                <CardDescription>
                  Manage how you appear to potential renters
                </CardDescription>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Save Changes
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vehicle Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bike className="h-5 w-5" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Vehicle Title</Label>
                <Input placeholder="Enter vehicle title" />
              </div>

              <div className="space-y-2">
                <Label>Vehicle Description</Label>
                <Textarea
                  placeholder="Describe your vehicle"
                  className="h-32"
                />
              </div>

              <div className="space-y-2">
                <Label>Message to Renter</Label>
                <Textarea placeholder="Message to renter" className="h-24" />
              </div>
            </CardContent>
          </Card>

          {/* Availability Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Availability Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Status</Label>
                <Select defaultValue="available">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="away">Booked</SelectItem>
                    <SelectItem value="busy">Unavailable</SelectItem>
                    <SelectItem value="busy">Maintaince</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Regularly Available Times</Label>
                <div className="flex gap-2">
                  <Select defaultValue="monday">
                    <SelectTrigger>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      {/* Add other days */}
                    </SelectContent>
                  </Select>
                  <Select defaultValue="9am">
                    <SelectTrigger>
                      <SelectValue placeholder="Start" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      {/* Add other times */}
                    </SelectContent>
                  </Select>
                  <Select defaultValue="5pm">
                    <SelectTrigger>
                      <SelectValue placeholder="End" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5pm">5:00 PM</SelectItem>
                      {/* Add other times */}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="ghost" className="text-purple-600 p-0 h-auto">
                  + Add Time Slot
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfileSettings;

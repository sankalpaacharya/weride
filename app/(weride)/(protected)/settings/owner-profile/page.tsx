"use client";
import React, { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  useFormField,
  FormItem,
} from "@/components/ui/form";
import {
  Calendar as CalendarIcon,
  Bike,
  Calendar,
  Clock,
  Trash2,
  Plus,
} from "lucide-react";
import { useForm, UseFormReturn, FieldValues } from "react-hook-form";

type TimeSlot = {
  start: string;
  end: string;
};

type Slots = {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
};

type days = keyof Slots;

const Header = ({ isSubmitting }: { isSubmitting: boolean }) => (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-2xl">Vehicle Settings</CardTitle>
          <CardDescription>
            Manage how you appear to potential renters
          </CardDescription>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Save Changes
        </Button>
      </div>
    </CardHeader>
  </Card>
);

const AvailabilitySettings = ({
  form,
}: {
  form: UseFormReturn<FieldValues, any, undefined>;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <CalendarIcon className="h-5 w-5" /> Availability Settings
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label>Default Status</Label>
        <FormField
          name="availability"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue="Available">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Booked">Booked</SelectItem>
                  <SelectItem value="Unavailable">Unavailable</SelectItem>
                  <SelectItem value="Maintaince">Maintaince</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <div>
          <Label>Set Unavailable Times</Label>
          <p className="text-gray-500 text-xs">
            Set specific times when your vehicle is not available for rental.
            You can add multiple time slots of any duration.
          </p>
        </div>
        <UnavailableTimeSettings />
      </div>
    </CardContent>
  </Card>
);

const VehicleInformation = ({
  form,
}: {
  form: UseFormReturn<FieldValues, any, undefined>;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <Bike className="h-5 w-5" /> Vehicle Information
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label>Vehicle Title</Label>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Enter vehicle title" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label>Vehicle Description</Label>
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe your vehicle"
                  className="h-32"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label>Message to Renter</Label>
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Message to renter"
                  className="h-24"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </CardContent>
  </Card>
);

const UnavailableTimeSettings = () => {
  const timeSlots: Slots = {
    monday: [{ start: "10:00:00", end: "13:00:00" }],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };
  const [selectedDay, setSelectedDay] = useState<days>("monday");
  const [slots, setSlots] = useState<Slots>(timeSlots);

  useEffect(() => {
    console.log(slots);
  }, [slots]);

  const updateTimeSlot = (
    day: days,
    index: number,
    field: "start" | "end",
    value: string,
  ) => {
    setSlots((prev) => {
      const updatedSlots = { ...prev };
      updatedSlots[day] = [...prev[day]];
      updatedSlots[day][index] = {
        ...updatedSlots[day][index],
        [field]: value,
      };
      return updatedSlots;
    });
  };

  return (
    <div className="mt-10 ">
      {/* day */}
      <div className="space-y-2 pb-3 border-b">
        <div className="flex items-center justify-between">
          <p className="inline-flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <FormField
              name="day"
              render={({ field }) => (
                <Select
                  defaultValue="monday"
                  onValueChange={(value: days) => setSelectedDay(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a day " />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(slots).map((day) => (
                      <SelectItem key={day} value={day.toLowerCase()}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </p>
          <Button
            variant={"outline"}
            onClick={() =>
              setSlots((prev: Slots) => {
                return {
                  ...prev,
                  [selectedDay]: [
                    ...prev[selectedDay],
                    { start: "10:00:00", end: "12:00:00" },
                  ],
                };
              })
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Time Slot
          </Button>
        </div>
        {/*  time slot */}
        {slots[selectedDay].map((slot, index) => (
          <div
            key={`${selectedDay}-${index}`}
            className="p-2 bg-gray-50 flex items-center"
          >
            <Clock className="h-4 w-4 mr-4" />
            <div className="flex items-center space-x-2 w-full">
              <Input
                onChange={(e) =>
                  updateTimeSlot(selectedDay, index, "start", e.target.value)
                }
                value={slot.start}
                type="time"
              />
              <span className="text-gray-600">to</span>
              <Input
                type="time"
                value={slot.end}
                onChange={(e) =>
                  updateTimeSlot(selectedDay, index, "end", e.target.value)
                }
              />
            </div>
            <span
              onClick={() => {
                setSlots((prev) => {
                  const updatedDay = prev[selectedDay].filter(
                    (_, i) => i !== index,
                  );
                  return {
                    ...prev,
                    [selectedDay]: updatedDay,
                  };
                });
              }}
              className="p-3 hover:bg-gray-200 transition-all cursor-pointer rounded-lg flex justify-center ml-4"
            >
              <Trash2 className="h-4 w-4" />
            </span>
          </div>
        ))}
        {slots[selectedDay].length == 0 ? (
          <div className="p-12 rounded-lg border shadow-sm flex justify-center items-center">
            No unavailable time slots have been set
          </div>
        ) : null}

        {/* time slot end's here */}
      </div>

      {/* day ends here */}
    </div>
  );
};

const OwnerProfileSettings = () => {
  const form = useForm();
  const formSubmit = (formValue: any) => {
    console.log(formValue);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formSubmit)}>
        <div>
          <Header isSubmitting={form.formState.isSubmitting} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AvailabilitySettings form={form} />
            <VehicleInformation form={form} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default OwnerProfileSettings;

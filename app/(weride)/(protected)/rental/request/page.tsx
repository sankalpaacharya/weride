import React from "react";
import RentalRequestCard from "@/components/rentalrequestcard";
const RentalRequestDetails = {
  user: {
    name: "Sankalpa Acharya",
    profileUrl: "https://github.com/sankalpaacharya", // storage me mil jayega
    // url pattern: https://cxlnoycrdkdkdezryaph.supabase.co/storage/v1/object/public/Profile/{userId}.png
  },
  rideDetails: {
    location: "bhaijipura",
    duration: "4 hours",
    distance: "10 KM",
    amount: "₹120",
    startTimeDate: "10:00am, 2024/1/17",
    endTimeDate: "1:00pm, 2024/1/17",
    timeleft: 600, // in seconds, createdtime tabale ke row me h aur estimated hours se endtime calculate karna, aur timeleft dono ka difference
  },
};

type RentalRequestType = typeof RentalRequestDetails;
type PageProps = {
  rentalRequestDetails: RentalRequestType;
};

export default function Page({}: PageProps) {
  return (
    <div>
      <RentalRequestCard />
    </div>
  );
}

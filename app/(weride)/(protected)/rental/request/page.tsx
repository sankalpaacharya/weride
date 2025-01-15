import React from "react";
import RentalRequestCard from "@/components/rentalrequestcard";
const RentalRequestDetails = {
  user: {
    name: "Sankalpa Acharya",
    profileUrl: "https://github.com/sankalpaacharya",
  },
  rideDetails: {
    location: "bhaijipura",
    duration: "4 hours",
    distance: "10 KM",
    amount: "₹120",
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

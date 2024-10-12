import React from "react";
import { MdIosShare } from "react-icons/md";
import RentalModal from "../rentalmodal";
import { Button } from "../ui/button";
export default function checkoutcard() {
  return (
    <div className="card-shadow flex-grow p-10 rounded-xl">
      <div className="space-y-1">
        <h2 className="text-main text-2xl font-medium">90₹ / hour</h2>
        <p className="text-sm text-gray-600">360₹ / 4hrs</p>
      </div>
      <span className="text-main flex gap-2 mt-5">
        <MdIosShare size={20} />
        Share
      </span>
      <div className="mt-10">
        <RentalModal>
          <Button>Rent Now</Button>
        </RentalModal>
      </div>
    </div>
  );
}

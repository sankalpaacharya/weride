import React from "react";
import {
  ChevronRight,
  Phone,
  MapPin,
  Clock,
  Bike,
  ClockAlert,
  Circle,
  IndianRupee,
  Key,
} from "lucide-react";

interface Renter {
  name: string;
  phone: string;
}

export interface RideType {
  created_at: string;
  renter_id: Renter;
  pickup_location: string;
  location: string;
  final_meter_reading: number;
  initial_meter_reading: number;
  rent_hour: number;
  late_fee: number;
  status: string;
  bike_id: string;
  key_exchange: string;
}

interface RideProps {
  rides: RideType[];
  vehicleData: any;
  title: string;
}

const RideHistory: React.FC<RideProps> = ({
  rides,
  vehicleData,
  title,
}: RideProps) => {
  const calculateFare = (ride: any) => {
    if (ride.status !== "Completed") {
      return { totalBill: 0.0, convenienceFee: 0.0, finalBill: 0.0 };
    }
    const petrolFee =
      (ride.final_meter_reading - ride.initial_meter_reading) * 2.8;
    const hourlyFee = ride.rent_hour * vehicleData.data.price;
    const totalBill = petrolFee + hourlyFee + ride.late_fee;

    let convenienceFee = 0;
    let convenienceFeeText = "No Convenience Fee";

    if (ride.key_exchange === "weride") {
      convenienceFee = 0.25 * hourlyFee;
      convenienceFeeText = `WeRide Convenience Fee (25%): ${convenienceFee.toFixed(2)}`;
    } else if (ride.key_exchange === "owner") {
      convenienceFee = 0.1 * hourlyFee;
      convenienceFeeText = `Owner Convenience Fee (10%): ${convenienceFee.toFixed(2)}`;
    }

    const finalBill = totalBill - convenienceFee;

    return {
      totalBill: totalBill.toFixed(2),
      convenienceFee: convenienceFeeText,
      finalBill: finalBill.toFixed(2),
    };
  };

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-4 my-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {rides.map((ride, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden p-6 mb-6"
        >
          <div className="bg-purple-700 rounded-lg text-white px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <ChevronRight className="w-5 h-5 mr-2" />
              <span className="font-semibold text-lg">Ride {index + 1}</span>
            </div>
            <div className="text-purple-100 text-sm font-medium">
              {ride.created_at.slice(0, 10)} | {ride.created_at.slice(11, 19)}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-4">
                {ride.renter_id.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-lg text-gray-800">
                  {ride.renter_id.name}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Phone className="w-3 h-3 mr-2" />
                  {ride.renter_id.phone}
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center mr-3">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <span className="text-gray-800">{ride.pickup_location}</span>
              </div>
              <div className="ml-3 w-px h-6 bg-gray-300"></div>
              <div className="flex items-center mt-3">
                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <span className="text-gray-800">{ride.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6 py-4 border-t border-b border-gray-100">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                {(
                  ride.final_meter_reading - ride.initial_meter_reading
                ).toFixed(2)}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-600" />
                {ride.rent_hour} hrs
              </div>
              <div className="flex items-center">
                <Bike className="w-5 h-5 mr-2 text-purple-600" />
                {vehicleData.data.name}
              </div>
              <div className="flex items-center">
                <ClockAlert className="w-5 h-5 mr-2 text-purple-600" />
                {ride.late_fee}
              </div>
              <div className="flex items-center">
                <Circle className="w-5 h-5 mr-2 text-purple-600" />
                {ride.status}
              </div>
              <div className="flex items-center">
                <Key className="w-5 h-5 mr-2 text-purple-600" />
                {ride.key_exchange}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-primary font-bold text-2xl">
                <div className="text-primary font-bold text-2xl">
                  <div className="flex items-center">
                    <IndianRupee />
                    {calculateFare(ride).finalBill}
                  </div>
                  <div className="text-sm font-medium">
                    <p>Total Bill: {calculateFare(ride).totalBill}</p>
                    <p>{calculateFare(ride).convenienceFee}</p>
                    <p>Final Bill: {calculateFare(ride).finalBill}</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <a
                  href={`tel:${ride.renter_id.phone}`}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md"
                >
                  Call
                </a>
                <a
                  href={`sms:${ride.renter_id.phone}`}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                >
                  Message
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RideHistory;

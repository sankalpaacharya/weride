import {
  getOrderByOwnerId,
  getUserById,
  getVehicleData,
} from "@/lib/supabase/queries";
import RideHistory from "@/components/ridehistory";

const hashmap = new Map();

const ownerData = await getOrderByOwnerId(
  "87bf1fe2-06cb-4a50-927f-2ab9d5c16530",
);
const today = new Date();
const ridesThisWeek: RideType[] = [];
const ridesThisMonth: RideType[] = [];
const ridesOlder: RideType[] = [];

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

ownerData.forEach((ride) => {
  const rideDate = new Date(ride.created_at);
  const diffTime = today.getTime() - rideDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays <= 7) {
    ridesThisWeek.push(ride);
  } else if (diffDays <= 30) {
    ridesThisMonth.push(ride);
  } else {
    ridesOlder.push(ride);
  }
});

const vehicleData = await getVehicleData(ownerData[0].bike_id);

for (const i of ownerData) {
  if (!hashmap.has(i.renter_id)) {
    const renterData = await getUserById(i.renter_id);
    hashmap.set(i.renter_id, renterData);
    i.renter_id = renterData;
  } else {
    i.renter_id = hashmap.get(i.renter_id);
  }
}

export default function Page() {
  return (
    <>
      <RideHistory
        title="This Week"
        rides={ridesThisWeek}
        vehicleData={vehicleData}
      />
      <RideHistory
        title="This Month"
        rides={ridesThisMonth}
        vehicleData={vehicleData}
      />
      <RideHistory title="Older" rides={ridesOlder} vehicleData={vehicleData} />
    </>
  );
}
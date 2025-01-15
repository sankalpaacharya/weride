import RentalCard from "@/components/bikecard";
import FilterBar from "@/components/filterbar";
import { getVehicles } from "@/lib/supabase/queries";
const bikeDetails = {
  name: "Honda Activa 125",
  model: "2023 BS6",
  owner: "Vinit Thakkar",
  lastRenter: "Sankalpa",
  pricePerHour: 90,
  location: "Mumbai Central",
  mileage: "60 kmpl",
  rating: 4.8,
  availability: "Available" as const,
  maxSpeed: "90 kmph",
};
type Vehicle = {
  id: string;
  created_at: string;
  owner_id: string;
  name: string;
  vehicle_code: string;
  description: string;
  fuel_type: string;
  message: string;
  owner_name: string;
  price: number;
  availability: string;
};

export default async function Home() {
  const vehiclesData = await getVehicles();

  return (
    <div className="overflow-hidden relative w-full">
      <FilterBar />
      <div className="flex flex-col mt-10 container">
        <div className="w-full">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-white">
            Frequently Booked
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
            {[
              ...vehiclesData.data,
              ...vehiclesData.data,
              ...vehiclesData.data,
            ].map((vehicle: Vehicle, index) => (
              <RentalCard
                key={index}
                imageName="bike3.webp"
                bikeDetails={vehicle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

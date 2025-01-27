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
          <h2 className="font-semibold text-xl text-gray-800">
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

      <div className="bg-primary mt-20 text-white py-10">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Ride? Rent or List Your Bike Now!
          </h3>
          <p className="text-lg mb-6">
            Join a community of students making commuting easier and earning
            smarter.
          </p>
          <div className="flex justify-center gap-4 mb-4 flex-col md:flex-row items-center">
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg shadow-lg transition">
              <i className="lucide lucide-bike"></i> Rent a Bike
            </button>
            <button className="flex items-center gap-2 bg-white hover:bg-gray-200 text-orange-500 font-medium py-2 px-6 rounded-lg shadow-lg border-2 border-orange-500 transition">
              <i className="lucide lucide-dollar-sign"></i> List Your Bike
            </button>
          </div>
          <p className="text-sm text-gray-300">
            Be the hero of your own commute! Hassle-free. Affordable. Fun.
          </p>
        </div>
      </div>
    </div>
  );
}

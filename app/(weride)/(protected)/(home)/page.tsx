import RentalCard from "@/components/bikecard";
import FilterBar from "@/components/filterbar";
import { getVehicles } from "@/lib/supabase/queries";
import { Bike, ListCheck } from "lucide-react";
import Testimonials from "@/components/testimonials";

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
            {[...vehiclesData.data].map((vehicle: Vehicle, index) => (
              <RentalCard
                key={index}
                imageName="bike2.jpeg"
                bikeDetails={vehicle}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary mt-20 text-gray-200 py-10">
        <div className="container flex justify-center">
          <div className="flex flex-col space-y-2 items-center justify-center ">
            <div className="p-4 bg-white rounded-full">
              <Bike className="text-primary" size={50} />
            </div>
            <div>
              <p className="text-3xl font-bold">10+</p>
              <span className="text-sm">Rides</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-20 space-y-5">
        <h2 className="text-xl font-semibold text-gray-800">
          What People Have to Say About Us
        </h2>
        <Testimonials />
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
              <ListCheck /> Rent a Bike
            </button>
            <button className="flex items-center gap-2 bg-white hover:bg-gray-200 text-orange-500 font-medium py-2 px-6 rounded-lg shadow-lg border-2 border-orange-500 transition">
              <Bike /> List Your Bike
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

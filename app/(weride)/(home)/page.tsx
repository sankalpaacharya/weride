import RentalCard from "@/components/bikecard";
import FilterBar from "@/components/filterbar";
import Footer from "@/components/footer";

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

export default function Home() {
  return (
    <main className="overflow-hidden relative w-full">
      <FilterBar />
      <div className="flex flex-col mt-10">
        <div className="w-full px-5 md:px-20">
          <h2 className="font-semibold text-xl text-gray-800">
            Frequently Booked
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
            <RentalCard imageName="bike1.jpeg" bikeDetails={bikeDetails} />
            <RentalCard imageName="bike2.jpeg" bikeDetails={bikeDetails} />
            <RentalCard imageName="bike1.jpeg" bikeDetails={bikeDetails} />
            <RentalCard imageName="bike2.jpeg" bikeDetails={bikeDetails} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

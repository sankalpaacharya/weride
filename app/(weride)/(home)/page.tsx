import RentalCard from "@/components/bikecard";
import FilterBar from "@/components/filterbar";

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
    <main className=" overflow-hidden relative w-full">
      <FilterBar />
      <div className="flex flex-col mt-10 md:items-center ">
        <div className="w-full md:w-fit px-10 md:px-0">
          <h2 className="font-semibold text-xl  text-gray-800">
            Frequently Booked
          </h2>
          <div className="grid mt-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10 ">
            <RentalCard imageName="bike1.jpeg" bikeDetails={bikeDetails} />
            <RentalCard imageName="bike2.jpeg" bikeDetails={bikeDetails} />
            <RentalCard imageName="bike1.jpeg" bikeDetails={bikeDetails} />
            <RentalCard imageName="bike2.jpeg" bikeDetails={bikeDetails} />
          </div>
        </div>
      </div>
    </main>
  );
}

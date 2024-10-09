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
      <div className="flex  md:justify-center">
        <div className="grid w-full md:w-fit  md:grid-cols-4 grid-cols-1 mt-10 gap-10 px-10 md:px-0">
          <RentalCard imageName="bike1.jpeg" bikeDetails={bikeDetails} />
          <RentalCard imageName="bike1.jpeg" bikeDetails={bikeDetails} />
          <RentalCard imageName="bike1.jpeg" bikeDetails={bikeDetails} />
          <RentalCard imageName="bike1.jpeg" bikeDetails={bikeDetails} />
        </div>
      </div>
    </main>
  );
}

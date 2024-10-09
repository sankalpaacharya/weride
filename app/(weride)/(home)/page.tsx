import BikeCard from "@/components/bikecard";
import FilterBar from "@/components/filterbar";

export default function Home() {
  return (
    <main className=" overflow-hidden relative w-full">
      <FilterBar />
      <div className="flex justify-between">
        <div></div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
          <BikeCard imageName={"bike1.jpeg"}></BikeCard>
          <BikeCard imageName={"bike1.jpeg"}></BikeCard>
          <BikeCard imageName={"bike1.jpeg"}></BikeCard>
        </div>
        <div></div>
      </div>
    </main>
  );
}

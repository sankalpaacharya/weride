import BikeCard from "@/components/bikecard"
export default function Home() {
  return (
    <main className=" overflow-hidden relative w-full">
      <div className="flex justify-between ">
        <div className="">
        </div>
        <div className=" grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-2 px-2 md:mt-0 mt-10 mb-10">
          <BikeCard imageName={'bike1.jpeg'}></BikeCard>
          <BikeCard imageName={'bike2.jpeg'}></BikeCard>
          <BikeCard imageName={'bike1.jpeg'}></BikeCard>
          <BikeCard imageName={'bike1.jpeg'}></BikeCard>
          <BikeCard imageName={'bike1.jpeg'}></BikeCard>
          <BikeCard imageName={'bike1.jpeg'}></BikeCard>
        </div>
        <div className="">
        </div>
      </div>
    </main>
  );
}

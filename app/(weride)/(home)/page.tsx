import NavBar from "@/components/navbar"
import Header from "@/components/header"
import BikeCard from "@/components/bikecard"
export default function Home() {
  return (
    <main className="overflow-hidden relative">
      <NavBar></NavBar>
      <Header></Header>
      <div className="flex justify-between">
        <div></div>
        <div className="grid md:grid-cols-3 grid-cols-2 md:gap-10 gap-2 px-2 mt-10">
          <BikeCard imageName={'bike1.jpeg'}></BikeCard>
          <BikeCard imageName={'bike2.jpeg'}></BikeCard>
          <BikeCard imageName={'bike1.jpeg'}></BikeCard>
          <BikeCard imageName={'bike1.jpeg'}></BikeCard>
          <BikeCard imageName={'bike1.jpeg'}></BikeCard>
          <BikeCard imageName={'bike1.jpeg'}></BikeCard>
        </div>
        <div></div>
      </div>
    </main>
  );
}

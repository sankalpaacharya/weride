import NavBar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/progressbarprovider";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden relative">
      <Toaster position="top-right" reverseOrder={false} />
      <NavBar />
      <Header />
      <div className="flex grow w-full">
        <Providers>{children}</Providers>
      </div>
      <Footer></Footer>
    </main>
  );
}

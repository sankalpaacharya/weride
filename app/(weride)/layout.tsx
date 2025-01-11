import NavBar from "@/components/navbar";
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/progressbarprovider";
import Footer from "@/components/footer";
import { isLoggedIn } from "@/lib/supabase/queries";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUser = await isLoggedIn();
  return (
    <main className="flex flex-col min-h-screen overflow-hidden relative">
      <Toaster position="top-right" reverseOrder={false} />
      <NavBar />
      <Header isAuthenticated={isUser ? true : false} />
      <div className="flex grow w-full">
        <Providers>{children}</Providers>
      </div>
      <Footer></Footer>
    </main>
  );
}

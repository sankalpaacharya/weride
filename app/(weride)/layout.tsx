import NavBar from "@/components/navbar";
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";
import { createClient } from "@/utils/supabase/server";
import Providers from "@/components/progressbarprovider";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <main className="flex flex-col min-h-screen overflow-hidden relative">
      <Toaster position="top-right" reverseOrder={false} />
      <NavBar />
      <Header isAuthenticated={user ? true : false} />
      <div className="flex grow w-full">
        <Providers>{children}</Providers>
      </div>
    </main>
  );
}

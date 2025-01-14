import { getUserStatus, isLoggedIn } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loginStatus = await isLoggedIn();
  if (!loginStatus) {
    return redirect("/login");
  }
  const userStatus = await getUserStatus();
  if (userStatus !== "verified") {
    return redirect("/verify");
  }
  return <div className="w-full relative overflow-auto">{children}</div>;
}

import { isLoggedIn } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loginStatus = await isLoggedIn();
  if (loginStatus) {
    redirect("/");
  }
  return <>{children}</>;
}

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
    error: _,
  } = await supabase.auth.getUser();
  if (user) {
    const { data: rideData, error } = await supabase
      .from("order")
      .select("*")
      .eq("renter_id", user?.id)
      .in("status", ["Active", "Pending"])
      .single();
    if (rideData) {
      redirect("/ride");
    }
  }
  return <div className="w-full relative overflow-auto">{children}</div>;
}

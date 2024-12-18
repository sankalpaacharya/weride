import { createClient } from "@/utils/supabase/server";

export async function getVehicles(limit: number = 10) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle")
    .select("*,users(status)")
    .limit(limit);

  const vechilesData = data?.filter(
    (vehicle) => vehicle.users.status != "pending",
  );
  if (error) {
    return [{ error: "there is some error getting the data" }];
  }
  return vechilesData || [];
}

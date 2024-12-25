import { createClient } from "@/utils/supabase/server";
type Vehicle = {
  id: string;
  created_at: string;
  owner: string;
  name: string;
  vehicle_code: string;
  description: string;
  fuel_type: string;
  message: string;
  owner_name: string;
  price: number;
  availability: string;
};

type VehiclesResponse = {
  data: Vehicle[] | [];
  error: string | null;
};
type VehicleResponse = {
  data: Vehicle | null;
  error: string | null;
};

export async function getVehicles(
  limit: number = 10,
): Promise<VehiclesResponse> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle")
    .select("*,users(status)")
    .limit(limit);

  const vechilesData =
    data?.filter((vehicle) => vehicle.users.status != "pending") || [];
  if (error) {
    return { data: [], error: error.message };
  }
  return { data: vechilesData, error: null };
}

export async function getVehicleData(bikeId: string): Promise<VehicleResponse> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle")
    .select("*")
    .eq("id", bikeId)
    .single();
  if (error) {
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

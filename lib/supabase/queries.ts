import { createClient } from "@/utils/supabase/server";

type Vehicle = {
  id: string;
  created_at: string;
  owner_id: string;
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

type VehicleInsert = {
  name: string;
  description: string;
  fuel_type: string;
  message: string;
  owner: string;
  owner_name: string;
};

// in function in this file im passing arguments like an class object
// function(this,this,this)
// change it to function({this,this,this}) will be easy to work with

export async function insertVehicle(vehicleData: VehicleInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle")
    .insert(vehicleData)
    .select();
  if (error) throw error;
  return data;
}

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

export async function updateVehicleStatus(bikeId: string, status: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle")
    .update({ availability: "Booked" })
    .eq("id", bikeId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getVehicleStatus(vehicleId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle")
    .select("availability")
    .eq("id", vehicleId)
    .single();
  if (error) throw error;
  return data.availability;
}

// ------------- upload images ---------
export async function uploadImage(
  userID: string,
  file: File,
  bucketName: string,
) {
  const supabase = await createClient();
  const { error } = await supabase.storage
    .from(bucketName)
    .upload(`${userID}.png`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return { error: error.message };
  }
  return { success: "Upload successful" };
}

// -------------------user related queries ----------------

export async function getUserById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function isLoggedIn(): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.auth.getUser();
  if (error) {
    return false;
  }
  return true;
}

export async function getAuthUserId(): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user.id;
}

export async function getUserStatus() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("status")
    .eq("id", data.user.id)
    .single();
  if (userError) throw error;
  return userData.status;
}

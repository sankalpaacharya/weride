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

type rentalRequests = {
  user: {
    name: string;
    profileUrl: string;
  };
  rideDetails: {
    status: string;
    location: string;
    duration: number;
    distance: number;
    startTimeDate: string;
    endTimeDate: string;
    timeleft: number;
    vehicle_name: string;
    price: string;
  };
};


class SupabasClient{

  

}

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

export async function getActiveRide() {
  const supabase = await createClient();
  const {data:userData} = await supabase.auth.getUser()
  const {data,error} = await supabase.from("order").select("*, owner_id(email,phone,name,id)").eq("renter_id",userData.user?.id).in("status",["active","pending"]).single()
  if(error) throw error
  return data

}


export async function updateProfile() {

}


export async function getRentalRequests(): Promise<rentalRequests[]> {
  const supabase = await createClient();
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError)
      throw new Error(`User authentication error: ${userError.message}`);
    if (!userData || !userData.user)
      throw new Error("User data is undefined or null");

    const { data: orderData, error: orderError } = await supabase
      .from("order")
      .select(
        `
        status,
        created_at,
        location,
        rent_hour,
        estimated_km,
        user:users!owner_id(name,id),
        vehicle(name, price)
      `,
      ) //user table mein 2 foreign key refrences so syntax -> user:users!owner_id(name,id)
      .order("created_at", { ascending: false }) // sort according to recent order first
      .or(`renter_id.eq.${userData.user.id},owner_id.eq.${userData.user.id}`);
    if (orderError) {
      console.error("Order query error:", orderError.message);
      throw orderError;
    }
    if (!orderData) return []; // Return an empty array if no data is found

    const rentalRequests = orderData.map((order) => {
      const createdAt = new Date(order.created_at);
      const estimatedHours = order.rent_hour;
      const endTime = new Date(createdAt);
      endTime.setHours(endTime.getHours() + estimatedHours);
      const timeleft = Math.max(
        0,
        Math.floor((endTime.getTime() - new Date().getTime()) / (1000 * 60)), //abhi ke liye *60 karke  minutes me rakha hain
      );

      return {
        user: {
          name: (order.user as unknown as { name: string }).name, // bc typescript ki BT hai, object hai fir bhi usko lag raha hai array hai
          profileUrl: `https://cxlnoycrdkdkdezryaph.supabase.co/storage/v1/object/public/Profile/${(order.user as unknown as { id: string }).id}.png`,
        },
        rideDetails: {
          status: order.status,
          location: order.location,
          duration: order.rent_hour,
          distance: parseInt(order.estimated_km || "0"),
          startTimeDate: `${createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}, ${createdAt.toLocaleDateString()}`,
          endTimeDate: `${endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}, ${endTime.toLocaleDateString()}`,
          timeleft,
          vehicle_name: (order.vehicle as unknown as { name: string }).name,
          price: (order.vehicle as unknown as { price: string }).price,
        },
      };
    });
    return rentalRequests;
  } catch (error) {
    console.error("Error in getOrderByStatus:", error);
    throw error;
  }
}

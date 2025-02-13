"use server";
import { createClient } from "@/utils/supabase/server";
import { TcheckOutSchema, checkOutSchema } from "../schemas/checkOutSchema";
import {
  getUserById,
  getVehicleStatus,
  updateVehicleStatus,
} from "../supabase/queries";
import { discordOwnerRentRequest, sendDiscordMessage } from "../utils";
import { sendMail } from "../../resend/mail";

interface RentCheckoutResult {
  success?: string;
  error?: string;
}

interface VehicleInfo {
  name: string;
}

interface OwnerInfo {
  email: string;
  name: string;
}

export async function rentCheckoutAction(
  data: TcheckOutSchema,
): Promise<RentCheckoutResult> {
  const supabase = await createClient();

  try {
    // Validate input data
    const result = checkOutSchema.safeParse(data);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }

    // Check vehicle availability
    const vehicleStatus = await getVehicleStatus(data.bikeId);
    if (vehicleStatus === "Pending") {
      return { error: "Oops! Vehicle just booked by another rider" };
    }
    if (vehicleStatus === "Booked") {
      return { error: "This vehicle is already booked" };
    }

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: "User not authenticated" };
    }

    // Fetch additional data
    const [rentUser, vehicleInfo, ownerInfo] = await Promise.all([
      getUserById(user.id),
      fetchVehicleName(supabase, data.bikeId),
      fetchOwnerInfo(supabase, data.ownerId),
    ]);

    // Prepare order data
    const insertData = {
      renter_id: user.id,
      owner_id: data.ownerId,
      bike_id: data.bikeId,
      location: data.location,
      rent_hour: data.hour,
      pickup_location: data.pickUpLocation,
    };

    // Insert order
    const { error: orderError } = await supabase
      .from("order")
      .insert(insertData)
      .select();
    if (orderError) {
      return { error: "Cannot add data to the orders table" };
    }

    // Update vehicle status
    const vehicleData = await updateVehicleStatus(data.bikeId, "Pending");

    // Send email to owner
    await sendMail(
      ownerInfo.email,
      ownerInfo.name,
      rentUser.name,
      data.hour,
      data.pickUpLocation,
      rentUser.phone,
      vehicleInfo.name,
      data.location,
    );

    // Send Discord message
    await sendDiscordMessage(
      vehicleData.owner_id || "",
      discordOwnerRentRequest({
        renterName: rentUser.name,
        location: data.location,
        hours: data.hour,
      }),
    );

    return { success: "Your ride is confirmed" };
  } catch (error) {
    console.error("Rent checkout error:", error);
    return { error: "Could not complete vehicle rental" };
  }
}

async function fetchVehicleName(
  supabase: any,
  bikeId: string,
): Promise<VehicleInfo> {
  const { data, error } = await supabase
    .from("vehicle")
    .select("name")
    .eq("id", bikeId)
    .single();

  if (error) {
    console.error("Could not fetch vehicle", error);
    throw new Error("Could not fetch vehicle");
  }

  return data;
}

// Helper function to fetch owner information
async function fetchOwnerInfo(
  supabase: any,
  ownerId: string,
): Promise<OwnerInfo> {
  const { data, error } = await supabase
    .from("users")
    .select("email,name")
    .eq("id", ownerId)
    .single();

  if (error) {
    console.error("Error fetching owner's email:", error);
    throw new Error("Couldn't fetch owner's email");
  }

  return data;
}

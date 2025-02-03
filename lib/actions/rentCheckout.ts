"use server";
import { createClient } from "@/utils/supabase/server";
import { TcheckOutSchema, checkOutSchema } from "../schemas/checkOutSchema";
import {
  getUserById,
  getVehicleStatus,
  updateVehicleStatus,
} from "../supabase/queries";
import {
  discordOwnerRentRequest,
  discordRenterMessageMaker,
  sendDiscordMessage,
} from "../utils";

export async function rentCheckoutAction(data: TcheckOutSchema) {
  try {
    const vehicleStatus = await getVehicleStatus(data.bikeId);

    if (vehicleStatus === "Booked") {
      return { error: "This vehicle is already booked" };
    }
    const result = checkOutSchema.safeParse(data);
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const rentUser = await getUserById(user?.id || "");
    const insertData = {
      renter_id: user?.id,
      owner_id: data.ownerId,
      bike_id: data.bikeId,
      location: data.location,
      rent_hour: data.hour,
    };
    const { error } = await supabase.from("order").insert(insertData).select();

    if (error) {
      return { error: "can't data add to the orders table" };
    }
    const vehicleData = await updateVehicleStatus(data.bikeId, "Pending");
    // send the discord message if user has discord id in db else skip this part
    await sendDiscordMessage(
      user?.id || "",
      discordRenterMessageMaker(
        vehicleData.owner_name,
        data.location,
        vehicleData?.name,
      ),
    );
    await sendDiscordMessage(
      vehicleData.owner_id || "",
      discordOwnerRentRequest({
        renterName: rentUser.name,
        location: data.location,
        hours: data.hour,
      }),
    );
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { success: "your ride is confirmed" };
  } catch (error) {
    console.log(error);
    return { error: "wouldn't rent a vehicle rn" };
  }
}

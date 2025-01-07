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
    const vechileStatus = await getVehicleStatus(data.bikeId);

    if (vechileStatus === "Booked") {
      return { error: "This vechile is already booked" };
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
      estimated_km: data.kilometer,
    };
    const { error } = await supabase.from("order").insert(insertData).select();

    if (error) {
      return { error: "can't data add to the orders table" };
    }
    const vechileData = await updateVehicleStatus(data.bikeId, "Booked");
    await sendDiscordMessage(
      user?.id || "",
      discordRenterMessageMaker(
        vechileData.owner_name,
        data.location,
        vechileData?.name,
      ),
    );
    await sendDiscordMessage(
      vechileData.owner_id || "",
      discordOwnerRentRequest({
        renterName: rentUser.name,
        location: data.location,
        hours: data.hour,
        kilometers: data.kilometer,
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

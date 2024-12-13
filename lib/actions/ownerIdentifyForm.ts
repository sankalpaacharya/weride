"use server"
import { createClient } from "@/utils/supabase/server";
import {
  ownerIdentitySchema,
} from "../schemas/ownerIdentitySchema";

export async function ownerIdentityAction(formData:FormData) {
const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) {
    return { error: "User is not logged in" };
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", authData?.user?.id);

  if (userError) {
    return { error: "No user found" };
  }

  if (userData[0].status === "pending" || userData[0].status === "verified") {
    return { error: "Your account is in review state" };
  }
  const data = {
      collegeIDPhoto: formData.get("collegeIDPhoto"),
      hostelIDPhoto: formData.get("hostelIDPhoto"),
      profilePhoto: formData.get("profilePhoto"),
      vehiclePhoto: formData.get("vehiclePhoto"),
      QRPhoto: formData.get("QRPhoto"),
      hostelBlock: formData.get("hostelBlock"),
      hostelRoom: formData.get("hostelRoom"),
      vehicleName: formData.get("vehicleName"),
      vehicleDescription: formData.get("vehicleDescription"),
      messageToRenter: formData.get("messageToRenter"),
      fuelType: formData.get("fuelType"),
      rollno: formData.get("rollno")
} 

  const result = ownerIdentitySchema.safeParse(formData);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }
await supabase
    .from("users")
    .update({
      hostel_room: data.hostelRoom,
      hostel_block: data.hostelBlock,
      rollno: data.rollno,
      status: "pending",
    })
    .eq("id", authData?.user?.id);
await supabase
      .from("vehicle")
      .insert({name:data.vehicleName,description:data.vehicleDescription,fuel_type:data.fuelType,message:data.messageToRenter,owner:authData.user.id}).eq("id",authData.user.id)
  return { message: "testing the for" };
}

"use server"
import { createClient } from "@/utils/supabase/server";
import {
  TrenterIdentitySchema,
  renterIdentitySchema,
} from "../schemas/renterIdentitySchema";



export async function renterFormAction(data: any) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return { error: "User is not logged in" };
  }
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id);
  if (userError) {
    return { error: "No user found" };
  }
  if (userData[0].status == "pending" || userData[0].status == "verified") {
    return { error: "Your account is in review state" };
  }

  const formData: TrenterIdentitySchema = {
    hostelBlock: data.get("hostelBlock"),
    hostelRoom: data.get("hostelRoom"),
    rollno: data.get("rollno"),
    collegeIDPhoto: data.get("collegeIDPhoto"),
    hostelIDPhoto: data.get("hostelIDPhoto"),
    drivingLicencePhoto: data.get("drivingLicencePhoto"),
    profilePhoto: data.get("profilePhoto"),
  };

  const result = renterIdentitySchema.safeParse(formData);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  await supabase
    .from("users")
    .update({
      hostel_room: formData.hostelRoom,
      hostel_block: formData.hostelBlock,
      rollno: formData.rollno,
      status: "pending",
    })
    .eq("id", user?.id);

  if (data) {
    return { sucess: "Your information has been added!" };
  }
  return { error: "Received the message" };
}
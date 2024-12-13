"use server";
import { createClient } from "@/utils/supabase/server";
import { ownerIdentitySchema } from "../schemas/ownerIdentitySchema";

async function uploadImage(userID: string, file: File, fileName: string) {
  const supabase = await createClient();
  const { error } = await supabase.storage
    .from(fileName)
    .upload(`${userID}.png`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return { error: error.message };
  }
  return { success: "Upload successful" };
}
export async function ownerIdentityAction(formData: any) {
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
  // Object.fromentries(formData) can be done instead of creating this data object, will reduce the noloc
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
    rollno: formData.get("rollno"),
  };

  const result = ownerIdentitySchema.safeParse(data);
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
    .insert({
      name: data.vehicleName,
      description: data.vehicleDescription,
      fuel_type: data.fuelType,
      message: data.messageToRenter,
      owner: authData.user.id,
    })
    .eq("id", authData.user.id);
  if (authData?.user?.id) {
    const uploadPromises = [
      uploadImage(authData.user.id, data.collegeIDPhoto, "CollegeID"),
      uploadImage(authData.user.id, data.hostelIDPhoto, "HostelID"),
      uploadImage(authData.user.id, data.profilePhoto, "Profile"),
    ];

    const uploadResults = await Promise.all(uploadPromises);

    const uploadErrors = uploadResults.filter((res) => res.error);
    if (uploadErrors.length > 0) {
      return { error: uploadErrors.map((err) => err.error).join(", ") };
    }
  }
  return { message: "testing the for" };
}

"use server";
import { createClient } from "@/utils/supabase/server";
import { ownerIdentitySchema } from "../schemas/ownerIdentitySchema";
import { insertVehicle, uploadImage } from "../supabase/queries";
// make use of facade design pattern
//  for different db query, make a file which has a function for getting user updating upserting etc
// make a available status  column in vehicle field, check bikecard component

//  if there is error at any state or any point whole things should throw error,
//  this is bringing the inconsistency in the database
// make an rpc for the transaction, which is not needed at the development time we will figure this later on
export async function ownerIdentityAction(formData: any) {
  try {
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
    const data = Object.fromEntries(formData);

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
        status: "Available",
      })
      .eq("id", authData?.user?.id);

    const vehicleData = await insertVehicle({
      name: data.vehicleName,
      description: data.vehicleDescription,
      fuel_type: data.fuelType,
      message: data.messageToRenter,
      owner_id: authData.user.id,
      owner_name: userData[0].name,
    });
    if (authData?.user?.id && vehicleData) {
      const uploadPromises = [
        uploadImage(authData.user.id, data.collegeIDPhoto, "CollegeID"),
        uploadImage(authData.user.id, data.hostelIDPhoto, "HostelID"),
        uploadImage(authData.user.id, data.profilePhoto, "Profile"),
        uploadImage(
          vehicleData[0].id + "_front",
          data.vehiclePhotoFront,
          "Vehicle",
        ),
        uploadImage(
          vehicleData[0].id + "_side",
          data.vehiclePhotoSide,
          "Vehicle",
        ),
        uploadImage(
          vehicleData[0].id + "_back",
          data.vehiclePhotoBack,
          "Vehicle",
        ),
        uploadImage(vehicleData[0].id, data.QRPhoto, "QRCode"),
      ];

      const uploadResults = await Promise.all(uploadPromises);

      const uploadErrors = uploadResults.filter((res) => res.error);
      if (uploadErrors.length > 0) {
        return { error: uploadErrors.map((err) => err.error).join(", ") };
      }
    }
    return {
      success: "Your data has been submitted please wait for the verification",
    };
  } catch (error) {
    console.log(error);
    return { error: "couldn't add the data,:((" };
  }
}

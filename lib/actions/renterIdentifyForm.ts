"use server";
import { createClient } from "@/utils/supabase/server";
import {
  renterIdentitySchema,
} from "../schemas/renterIdentitySchema";
import { uploadImage } from "../supabase/queries";
import { getUserById } from "../supabase/queries";


export async function renterFormAction(data: any) {
try {
    const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) {
    return { error: "User is not logged in" };
  }

  const userData = await getUserById(authData.user.id)
  
  if (userData[0].status === "pending" || userData[0].status === "verified") {
    return { error: "Your account is in review state" };
  }

  const formData = {
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
    .eq("id", authData?.user?.id);

  if (authData?.user?.id) {
    const uploadPromises = [
      uploadImage(authData.user.id, formData.collegeIDPhoto, "CollegeID"),
      uploadImage(authData.user.id, formData.hostelIDPhoto, "HostelID"),
      uploadImage(authData.user.id, formData.profilePhoto, "Profile"),
    ];

    const uploadResults = await Promise.all(uploadPromises);

    const uploadErrors = uploadResults.filter((res) => res.error);
    if (uploadErrors.length > 0) {
      return { error: uploadErrors.map((err) => err.error).join(", ") };
    }
  }

  return { success: "Your information has been added!" };
} catch (error) {
 console.log("error") 
}
}

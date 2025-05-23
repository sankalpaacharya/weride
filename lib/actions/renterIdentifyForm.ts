"use server";
import { createClient } from "@/utils/supabase/server";
import { renterIdentitySchema } from "../schemas/IdentificationFormSchema";
import { uploadImage } from "../supabase/queries";
import { getUserById } from "../supabase/queries";
import { notifyNewRegister } from "@/resend/notifyNewRegister";

export async function renterFormAction(data: any) {
  try {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) {
      return { error: "User is not logged in" };
    }

    const userData = await getUserById(authData.user.id);
    if (userData.status === "pending" || userData.status === "verified") {
      return { error: "Your account is in review state" };
    }

    const formData = Object.fromEntries(data);
    const result = renterIdentitySchema.safeParse(formData);

    if (!result.success) {
      return { error: result.error.issues[0].message };
    }

    if (authData?.user?.id) {
      const uploads = [
        { file: formData.collegeIDPhoto, type: "CollegeID" },
        { file: formData.drivingLicencePhoto, type: "DrivingLicence" },
      ];

      for (const upload of uploads) {
        const result = await uploadImage(
          authData.user.id,
          upload.file,
          upload.type,
        );

        if (result.error) {
          return { error: `Failed to upload ${upload.type}: ${result.error}` };
        }
      }
    }

    await Promise.all([
      supabase
        .from("users")
        .update({
          status: "pending",
        })
        .eq("id", authData?.user?.id),
      notifyNewRegister(userData.name),
    ]);

    return { success: "Your information has been added!" };
  } catch (error) {
    console.log(error);
    return { error: "some error has occurred adding the data" };
  }
}

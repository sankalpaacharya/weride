"use server";

import { UpdateUser, updateUser } from "../db/user";

export async function updateUserAction(formData: UpdateUser) {
  try {
    await updateUser({ ...formData });
    return { message: "Profile has been updated", errors: null };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred while updating the profile",
      errors: {
        form: ["Failed to update profile"],
      },
    };
  }
}

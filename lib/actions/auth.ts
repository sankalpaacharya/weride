"use server";
import { TsignInSchema, signInSchema } from "@/lib/schemas/signInSchema";
import { TloginSchema, loginInSchema } from "@/lib/schemas/logInSchema";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { renterIdentitySchema } from "../schemas/renterIdentitySchema";

export async function signupAction(data: TsignInSchema) {
  const result = signInSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }
  const supabase = await createClient();
  const { confirmPassword, password, ...formData } = data;
  const { data: userData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  console.log(userData, error);
  if (error) {
    console.log(error);
    return { error: "Oops, an error occured!" };
  }
  const response = await supabase
    .from("users")
    .insert({ id: userData.user?.id, ...formData });
  if (response.error) {
    if (response.error.code === "23505") {
      return { error: "Account already exists with this email ID" };
    }
    return { error: "Oops, an error occured!" };
  }
  if (userData.user) {
    return { success: "Confirm your email" };
  }
  return { message: "Welcome!!" };
}

export async function loginAction(data: TloginSchema) {
  const result = loginInSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }
  const supabase = await createClient();
  const { data: userData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error?.message };
  }
  if (userData.user == null) {
    return { error: "Invalid login credentials" };
  }
  if (userData.user) {
    redirect("/");
  }
  return { error: "Oops, error occured" };
}

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

  const formData = Object.fromEntries(data);

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

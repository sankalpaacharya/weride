"use server";
import { TsignInSchema, signInSchema } from "@/app/schemas/signInSchema";
import { TloginSchema, loginInSchema } from "@/app/schemas/logInSchema";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { TrenterIdentitySchema } from "../schemas/renterIdentitySchema";
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
  console.log('form hitz')
  console.log(userData,error)
  if (error) {
    console.log(error)
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
  const formData: TrenterIdentitySchema = data;
  console.log(data);
  if (data) {
    return { message: "Received the message" };
  }
  return { error: "Received the message" };
}

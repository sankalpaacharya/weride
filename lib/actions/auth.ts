"use server";
import { TsignInSchema, signInSchema } from "@/lib/schemas/registerSchema";
import { TloginSchema, loginInSchema } from "@/lib/schemas/logInSchema";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signupAction(data: TsignInSchema) {
  const result = signInSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const supabase = await createClient();
  const { confirmPassword, password, ...formData } = data;

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from("users")
    .select()
    .eq("email", data.email)
    .single();

  if (existingUser) {
    return { error: "Account already exists with this email ID" };
  }

  // Sign up the user
  const { data: userData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    return { error: "Oops, an error occurred!" };
  }

  // Insert user data into users table
  const response = await supabase
    .from("users")
    .insert({ id: userData.user?.id, ...formData });

  if (response.error) {
    console.error(response.error);
    return { error: "Oops, an error occurred!" };
  }

  return {
    success:
      "Verification email sent! Please check your inbox to verify your account.",
    email: data.email,
  };
}

export async function loginAction(data: TloginSchema) {
  const result = loginInSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const supabase = await createClient();

  // First, try to sign in
  const { data: userData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  // If there's an error about email not being confirmed
  if (error?.message?.includes("Email not confirmed")) {
    // Resend verification email
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: data.email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (resendError) {
      return { error: "Failed to resend verification email" };
    }

    return {
      needsVerification:"verify account",
      error:
        "Please verify your email first. We've sent a new verification email.",
      email: data.email,
    };
  }

  // Handle other login errors
  if (error) {
    return { error: error.message };
  }

  if (!userData.user) {
    return { error: "Invalid login credentials" };
  }

  redirect("/");
}

export async function resendVerificationEmail(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: "Failed to resend verification email" };
  }

  return { success: "Verification email resent! Please check your inbox." };
}

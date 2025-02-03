import React from "react";
import ProfileForm from "@/components/profileform";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id);
  if (error) {
    redirect("/");
  }
  const { ...userData } = data[0];

  return <ProfileForm userData={userData} />;
}

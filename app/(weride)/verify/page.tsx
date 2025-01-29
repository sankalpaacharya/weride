import React from "react";
import OwnerForm from "./components/owner-form";
import RenterForm from "./components/renter-form";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  let {
    data: { user },
  } = await supabase.auth.getUser();
  let userData;
  let isPending = false;
  if (user) {
    userData = (await supabase.from("users").select("*").eq("id", user.id))
      .data;
    if (userData) {
      user = userData[0];
      isPending = userData[0].status === "pending";
    }
  }

  return (
    <div className="w-full mt-10">
      {user?.role == "owner" ? (
        <OwnerForm isPending={isPending} />
      ) : (
        <RenterForm isPending={isPending} />
      )}
    </div>
  );
}

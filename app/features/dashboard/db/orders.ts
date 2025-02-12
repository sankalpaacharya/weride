import { createClient } from "@/utils/supabase/server";

export async function updateOrder({
  id,
  status,
  initial_meter_reading,
  final_meter_reading,
}: any) {
  const supabase = await createClient();
  const updateData: any = {
    status,
    initial_meter_reading,
    final_meter_reading,
  };
  if (status === "Active") {
    updateData["accepted_at"] = new Date();
  }
  const { error } = await supabase
    .from("order")
    .update(updateData)
    .eq("id", id);
  if (error) throw error;
}


export async function getAuthUserEmail(): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user.email || "";
}
import { createClient } from "@/utils/supabase/client";


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
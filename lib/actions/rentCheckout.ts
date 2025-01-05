"use server";
import { createClient } from "@/utils/supabase/server";
import { TcheckOutSchema, checkOutSchema } from "../schemas/checkOutSchema";

export async function rentCheckoutAction(data: TcheckOutSchema) {
  const result = checkOutSchema.safeParse(data);
  const supabase  = await createClient()
  const {data:{user}} = await supabase.auth.getUser()
  const insertData = {
    renter_id: user?.id,
    owner_id:data.ownerId,
    bike_id:data.bikeId,
    location:data.location,
    rent_hour:data.hour,
    estimated_km:data.kilometer

  }
  const {data:responseData,error} = await supabase.from("orders").insert(insertData).select()
  console.log(responseData);
  // if(error){
  //   return {error:"can't data add to the orders table"}
  // }
  // before even putting code to database i have to check if the vechile is available or not but for now im just adding 
  //  data 
  // also get the owner_id here then to ask from the client side which can be of full risk
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  return { success: "your ride is confirmed" };
}

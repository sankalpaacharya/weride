import { createClient } from "@/utils/supabase/server";

export type UpdateUser = {
    id:string
    name?:string
    roomNo?:string
    hostelBlock?:string
}

export async function updateUser({id,name,roomNo,hostelBlock}:UpdateUser){
    const supabase = await createClient()
    const {error} = await supabase.from("users").update({name,room_no:roomNo,hostel_block:hostelBlock}).eq("id",id)
    if(error) throw error
}
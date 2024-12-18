import { createClient } from "@/utils/supabase/server";


export async function getVehicles(limit:number = 10){
    const supabase = await createClient()
    const {data,error} = await supabase.from("vehicle").select("*").limit(limit)
    if(error){
        return [{error:"there is some error getting the data"}]
    }
    return data
}

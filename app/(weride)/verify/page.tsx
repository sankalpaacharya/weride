
import React from 'react'
import OwnerForm from './components/owner-form'
import RenterForm from './components/renter-form'
import { createClient } from '@/utils/supabase/server'


export default async function page() {

    const supabase = await createClient();
    let { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const userData = (await supabase.from("users").select("*").eq("id", user.id)).data;
        if (userData) {
            user = userData[0];
        }
    }
    return (
        <div className="w-full mt-10">
            {
                user?.role == "owner" ? <OwnerForm /> : <RenterForm />
            }
        </div>
    )
}

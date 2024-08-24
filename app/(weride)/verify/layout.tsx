import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (user) {
        const response = (await supabase.from("users").select("*").eq("id", user.id)).data;
        if (response) {
            if (response[0].is_verified) {
                redirect('/')
            }
        }
    }
    if (!user) {
        redirect('/login')
    }

    return (
        <div className="w-full">
            {children}
        </div>
    );
}

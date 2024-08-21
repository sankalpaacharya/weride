import { Toaster } from "react-hot-toast";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login')
    }

    return (
        <div>
            {children}
        </div>
    );
}

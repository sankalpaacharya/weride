import NavBar from "@/components/navbar";
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex flex-col min-h-screen overflow-hidden relative">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <NavBar />
            <Header />
            <div className="flex grow w-full">
                {children}
            </div>
        </main>
    );
}

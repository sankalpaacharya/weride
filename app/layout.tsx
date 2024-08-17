import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '400', '500', '700'] });

export const metadata: Metadata = {
  title: "weRide- High Rise Rental",
  description: "WeRide High Rise Rental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className + "overflow-x-hidden"}>{children}</body>
    </html>
  );
}

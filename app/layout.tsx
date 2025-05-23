import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import MapImage from "@/public/images/map.png";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "200", "300", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "weride.live",
  description: "weride-share the wheels, share the fun",
  openGraph: {
    title: "weride.live",
    description: "weride-share the wheels, share the fun",
    url: "https://weride.live",
    siteName: "weride.live",
    images: [
      {
        url: MapImage.src,
        width: 1200,
        height: 630,
        alt: "weride.live - share the wheels, share the fun",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className={`${poppins.className} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "200", "300", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "weride.live",
  description: "weride-share the wheels, share the fun",
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
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>      </body>
    </html>
  );
}

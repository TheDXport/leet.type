import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FaDesktop } from "react-icons/fa";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeetTyper",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Show notice for screens below the `sm` breakpoint */}
        <div className="sm:hidden flex flex-col items-center justify-center min-h-screen bg-black text-white text-center space-y-4">
          <FaDesktop size={40} />
          <div className="w-[40%] ">
            <p className="font-bold">Please use a desktop view to access</p>
          </div>
        </div>
        {/* Render the app for screens `sm` and above */}
        <div className="hidden sm:block">{children}</div>
      </body>
    </html>
  );
}

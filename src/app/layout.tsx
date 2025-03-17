"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
import SEO from "@/components/head";

const geistSans = Geist({
     variable: "--font-geist-sans",
     subsets: ["latin"],
});

const geistMono = Geist_Mono({
     variable: "--font-geist-mono",
     subsets: ["latin"],
});

export default function RootLayout({
     children,
}: Readonly<{ children: React.ReactNode }>) {
     return (
          <html lang="en">
               <SEO />
               <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 to-black text-white min-h-screen`}>
                    <Navbar />
                    <main className="container mx-auto px-4">
                         {children}
                    </main>
               </body>
          </html>
     );
}

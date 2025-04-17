import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layouts/navbar";
import "./globals.css";
import { Metadata } from "next";
import React from "react";
import { Analytics } from "@vercel/analytics/react"
import DynamicTitle from '@/components/ui/dynamicTitle';
import CursorGlow from '@/components/ui/cursorGlow';

const geistSans = Geist({
     variable: "--font-geist-sans",
     subsets: ["latin"],
});

const geistMono = Geist_Mono({
     variable: "--font-geist-mono",
     subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
     return {
          metadataBase: new URL("https:/firtiansyah.oktaa.my.id"),
          title: "Halo. Oktaa~",
          icons: "/logo-oktaa.svg",
          description: "Firtiansyah Okta Resama, a Web Developer and Full-stack Engineer from Indonesia. Explore my portfolio and projects.",
          keywords: [
               "Firtiansyah Okta Resama",
               "Web Developer",
               "Programmer",
               "Full-stack Engineer",
               "Indonesia",
               "Firtiansyah",
               "Oktaa",
               "Siapa Firtiansyah Okta Resama",
               "tian",
               "Firtiansyah adalah"
          ],
          authors: [{ name: "Firtiansyah Okta Resama", url: "https:/firtiansyah.oktaa.my.id" }],
          
          openGraph: {
               title: "Firtiansyah Okta Resama - Web Developer",
               description: "Portfolio of Firtiansyah Okta Resama - Web Developer & Programmer. Explore my work and skills.",
               url: "https:/firtiansyah.oktaa.my.id",
               siteName: "Firtiansyah Okta Resama",
               images: [
                    {
                         url: "/banner.png",
                         width: 1200,
                         height: 630,
                         alt: "Firtiansyah Okta Resama Portfolio",
                    },
               ],
               type: "website",
          },
          twitter: {
               card: "summary_large_image",
               title: "Firtiansyah Okta Resama - Web Developer",
               description: "Portfolio of Firtiansyah Okta Resama - Web Developer & Programmer. Explore my work and skills.",
               images: ["/banner.png"],
          },
     };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
          <>
          <DynamicTitle />
          <html lang="en-US">
               <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 to-black text-white min-h-screen`}>
                    <Analytics />
                    <Navbar />
                    <CursorGlow />
                    <main className="container mx-auto text-center max-w-4xl">
                         {children}
                    </main>
               </body>
          </html>
          </>
     );
}
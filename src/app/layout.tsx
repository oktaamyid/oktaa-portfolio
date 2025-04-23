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
     const description = "Firtiansyah Okta Resama, Web Developer & Programmer from Indonesia. Passionate about creating impactful websites and staying ahead in tech trends";
     return {
          metadataBase: new URL("https:/firtiansyah.oktaa.my.id"),
          title: "Halo. Oktaa~ | Firtiansyah Okta | Full-stack Engineer & Tech Enthusiast",
          icons: "https://oktaa.my.id/oktaa-black.png",
          description,
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
               "Firtiansyah adalah",
               "Firtiansyah Okta Portfolio Website",
               "Firtiansyah Website"
          ],
          authors: [{ name: "Firtiansyah Okta Resama", url: "https:/firtiansyah.oktaa.my.id" }],
          
          openGraph: {
               title: "Firtiansyah Okta Resama - Web Developer",
               description,
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
               description,
               images: ["/banner.png"],
          },
          robots: {
               index: true,
               follow: true,
          },
          alternates: {
               canonical: "https:/firtiansyah.oktaa.my.id",
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
import { Outfit, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import React from "react";
import { Analytics } from "@vercel/analytics/react"

const outfit = Outfit({
     variable: "--font-poppins",
     subsets: ["latin"],
     weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
     variable: "--font-serif",
     subsets: ["latin"],
     weight: ["400", "500", "600", "700", "800", "900"],
     style: ["normal", "italic"],
});

const lora = Lora({
     variable: "--font-lora",
     subsets: ["latin"],
     weight: ["400", "500", "600", "700"],
     style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
     const baseUrl = "https://hi.oktaa.my.id";
     const description = "Firtiansyah Okta Resama, Web Developer & Programmer from Indonesia. Passionate about creating impactful websites and staying ahead in tech trends";
     return {
          metadataBase: new URL(baseUrl),
          title: "Hi! OKTAA. | Full-stack Engineer & Tech Enthusiast",
          icons: {
               icon: "https://cdn.oktaa.my.id/faviconv2.ico",
               apple: "https://cdn.oktaa.my.id/apple-touch-iconv2.png"
          },
          description,
          keywords: [
               "Firtiansyah Okta Resama",
               "Firtiansyah Okta Website",
               "Firtiansyah",
               "Siapa Firtiansyah Okta Resama",
               "Tian Website",
               "Firtiansyah adalah",
               "Firtiansyah Okta Portfolio Website",
               "Firtiansyah Website",
               "Firtiansyah Okta",
               "Portfolio Firtiansyah Okta"
          ],
          authors: [{ name: "Firtiansyah Okta Resama", url: baseUrl }],

          openGraph: {
               title: "Halo. OKTAA~ | Full-stack Engineer & Tech Enthusiast",
               description,
               url: baseUrl,
               siteName: "Firtiansyah Okta Resama",
               images: [
                    {
                         url: "https://cdn.oktaa.my.id/og-banner%3Dv2.png",
                         width: 1200,
                         height: 630,
                         alt: "Firtiansyah Okta Resama Portfolio",
                    },
               ],
               type: "website",

          },
          twitter: {
               card: "summary_large_image",
               title: "Halo. OKTAA~ | Full-stack Engineer & Tech Enthusiast",
               description,
               images: ["https://cdn.oktaa.my.id/og-banner%3Dv2.png"],
          },
          robots: {
               index: true,
               follow: true,
          },
          alternates: {
               canonical: baseUrl,
          },
     };
}

import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/shared/ScrollToTop";

export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
          <html lang="en" suppressHydrationWarning>
               <head>
                    {/* Preconnect to external domains for better performance */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link rel="preconnect" href="https://cdn.oktaa.my.id" />
                    <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
                    <link rel="dns-prefetch" href="https://api.screenshotmachine.com" />
               </head>
               <body className={`${outfit.variable} ${playfair.variable} ${lora.variable} antialiased`}>
                    <LanguageProvider>
                         {/* <CircleCursor bigSize={30} smallSize={10} blendMode="difference" /> */}
                         <Analytics />
                         {children}
                         <ScrollToTop />
                    </LanguageProvider>
               </body>
          </html>
     );
}

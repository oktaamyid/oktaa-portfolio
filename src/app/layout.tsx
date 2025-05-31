import { Poppins } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import React from "react";
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from 'next-themes';
// import CircleCursor from "@/components/ui/CircleCursor";

const poppins = Poppins({
     variable: "--font-poppins",
     subsets: ["latin"],
     weight: ["400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
     const baseUrl = "https://hi.oktaa.my.id";
     const description = "Firtiansyah Okta Resama, Web Developer & Programmer from Indonesia. Passionate about creating impactful websites and staying ahead in tech trends";
     return {
          metadataBase: new URL(baseUrl),
          title: "Halo. OKTAA~ | Full-stack Engineer & Tech Enthusiast",
          icons: {
               icon: "https://cdn.oktaa.my.id/favicon.ico",
               apple: "https://cdn.oktaa.my.id/apple-touch-icon.png"
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
                         url: "https://cdn.oktaa.my.id/og-banner.png",
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
               images: ["https://cdn.oktaa.my.id/og-banner.png"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
          <html lang="en-ID" suppressHydrationWarning>
               <body className={`${poppins.variable} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 default-pattern`}>
                    {/* <CircleCursor bigSize={30} smallSize={10} blendMode="difference" /> */}
                    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
                         <Analytics />
                         {children}
                    </ThemeProvider>
               </body>
          </html>
     );
}
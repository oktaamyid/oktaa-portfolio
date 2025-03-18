import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
import { Metadata } from "next";

const geistSans = Geist({
     variable: "--font-geist-sans",
     subsets: ["latin"],
});

const geistMono = Geist_Mono({
     variable: "--font-geist-mono",
     subsets: ["latin"],
});

// ✅ Metadata harus ada di layout (Server Component)
export const metadata: Metadata = {
     title: "Firtiansyah Okta Resama - Portfolio",
     icons: ["/logo-oktaa.svg"],
     description: "Firtiansyah Okta Resama is a Web Developer, Programmer, and Full-stack Engineer from Indonesia, specializing in website innovation and backend development.",
     keywords: ["Firtiansyah Okta Resama", "Web Developer", "Programmer", "Full-stack Engineer", "Indonesia"],
     authors: [{ name: "Firtiansyah Okta Resama", url: "https://your-portfolio.com" }],
     openGraph: {
          title: "Firtiansyah Okta Resama - Portfolio",
          description: "Portfolio of Firtiansyah Okta Resama - Web Developer & Programmer",
          url: "https://your-portfolio.com",
          siteName: "Firtiansyah Okta Resama",
          images: [
               {
                    url: "/logo-oktaa.svg",
                    width: 1200,
                    height: 630,
                    alt: "Firtiansyah Okta Resama Portfolio",
               },
          ],
          type: "website",
     },
     twitter: {
          card: "summary_large_image",
          title: "Firtiansyah Okta Resama - Portfolio",
          description: "Portfolio of Firtiansyah Okta Resama - Web Developer & Programmer",
          images: ["/logo-oktaa.svg"],
     },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
          <html lang="en-US">
               <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 to-black text-white min-h-screen`}>
                    <Navbar />
                    <main className="container mx-auto px-4">
                         {children}
                    </main>
               </body>
          </html>
     );
}

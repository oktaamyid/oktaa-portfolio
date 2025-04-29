import { Metadata } from "next";

export const metadata: Metadata = {
     title: "CV. Firtiansyah Oktaa~ | Full-stack Engineer & Tech Enthusiast",
     description: "Curriculum Vitae of Firtiansyah Okta Resama - Full-stack Engineer & Tech Enthusiast",
     openGraph: {
          title: "CV. Oktaa~",
          description: "Curriculum Vitae of Firtiansyah Okta Resama - Full-stack Engineer & Tech Enthusiast",
          images: [
               {
                    url: "https://cdn.oktaa.my.id/banner.png",
                    alt: "Banner showcasing Firtiansyah Okta's CV",
               },
          ],
     },
     twitter: {
          card: "summary_large_image",
          title: "CV. Oktaa~",
          description: "Curriculum Vitae of Firtiansyah Okta Resama - Full-stack Engineer & Tech Enthusiast",
          images: ["https://cdn.oktaa.my.id/banner.png"],
     },
     robots: {
          index: true,
          follow: true,
     },
     alternates: {
          canonical: "https://firtiansyah.oktaa.my.id/cv",
     },
     icons: {
          icon: "https://cdn.oktaa.my.id/favicon.ico",
          apple: "https://cdn.oktaa.my.id/apple-touch-icon.png",
     },
     keywords: [
          "Firtiansyah Okta Resama",
          "Curriculum Vitae",
          "CV",
          "Firtiansyah Okta",
          "Oktaa",
          "Firtiansyah",
          "Firtiansyah Okta CV",
          "Firtiansyah Okta Resama CV",
     ],
     authors: [{ name: "Firtiansyah Okta Resama", url: "https://firtiansyah.oktaa.my.id" }],
};

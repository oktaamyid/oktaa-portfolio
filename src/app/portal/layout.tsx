import { getProfile } from "@/lib/service";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

     const description = 'Explore the personal link sharing platform to discover and connect with Firtiansyah Okta or OKTAA~.'

     try {
          const profile = await getProfile();

          if (!profile) {
               return {
                    title: 'Portal. OKTAA~ | Full-stack Engineer & Tech Enthusiast',
                    description: description
               };
          }

          return {
               title: `@${profile.username} | Portal. OKTAA~`,
               description: description,
               icons: profile.profilePicture ? [{ url: profile.profilePicture }] : [],
               openGraph: {
                    title: `@${profile.username} | OKTAA~ Portal.`,
                    description: description,
                    images: [
                         {
                              url: 'https://cdn.oktaa.my.id/og-banner.png',
                              alt: 'Banner showcasing Firtiansyah Okta',
                         },
                    ],
               },
               twitter: {
                    card: 'summary_large_image',
                    title: `@${profile.username} | Oktaa Portal`,
                    description: description,
                    images: ['https://cdn.oktaa.my.id/og-banner.png'],
               },
               keywords: [
                    "Firtiansyah Okta Portfolio Website",
                    "Firtiansyah Website",
                    "Firtiansyah Portal",
                    "Portal Firtiansyah Okta",
                    "Firtiansyah Okta",
                    "Firtiansyah Okta Resama",
                    "Firtiansyah Okta Profile",
                    "Firtiansyah Okta Links",
                    "Firtiansyah Okta Website",
                    "Okta Website"
               ],
               authors: [{ name: 'Oktaa', url: 'https://hi.oktaa.my.id' }],
               robots: {
                    index: true,
                    follow: true
               },
               alternates: {
                    canonical: 'https://hi.oktaa.my.id/portal',
               }
          };
     } catch (error) {
          console.error('Gagal mengambil metadata:', error);
          return {
               title: 'Portal. OKTAA~ | Full-stack Engineer & Tech Enthusiast',
               description: description
          };
     }
}

export default function PortalLayout({
     children,
}: {
     children: React.ReactNode;
}) {
     return (
          <main className="relative z-10 "> {children} </main>
     );
}
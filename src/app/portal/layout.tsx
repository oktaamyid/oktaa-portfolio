import { getProfile } from "@/lib/service";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
     try {
          const profile = await getProfile();

          if (!profile) {
               return {
                    title: 'Oktaa Portal',
                    description: 'Personal Link Sharing Platform, a place to share my links and connect with others.'
               };
          }

          return {
               title: `@${profile.username} | Oktaa Portal`,
               description: profile.bio || 'Personal Link Sharing Platform, a place to share my links and connect with others.',
               icons: profile.profilePicture ? [{ url: profile.profilePicture }] : [],
               openGraph: {
                    title: `@${profile.username} | OKTAA~ Portal.`,
                    description: profile.bio || 'Personal Link Sharing Platform, a place to share my links and connect with others.',
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
                    description: profile.bio || 'Personal Link Sharing Platform, a place to share my links and connect with others.',
                    images: ['https://cdn.oktaa.my.id/og-banner.png'],
               },
               keywords: [
                    "Firtiansyah Okta Portfolio Website",
                    "Firtiansyah Website",
                    "OKTAA Portal",
                    "Firtiansyah Portal",
                    "Portal Firtiansyah Okta",
                    "Firtiansyah",
                    "Oktaa",
                    "Firtiansyah Okta",
                    "Firtiansyah Okta Resama",
                    "Firtiansyah Okta Profile",
                    "Firtiansyah Okta Links",
                    "Firtiansyah Okta Social Media",
                    "Okta Website"
               ],
               authors: [{ name: 'Oktaa', url: 'https://hi.oktaa.my.id' }],
               robots: {
                    index: false,
                    follow: false
               }
          };
     } catch (error) {
          console.error('Gagal mengambil metadata:', error);
          return {
               title: 'Oktaa Portal',
               description: 'Personal Link Sharing Platform'
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
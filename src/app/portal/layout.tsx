import { Metadata } from "next";

// Metadata khusus untuk portal
export const metadata: Metadata = {
     title: "Portal | Firtiansyah Okta",
     description: "Portal dashboard for managing content",
     robots: {
          index: false, 
          follow: false
     }
};


export default function PortalLayout({
     children,
}: {
     children: React.ReactNode;
}) {
     return (
          <main className="relative z-10 "> {children} </main>          
     );
}
"use client";

import { Navigation, Footer } from '@/components/shared';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
     return (
          <>
               <Navigation />
               <main className="min-h-screen pt-28">
                    {children}
               </main>
               <Footer />
          </>
     )
}
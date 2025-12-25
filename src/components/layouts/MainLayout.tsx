import { Navigation, Footer } from '@/components/shared';

export default function MainLayout({ children }: { children: React.ReactNode }) {
     return (
          <>
               <Navigation />
               <main>{children}</main>
               <Footer />
          </>
     )
}
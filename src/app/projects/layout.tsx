import { ReactNode } from 'react';
import { Navigation, Footer } from '@/components/shared';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-28">
        {children}
      </main>
      <Footer />
    </>
  );
}

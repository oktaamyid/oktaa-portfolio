"use client";

import { Navigation, Footer } from '@/components/shared';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navigation />
            <main className="">
                {children}
            </main>
            <Footer />
        </>
    );
}

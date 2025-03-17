"use client";

import { ReactTyped } from "react-typed";
import Link from "next/link";
import SidebarSocials from '@/components/sidebarSocials';

export default function Home() {
    return (
        <div className="text-white flex items-center justify-center h-screen font-sans relative">
            <SidebarSocials />

            <main className="text-center">
                {/* About Me */}
                <section id="about">
                    <h1 className="text-6xl font-extrabold text-gray-100">
                        Hi, I&apos;m {" "}
                        <ReactTyped
                            strings={["Firtiansyah Okta Resama", "a Web Developer", "a Tech Enthusiast"]}
                            typeSpeed={100}
                            backSpeed={50}
                            loop
                        />
                    </h1>
                    <p className="text-gray-400 mt-4 text-xl max-w-2xl mx-auto">
                        Passionate about web development, programming, and exploring the latest technology trends.
                        I specialize in creating dynamic and interactive websites while continuously learning new technologies.
                    </p>
                    <Link
                        href="/cv#portfolio"
                        className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
                    >
                        Show Projects
                    </Link>
                </section>
            </main>
        </div>
    );
}

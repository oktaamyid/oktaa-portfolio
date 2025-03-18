"use client";

import { ReactTyped } from "react-typed";
import Link from "next/link";
import SidebarSocials from "@/components/sidebarSocials";

export default function Home() {
    return (
        <div className="text-white flex items-center justify-center min-h-screen font-sans relative px-4 sm:px-8">
            {/* Sidebar Socials */}
            <SidebarSocials />

            <main className="text-center max-w-4xl">
                {/* About Me */}
                <section id="about">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-100 leading-tight">
                        Hi, I&apos;m{" "}
                        <ReactTyped
                            strings={["Firtiansyah Okta Resama", "a Web Developer", "a Tech Enthusiast"]}
                            typeSpeed={100}
                            backSpeed={50}
                            loop
                        />
                    </h1>
                    <p className="text-gray-400 mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                        Passionate about web development, programming, and exploring the latest technology trends.
                        I specialize in creating dynamic and interactive websites while continuously learning new technologies.
                    </p>
                    <Link
                        href="/cv#portfolio"
                        className="mt-6 inline-block px-5 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
                    >
                        Show Projects
                    </Link>
                </section>
            </main>
        </div>
    );
}

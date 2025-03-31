"use client";

import { ReactTyped } from "react-typed";
import Link from "next/link";
import SidebarSocials from "@/components/layouts/sidebarSocials";

export default function Home() {
    return (
        <div className="text-white flex items-center justify-center min-h-screen sm:min-h-screen font-sans relative px-4 sm:px-8">
            {/* Sidebar Socials */}
            <SidebarSocials />

            <div className="text-center max-w-2xl sm:max-w-4xl w-full">
                {/* About Me */}
                <section id="about">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-100 sm:leading-tight">
                        Hi, I&apos;m{" "}
                        <span className="">
                            <ReactTyped
                                strings={["Firtiansyah Okta Resama", "a Web Developer", "a Tech Enthusiast"]}
                                typeSpeed={100}
                                backSpeed={50}
                                loop
                            />
                        </span>
                    </h1>
                    <p className="text-gray-400 mt-4 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-2xl mx-auto">
                        Passionate about web development, programming, and exploring the latest technology trends.
                        I specialize in creating dynamic and interactive websites while continuously learning new technologies.
                    </p>
                    <Link
                        href="/cv#portfolio"
                        className="mt-6 inline-block px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
                    >
                        Show Projects
                    </Link>
                </section>
            </div>
        </div>
    );
}

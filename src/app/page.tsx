"use client";

import { FaGithub, FaLinkedin, FaInstagram, FaHtml5, FaCss3, FaJs, FaReact } from "react-icons/fa";
import { ReactTyped } from "react-typed";
import { Card, CardContent } from "@/components/ui/Card";

export default function Home() {
    return (
        <>
        <div className="text-white flex flex-col items-center font-sans">
            <main className="mt-24 max-w-3xl w-full p-6">
                {/* About Me */}
                <section id="about" className="text-center">
                    <h1 className="text-4xl font-bold text-gray-100">
                        Hi, I&apos;m {" "}
                        <ReactTyped
                            strings={["Firtiansyah Okta Resama", "a Web Developer", "a Programmer"]}
                            typeSpeed={100}
                            backSpeed={50}
                            loop
                        />
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">Web Developer | Tech Enthusiast</p>
                    <div className="flex justify-center space-x-5 mt-5">
                        <a href="#" className="text-gray-400 text-2xl hover:text-blue-400 transition">
                            <FaGithub />
                        </a>
                        <a href="#" className="text-gray-400 text-2xl hover:text-blue-400 transition">
                            <FaLinkedin />
                        </a>
                        <a href="#" className="text-gray-400 text-2xl hover:text-blue-400 transition">
                            <FaInstagram />
                        </a>
                    </div>
                </section>

                {/* Experience */}
                <section className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-200">Experience</h2>
                    <Card className="mt-4">
                        <CardContent>
                            <p className="text-lg font-semibold text-gray-100">[Job Title]</p>
                            <p className="text-gray-400">[Company] - [Year]</p>
                            <p className="text-gray-300 mt-2">[Short description about your role]</p>
                        </CardContent>
                    </Card>
                </section>

                {/* Education */}
                <section className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-200">Education</h2>
                    <Card className="mt-4">
                        <CardContent>
                            <p className="text-lg font-semibold text-gray-100">[Degree]</p>
                            <p className="text-gray-400">[University Name] - [Year]</p>
                        </CardContent>
                    </Card>
                </section>

                {/* Tech Stack */}
                <section className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-200">Tech Stack</h2>
                    <div className="flex space-x-6 mt-4 text-gray-400 text-4xl">
                        <FaHtml5 className="hover:text-red-400 transition" />
                        <FaCss3 className="hover:text-blue-400 transition" />
                        <FaJs className="hover:text-yellow-400 transition" />
                        <FaReact className="hover:text-blue-500 transition" />
                    </div>
                </section>
            </main>
        </div>
        </>
    );
}

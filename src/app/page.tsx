/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Project } from '@/lib/types';
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import StarBackground from "@/components/ui/StarBackground"

export default function Home() {
    const pageRef = useRef(null);
    const projectsRef = useRef(null);
    const moreAboutRef = useRef(null);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const isProjectsInView = useInView(projectsRef, { once: true, margin: "-100px" });
    const isMoreAboutInView = useInView(moreAboutRef, { once: true, margin: "-50px" });

    // Animation variants that replicate the original GSAP animations
    const animateOnScroll = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    // Hero animations to match original
    const heroAnimation = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
    };

    const heroDelayAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
            },
        },
    };

    useEffect(() => {

        const fetchData = async <T,>(collectionName: string, setter: (data: T[]) => void) => {
            try {
                const querySnapshot = await getDocs(collection(db, collectionName));
                let data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as T[];

                if (collectionName === "projects") {
                    data = await Promise.all(
                        (data as Project[]).map(async (project) => {
                            const screenshotUrl = `https://api.screenshotmachine.com?key=ae018e&url=${encodeURIComponent(project.link)}&dimension=1280x800`;
                            return { ...project, image: screenshotUrl };
                        })
                    ) as T[];
                }

                setter(data);
            } catch (error) {
                console.error(`Error fetching ${collectionName}:`, error);
            }
        };

        const loadAllData = async () => {
            await Promise.all([
                fetchData<Project>("projects", setProjects),
            ]);
            setLoading(false);
        };

        // tsparticles.load("hero-particles", {
        //     background: {
        //         color: {
        //             value: "#1a202c", // Latar belakang gelap agar sesuai dengan desain Anda
        //         },
        //     },
        //     particles: {
        //         number: {
        //             value: 30, // Jumlah asteroid
        //             density: {
        //                 enable: true,
        //                 value_area: 800,
        //             },
        //         },
        //         color: {
        //             value: ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00"], // Warna-warni
        //         },
        //         shape: {
        //             type: "circle", // Bentuk asteroid sederhana
        //         },
        //         opacity: {
        //             value: 0.7,
        //             random: true,
        //             anim: {
        //                 enable: true,
        //                 speed: 1,
        //                 opacity_min: 0.1,
        //                 sync: false,
        //             },
        //         },
        //         size: {
        //             value: 3,
        //             random: true,
        //             anim: {
        //                 enable: true,
        //                 speed: 2,
        //                 size_min: 1,
        //                 sync: false,
        //             },
        //         },
        //         move: {
        //             enable: true,
        //             speed: 2,
        //             direction: "none", // Gerakan acak
        //             random: true,
        //             straight: false,
        //             outMode: "out", // Asteroid hilang saat keluar layar
        //             attract: {
        //                 enable: false,
        //                 rotateX: 600,
        //                 rotateY: 1200,
        //             },
        //         },
        //     },
        //     interactivity: {
        //         events: {
        //             onHover: {
        //                 enable: true,
        //                 mode: "repulse", // Asteroid menjauh saat kursor mendekat
        //             },
        //         },
        //     },
        // });

        loadAllData();
    }, []);

    return (
        <div ref={pageRef}>
            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                id="home"
                className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 relative overflow-hidden default-pattern"
            >
                <StarBackground/>
                <div className="text-center px-4 z-10 relative">
                    <div className="relative w-72 md:w-80 h-72 md:h-80 mx-auto my-5">
                        <img src="https://cdn.oktaa.my.id/apple-touch-icon.png" alt="Memoji" className="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" />

                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 md:w-56 h-44 md:h-56 border-2 border-dashed border-gray-400/30 rounded-full z-10 "
                        />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 border-2 border-dashed border-gray-400/30 rounded-full z-10"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] md:w-[34rem] h-[26rem] md:h-[34rem] border-2 border-dashed border-gray-400/30 rounded-full z-10"
                        />

                        <motion.span 
                            animate={{ translateY: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                            className="absolute -top-12 left-1/3 -translate-x-1/2 md:-top-12 md:left-1/4 md:-translate-x-1/2 bg-[#61DAFB] dark:bg-[#61DAFB] text-black text-sm font-semibold px-4 py-1 rounded-full shadow-md z-20 ">React.js</motion.span>
                        <motion.span
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute top-1/4 right-48 md:top-1/4 md:right-80 bg-[#FF2D20] dark:bg-[#FF2D20] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md z-20"
                        >
                            Laravel
                        </motion.span>
                        <motion.span 
                            animate={{ translateX: [0, -4, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                            className="absolute bottom-1/4 left-52 md:bottom-1/4 md:left-72 bg-black dark:bg-black text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md z-20">Next.js</motion.span>
                        <motion.span
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute bottom-0 left-1/2 md:bottom-4 md:left-1/2 md:-translate-x-1/2 bg-[#00758F] dark:bg-[#00758F] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md z-20"
                        >
                            MySQL
                        </motion.span>
                        <motion.span
                            animate={{ translateX: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                            className="absolute top-4 right-3 md:top-10 md:-right-8 bg-[#38B2AC] dark:bg-[#38B2AC] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md z-20"
                        >
                            TailwindCSS
                        </motion.span>
                        <motion.span 
                            animate={{ translateX: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                            className="absolute bottom-14 left-4 md:bottom-1/4 md:-left-12 bg-[#009688] dark:bg-[#009688] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md z-20 ">Rest API</motion.span>
                    </div>

                    <motion.h1
                        variants={heroAnimation}
                        className="text-5xl md:text-7xl font-extrabold font-poppins text-gray-900 dark:text-white mb-6"
                    >
                        Hi, I&apos;m <span className="text-cyan-500 dark:text-cyan-400 bg-clip-text bg-gradient-to-r from-cyan-500 to-gray-500 dark:from-cyan-400 dark:to-gray-400">OKTAA</span>
                    </motion.h1>

                    <motion.p
                        variants={heroDelayAnimation}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-200 mb-8 max-w-2xl mx-auto"
                    >
                        I&apos;m a <span className="text-cyan-500 dark:text-cyan-400">Full Stack Developer</span> passionate about crafting web solutions
                    </motion.p>
                </div>
            </motion.section>

            {/* More About Section */}
            <motion.section
                ref={moreAboutRef}
                initial="hidden"
                animate={isMoreAboutInView ? "visible" : "hidden"}
                variants={staggerContainer}
                id="more-about"
                className="border border-gray-300 bg-gray-200/50 dark:border-gray-800 dark:bg-gray-900 relative z-10"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
                    <motion.p
                        variants={animateOnScroll}
                        className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                    >
                        Passionate about web development, programming, and exploring the latest technology trends. I specialize in creating dynamic and interactive websites while continuously learning new technologies.
                    </motion.p>
                    <motion.a
                        variants={animateOnScroll}
                        href="/about"
                        className="inline-block bg-black dark:bg-white text-white dark:text-black py-3 px-10 rounded-md duration-300 shadow-lg hover:shadow-xl transform dark:hover:bg-white/80 hover:bg-black/80 transition-all ease-in-out"
                    >
                        About Me
                    </motion.a>
                </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
                ref={projectsRef}
                initial="hidden"
                animate={isProjectsInView ? "visible" : "hidden"}
                variants={staggerContainer}
                id="projects"
                className="py-24 bg-gray-100 dark:bg-gray-900 relative overflow-hidden default-pattern"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-28">
                    <motion.h2
                        variants={animateOnScroll}
                        className="text-4xl md:text-5xl font-bold text-center font-poppins text-gray-900 dark:text-white mb-12"
                    >
                        Featured Projects
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            <motion.div
                                variants={animateOnScroll}
                                className="col-span-1 md:col-span-2 lg:col-span-3 text-center"
                            >
                                <p className="text-gray-600 dark:text-gray-300">Loading projects...</p>
                            </motion.div>
                        ) : (
                            projects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={animateOnScroll}
                                    onClick={() => window.open(project.link, "_blank")}
                                    className="cursor-pointer"
                                >
                                    <motion.div 
                                        initial="rest"
                                        whileHover={"hover"}
                                        className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden relative group shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-500 ease-out">
                                        {/* Image Container */}
                                        <div className="relative h-40 overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Gradient Overlay - appears on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>
                                        </div>

                                        {/* Content Container */}
                                        <div className="relative">
                                            {/* Main Content */}
                                            <motion.div
                                                className="p-4 relative z-10 bg-white dark:bg-gray-900"
                                                initial="rest"
                                                whileHover="hover"
                                            >
                                                <motion.div
                                                    variants={{
                                                        rest: { y: 0 },
                                                        hover: { y: -24 },                                                           
                                                    }}
                                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                                >
                                                    <h3 className="text-xl line-clamp-1 font-bold font-poppins text-gray-800 dark:text-white">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-sm line-clamp-3 text-gray-600 dark:text-gray-300 mt-1">
                                                        {project.description}
                                                    </p>
                                                </motion.div>
                                                <motion.div
                                                    variants={{
                                                        rest: { opacity: 0, y: 9 }, // translate-y-2 (2 * 4px = 8px)
                                                        hover: { opacity: 1, y: 0 },
                                                    }}
                                                    transition={{ duration: 0.7, ease: "easeInOut" }}
                                                    className="flex flex-wrap gap-2"
                                                >
                                                    {project.technology.map((tech, index) => (
                                                        <motion.span
                                                            key={index}
                                                            className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                                                            whileHover={{ scale: 1.5 }} // Menggantikan hover:scale-105
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            {tech}
                                                        </motion.span>
                                                    ))}
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
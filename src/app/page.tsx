/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Project } from '@/lib/types';
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import StarBackground from "@/components/ui/StarBackground"
import PublicTemplate from '@/components/layouts/MainLayout';

export default function Home() {
    const pageRef = useRef(null);
    const projectsRef = useRef(null);
    const moreAboutRef = useRef(null);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeProjectCard, setActiveProjectCard] = useState<string | null>(null);

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
                            if (project.link && project.link !== "-") {
                                const screenshotUrl = `https://api.screenshotmachine.com?key=ae018e&url=${encodeURIComponent(project.link)}&dimension=1280x800`;
                                return { ...project, image: screenshotUrl };
                            }
                            return project;
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

        loadAllData();

        // Close active card when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.project-card')) {
                setActiveProjectCard(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <PublicTemplate>
            <div ref={pageRef}>
                {/* Hero Section */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    id="home"
                    className="py-12 md:min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 relative overflow-hidden default-pattern"
                >
                    <StarBackground />
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
                                className="absolute -top-12 left-1/3 -translate-x-1/2 md:-top-12 md:left-1/4 md:-translate-x-1/2 bg-[#777BB4] dark:bg-[#777BB4] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md z-20 ">PHP</motion.span>
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
                            className="text-5xl md:text-7xl font-extrabold font-poppins text-start md:text-center text-gray-900 dark:text-white mb-6"
                        >
                            Hi, I&apos;m <span className="text-cyan-500 dark:text-cyan-400 bg-clip-text bg-gradient-to-r from-cyan-500 to-gray-500 dark:from-cyan-400 dark:to-gray-400">OKTAA</span>
                        </motion.h1>

                        <motion.p
                            variants={heroDelayAnimation}
                            className="text-xl md:text-2xl text-gray-600 dark:text-gray-200 mb-8 max-w-2xl mx-auto text-start md:text-center"
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
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:text-center">
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
                                <>
                                    {[...Array(6)].map((_, index) => (
                                        <motion.div
                                            key={index}
                                            variants={animateOnScroll}
                                            className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 h-80"
                                        >
                                            {/* Image Skeleton */}
                                            <div className="h-40 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                                            
                                            {/* Content Skeleton */}
                                            <div className="p-4 space-y-3 h-40 flex flex-col">
                                                {/* Title Skeleton */}
                                                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                                
                                                {/* Description Skeleton */}
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                                                </div>
                                                
                                                {/* Technology Tags Skeleton */}
                                                <div className="flex flex-wrap gap-2">
                                                    <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                                    <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                                    <div className="h-6 w-14 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                                </div>
                                                
                                                {/* Button Skeleton */}
                                                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mt-4"></div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </>
                            ) : (
                                projects.map((project) => (
                                    <motion.div
                                        key={project.id}
                                        variants={animateOnScroll}
                                    >
                                        <motion.div
                                            initial="rest"
                                            whileHover="hover"
                                            animate={activeProjectCard === project.id ? "active" : "rest"}
                                            onClick={() => {
                                                setActiveProjectCard(
                                                    activeProjectCard === project.id ? null : project.id
                                                );
                                            }}
                                            className="project-card bg-white dark:bg-gray-900 rounded-lg overflow-hidden relative group shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-500 ease-out cursor-pointer">
                                            {/* Image Container */}
                                            <div className="relative h-40 overflow-hidden">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                {/* Gradient Overlay - appears on hover or active */}
                                                <motion.div
                                                    variants={{
                                                        rest: { opacity: 0 },
                                                        hover: { opacity: 1 },
                                                        active: { opacity: 1 }
                                                    }}
                                                    transition={{
                                                        duration: 0.6,
                                                        ease: [0.4, 0, 0.2, 1]
                                                    }}
                                                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                                                />
                                                
                                                {/* Click indicator for mobile */}
                                                <motion.div
                                                    variants={{
                                                        rest: { opacity: 0, scale: 0.8 },
                                                        hover: { opacity: 0, scale: 0.8 },
                                                        active: { opacity: 0, scale: 0.8 }
                                                    }}
                                                    className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 md:hidden"
                                                >
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </motion.div>
                                            </div>

                                            {/* Content Container */}
                                            <div className="relative">
                                                {/* Main Content */}
                                                <motion.div
                                                    className="p-4 relative z-10 bg-white dark:bg-gray-900"
                                                    initial="rest"
                                                    whileHover="hover"
                                                    animate={activeProjectCard === project.id ? "active" : "rest"}
                                                >
                                                    <motion.div
                                                        variants={{
                                                            rest: { y: 0 },
                                                            hover: { y: -24 },
                                                            active: { y: -24 }
                                                        }}
                                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                                        className="-mb-3"
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
                                                            rest: { opacity: 0, y: 9 },
                                                            hover: { opacity: 1, y: 0 },
                                                            active: { opacity: 1, y: 0 }
                                                        }}
                                                        transition={{ duration: 0.7, ease: "easeInOut" }}
                                                        className="space-y-3"
                                                    >
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.technology.map((tech, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        {project.link && project.link !== "-" && (
                                                            <a
                                                                href={project.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="inline-flex items-center gap-2 text-sm text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors duration-200 font-medium bg-cyan-50 dark:bg-cyan-900/20 px-3 py-2 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30"
                                                            >
                                                                <span>Live Demo</span>
                                                                <svg 
                                                                    className="w-4 h-4" 
                                                                    fill="none" 
                                                                    stroke="currentColor" 
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path 
                                                                        strokeLinecap="round" 
                                                                        strokeLinejoin="round" 
                                                                        strokeWidth={2} 
                                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                                                                    />
                                                                </svg>
                                                            </a>
                                                        )}
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
        </PublicTemplate>
    );
}
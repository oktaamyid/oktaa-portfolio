/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Project } from '@/lib/types';
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ContentCard, ProjectCard } from '@/components/shared';
import HomeLayout from './layout-home';
import Parallax from '@/components/ui/Parallax';
import ScrollParallax from '@/components/ui/ScrollParallax';
import HeroFluid from '@/components/ui/HeroFluid';

export default function Home() {
    const pageRef = useRef(null);
    const projectsRef = useRef(null);
    const moreAboutRef = useRef(null);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const isProjectsInView = useInView(projectsRef, { once: true, margin: "-100px" });
    const isMoreAboutInView = useInView(moreAboutRef, { once: true, margin: "-50px" });

    const animateOnScroll: Variants = {
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

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const heroAnimation: Variants = {
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

    const heroDelayAnimation: Variants = {
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
                            if (project.link && project.link !== "-" && (!project.image || project.image === "")) {
                                try {
                                    const response = await fetch(`/api/screenshot?url=${encodeURIComponent(project.link)}`);
                                    if (response.ok) {
                                        const data = await response.json();
                                        project.image = data.screenshotUrl;
                                    }
                                } catch (error) {
                                    console.error(`Error fetching screenshot for ${project.title}:`, error);
                                    project.image = "";
                                }
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


    }, []);

    return (
        <HomeLayout>
            <div ref={pageRef}>
                {/* Hero Section */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    id="home"
                    className="min-h-[85vh] md:h-[calc(100vh-100px)] md:min-h-screen flex flex-col justify-end pb-20 md:pb-0 relative overflow-hidden bg-black"
                >
                    {/* Background Fluid Shape */}
                    <div className="absolute -top-1/2 inset-0 z-0">
                        <HeroFluid />
                    </div>

                    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 mx-auto w-full flex flex-col justify-end h-full">

                        {/* Intro Text Block - Positioned above the name */}
                        <div className="max-w-xl md:pl-5 mb-12 md:mb-0 relative z-20">
                            <Parallax speed={-15} className="relative z-20">
                                <motion.p
                                    variants={heroDelayAnimation}
                                    className="text-xl md:text-3xl font-light text-zinc-200"
                                >
                                    I&apos;m a <span className="text-cyan-500 font-bold underline underline-offset-5">Full Stack Developer</span> passionate about crafting web solutions
                                </motion.p>
                            </Parallax>
                        </div>

                        {/* Massive Name Typography */}
                        <Parallax speed={20} className="relative z-10 w-full mb-12 md:mb-0">
                            <motion.h1
                                variants={heroAnimation}
                                className="font-bold uppercase text-white select-none mix-blend-overlay leading-[0.8] lg:leading-[1.1]"
                            >
                                {/* Mobile & Tablet: Stacked & Massive */}
                                <div className="flex flex-col gap-2 md:gap-4 lg:hidden w-full">
                                    <span className="text-[30vw] md:text-[25vw] tracking-tighter leading-[0.8]">HI!</span>
                                    <span className="text-[30vw] md:text-[25vw] tracking-tighter leading-[0.8] -ml-2">OKTAA</span>
                                </div>

                                {/* Desktop (Large Screens): Single Line */}
                                <span className="hidden lg:block text-[16.9vw] tracking-tighter whitespace-nowrap">
                                    Hi! OKTAA
                                </span>
                            </motion.h1>
                        </Parallax>
                    </div>

                </motion.section>

                {/* More About Section */}
                <motion.section
                    ref={moreAboutRef}
                    initial="hidden"
                    animate={isMoreAboutInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    id="more-about"
                    className="relative z-10 py-24 md:py-32 bg-black"
                >

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
                            {/* Left: Massive Typography Statement */}
                            <div className="flex-1">
                                <ScrollParallax axis="x" offset={-100} className="relative z-20">
                                    <motion.h2
                                        variants={animateOnScroll}
                                        className="text-[12vw] md:text-[8vw] leading-[0.8] font-bold tracking-tighter text-white uppercase"
                                    >
                                        About
                                        <span className="block text-zinc-800">Me<span className="text-white">.</span></span>
                                    </motion.h2>
                                </ScrollParallax>
                            </div>

                            {/* Right: Editorial Content */}
                            <div className="flex-1 md:pt-4">
                                <ScrollParallax axis="y" offset={50} className="relative z-10">
                                    <motion.div variants={animateOnScroll} className="flex flex-col gap-8">
                                        <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-300">
                                            Passionate about web development and exploring the latest technology trends.
                                            I specialize in creating <span className="text-white font-medium">dynamic experiences</span> that leave a lasting impact.
                                        </p>

                                        <div className="pt-4">
                                            <button
                                                className='group flex items-center gap-3 text-white transition-all duration-300 cursor-pointer'
                                                onClick={() => window.location.href = '/about'}
                                            >
                                                <span className="uppercase tracking-widest text-sm font-semibold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 group-hover:after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-out after:bg-white">
                                                    Read Full Bio
                                                </span>
                                                <svg
                                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </motion.div>
                                </ScrollParallax>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Projects Section */}
                <motion.section
                    ref={projectsRef}
                    initial="hidden"
                    animate={isProjectsInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    id="projects"
                    className="py-24 relative"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <ScrollParallax axis="x" offset={80}>
                            <motion.h2
                                variants={animateOnScroll}
                                className="text-4xl md:text-5xl font-bold text-left font-poppins mb-12"
                                style={{ color: 'rgb(var(--text))' }}
                            >
                                Featured Projects
                            </motion.h2>
                        </ScrollParallax>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {loading ? (
                                <>
                                    {[...Array(4)].map((_, index) => (
                                        <ContentCard key={index} className="h-96 w-full animate-pulse bg-zinc-900/50" />
                                    ))}
                                </>
                            ) : (
                                projects.slice(0, 4).map((project, index) => (
                                    <ScrollParallax
                                        key={project.id}
                                        axis="y"
                                        offset={index % 2 === 0 ? 0 : 60}
                                        className="h-full"
                                    >
                                        <ProjectCard
                                            project={project}
                                            index={index}
                                        />
                                    </ScrollParallax>
                                ))
                            )}
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center mt-6">
                            <button
                                className='group flex items-center gap-3 text-black transition-all duration-300 cursor-pointer'
                                onClick={() => window.location.href = '/projects'}
                            >
                                <span className="uppercase tracking-widest text-xl font-semibold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 group-hover:after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-out after:bg-black">
                                    View All Projects
                                </span>
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.section>
            </div>
        </HomeLayout>
    );
}
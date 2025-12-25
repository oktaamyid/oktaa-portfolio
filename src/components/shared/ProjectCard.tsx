'use client';

import { motion } from 'framer-motion';
import { Project } from '@/lib/types';
import Magnetic from '../ui/Magnetic';
import Ripple from '../ui/Ripple';
import ScrollParallax from '../ui/ScrollParallax';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut'
            }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl cursor-pointer transition-all outline-1 duration-300 border border-white/10"
            onClick={() => project.link && project.link !== '-' && window.open(project.link, '_blank')}
        >
            {/* 1. Header & Text Content */}
            <div className="p-6 md:p-8 flex flex-col gap-4">
                {/* Top Badges Row */}
                <div className="flex items-center justify-between">
                    {/* Left: Primary Tech Pill */}
                    <Magnetic strength={0.4}>
                        <span
                            className="text-xs font-bold px-3 py-1.5 border rounded-lg uppercase tracking-wider"
                        >
                            {project.technology[0] || 'PROJECT'}
                        </span>
                    </Magnetic>

                    {/* Right: Status/Year Pill */}
                    <Magnetic strength={0.4}>
                        <span
                            className="text-xs font-medium px-3 py-1.5 border rounded-lg text-black"
                        >
                            {project.link && project.link !== '-' ? '2025' : 'In Dev'}
                        </span>
                    </Magnetic>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-black leading-tight duration-300">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-black line-clamp-3 leading-relaxed">
                    {project.description}
                </p>
            </div>

            {/* 2. Bottom Image Section */}
            <div className="relative w-full px-6 pb-6 md:px-8 md:pb-4 mt-auto">
                <div className="relative overflow-hidden rounded-2xl aspect-16/10 w-full">
                    {project.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center bg-slate-900"
                        >
                            <svg
                                className="w-16 h-16 text-slate-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    )}

                    {/* Subtle Overlay to unify images */}
                    <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-300 footer-overlay" />
                </div>
            </div>

            {/* Hover: Subtle Glow Border */}
            <div
                className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"

            />

            <div className="flex flex-col px-6">
                <div className="flex justify-between items-center px-2 pb-4">
                    <h4 className="text-lg font-semibold font-poppins text-black">
                        DEV.<span className="font-semibold text-blue-500">0{index + 1}</span>
                    </h4>
                    <Magnetic strength={0.3}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (project.link && project.link !== '-') window.open(project.link, '_blank');
                            }}
                            className="group/btn relative overflow-hidden cursor-pointer flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full transition-all duration-300 border border-white/10"
                        >
                            <span className="uppercase tracking-widest text-xs font-semibold relative z-10">LIHAT</span>
                            <div className="relative w-3 h-3 overflow-hidden ml-1 z-10">
                                <svg
                                    className="w-3 h-3 absolute inset-0 transition-transform duration-300 group-hover/btn:-translate-y-full group-hover/btn:translate-x-full"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19L19 5M5 5h14v14" />
                                </svg>
                                <svg
                                    className="w-3 h-3 absolute inset-0 -translate-x-full translate-y-full transition-transform duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19L19 5M5 5h14v14" />
                                </svg>
                            </div>
                            <Ripple className="z-20 mix-blend-difference" color="white" size={150} />
                        </button>
                    </Magnetic>
                </div>
            </div>

        </motion.div>
    );
}              
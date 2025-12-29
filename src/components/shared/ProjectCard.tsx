'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const { language } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const hasLink = project.link && project.link !== '-';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={hasLink ? "hover" : undefined}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut'
            }}
            className={`group relative flex flex-col justify-between overflow-hidden bg-white border border-black/10 transition-colors duration-500 ${hasLink ? 'cursor-pointer hover:border-black' : 'cursor-default opacity-80'}`}
            onClick={() => hasLink && window.open(project.link, '_blank')}
        >
            {/* 1. Top Image Section (Sharp) */}
            <div className="relative w-full aspect-4/3 overflow-hidden border-b border-black/10 bg-zinc-50">
                {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <div className="w-full h-full relative">
                        <motion.div
                            style={{ y: yParallax }}
                            className="absolute top-0 -left-[20%] w-[140%] h-full flex items-center justify-center"
                        >
                            <motion.img
                                variants={hasLink ? { hover: { scale: 1.05 } } : undefined}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                src={project.image}
                                alt={project.title}
                                className={`w-full h-auto object-contain drop-shadow-2xl ${!hasLink && 'grayscale-[0.5]'}`}
                                loading="lazy"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </motion.div>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-50">
                        <svg className="w-12 h-12 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                {/* Overlay */}
                <div className={`absolute inset-0 transition-colors duration-300 ${hasLink ? 'bg-black/0 group-hover:bg-black/5' : 'bg-black/0'}`} />
            </div>

            {/* 2. Text Content (Sharp & Minimal) */}
            <div className="p-6 md:p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-500">
                        <span>{project.type || 'PROJECT'}</span>
                        <span>{project.year || 'IN DEV'}</span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-2xl md:text-3xl font-bold font-poppins text-black leading-none uppercase tracking-tight transition-colors ${hasLink ? 'group-hover:text-zinc-600' : ''}`}>
                        {project.title}
                    </h3>
                </div>

                {/* Description - with Expansion */}
                <div onClick={(e) => e.stopPropagation()}>
                    <motion.div 
                        initial={false}
                        animate={{ height: "auto" }}
                        className="relative"
                    >
                        {(() => {
                            const description = language === 'id' ? (project.description_id || project.description) : project.description;
                            const isLongText = description.length > 160;

                            return (
                                <>
                                    <p className={`text-sm text-zinc-600 leading-relaxed ${isExpanded || !isLongText ? '' : 'line-clamp-2'}`}>
                                        {description}
                                    </p>
                                    {isLongText && (
                                        <button
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            className="text-xs font-bold uppercase tracking-wider mt-2 border-b border-black/20 hover:border-black transition-colors"
                                        >
                                            {isExpanded ? (language === 'id' ? 'Tutup' : 'Close') : (language === 'id' ? 'Baca Selengkapnya' : 'Read More')}
                                        </button>
                                    )}
                                </>
                            );
                        })()}
                    </motion.div>
                </div>

                {/* Bottom Action (Arrow) */}
                <div className="pt-4 border-t border-black/10 flex justify-between items-center mt-auto">
                    <div className="flex items-center gap-0.5 text-xs font-bold font-mono text-black uppercase overflow-hidden">
                        <span>DEV.</span>
                        <div className="relative h-4 w-6 overflow-hidden">
                            <motion.div
                                variants={hasLink ? {
                                    initial: { y: 0 },
                                    hover: { y: "-50%" }
                                } : undefined}
                                transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
                                className="flex flex-col h-8"
                            >
                                <span className={`h-4 flex items-center ${hasLink ? 'text-zinc-400' : 'text-zinc-300'}`}>0{index + 1}</span>
                                <span className="h-4 flex items-center text-black">0{index + 1}</span>
                            </motion.div>
                        </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 ${hasLink ? 'group-hover:bg-black group-hover:text-white' : 'bg-zinc-50/50 text-zinc-300'}`}>
                        {hasLink ? (
                            <svg className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M5 19L19 5M5 5h14v14" />
                            </svg>
                        ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}              
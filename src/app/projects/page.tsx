"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/shared';
import ScrollParallax from '@/components/ui/ScrollParallax';
import Ripple from '@/components/ui/Ripple';
import Magnetic from '@/components/ui/Magnetic';
import { useProjects } from '@/hooks/useProjects';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProjectsPage() {
     const { projects, loading } = useProjects();
     const { t } = useLanguage();
     const [filter, setFilter] = useState<string>('all');

     const allTechnologies = Array.from(
          new Set(projects.flatMap((project) => project.technology))
     );

     const filteredProjects =
          filter === 'all'
               ? projects
               : projects.filter((project) => project.technology.includes(filter));

     return (
          <div className="min-h-screen pt-32 pb-24 bg-white text-black">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-end justify-between mb-24 pb-8 border-b border-black/10">
                         <div>
                              <h1 className="text-6xl md:text-8xl font-black font-poppins uppercase leading-none tracking-tighter">
                                   <ScrollParallax offset={20} axis="x" className="inline-block">
                                        <span className="block text-zinc-300">{t("Project", "Proyek")}</span>
                                   </ScrollParallax>
                                   <ScrollParallax offset={-20} axis="x" className="inline-block">
                                        <span className="block text-black">{t("Showcase.", "Pameran.")}</span>
                                   </ScrollParallax>
                              </h1>
                         </div>
                    </div>

                    {/* Filters */}
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="mb-12 flex flex-wrap gap-5 "
                    >
                         <Magnetic strength={0.4}>

                              <button
                                   onClick={() => setFilter('all')}
                                   className={`px-4 py-2 rounded-full text-sm cursor-pointer font-bold uppercase tracking-wider transition-all duration-300 border relative overflow-hidden ${filter === 'all'
                                        ? 'bg-cyan-500 text-white'
                                        : 'bg-transparent text-black border-black hover:text-white'
                                        }`}
                              >
                                   {t("All", "Semua")}
                                   {filter !== 'all' && <Ripple color='black' className='z-20 mix-blend-difference' />}
                              </button>
                         </Magnetic>
                         {allTechnologies.slice(0, 6).map((tech) => (
                              <Magnetic strength={0.4} key={tech}>

                                   <button
                                        key={tech}
                                        onClick={() => setFilter(tech)}
                                        className={`px-4 py-2 rounded-full cursor-pointer text-sm font-bold uppercase tracking-wider transition-all duration-300 border relative overflow-hidden ${filter === tech
                                             ? 'bg-cyan-500 text-white'
                                             : 'bg-transparent text-black border-black hover:text-white'
                                             }`}
                                   >
                                        {tech}
                                        {filter !== tech && <Ripple color='black' className='z-20 mix-blend-difference' />}
                                   </button>
                              </Magnetic>
                         ))}
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                         {loading ? (
                              // Loading Skeletons
                              [...Array(4)].map((_, index) => (
                                   <div key={index} className="space-y-4">
                                        <div className="aspect-4/3 bg-zinc-100 rounded-2xl animate-pulse" />
                                        <div className="h-8 bg-zinc-100 rounded w-3/4 animate-pulse" />
                                        <div className="h-4 bg-zinc-100 rounded w-1/2 animate-pulse" />
                                   </div>
                              ))
                         ) : (
                              filteredProjects.map((project, index) => (
                                   <div key={project.id} className="group">
                                        <ScrollParallax offset={index % 2 === 0 ? 0 : 40}>
                                             <ProjectCard project={project} index={index} />
                                        </ScrollParallax>
                                   </div>
                              ))
                         )}
                    </div>
               </div>
          </div >
     );
}

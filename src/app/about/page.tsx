"use client";

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Plus, X } from 'lucide-react';

import { useAboutData } from '@/hooks/useAboutData';
import ScrollParallax from '@/components/ui/ScrollParallax';
import Magnetic from '@/components/ui/Magnetic';
import Ripple from '@/components/ui/Ripple';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
     const containerRef = useRef<HTMLDivElement>(null);
     const { language, t } = useLanguage();
     const { educations, experiences } = useAboutData();
     const [hoveredExp, setHoveredExp] = useState<string | null>(null);
     const [isModalOpen, setIsModalOpen] = useState(false);

     return (
          <div ref={containerRef} className="relative w-full overflow-hidden bg-black">

               {/* --- HERO SECTION (Consolidated) --- */}
               <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 md:px-10 pt-20 pb-32 bg-white text-black overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem] z-10">

                    {/* Background Parallax Title */}
                    <div className="absolute top-1/4 left-0 w-full z-0 select-none overflow-hidden pointer-events-none">
                         <ScrollParallax offset={-150} axis="x">
                              <h1 className="text-[20vw] font-black text-black/5 leading-none whitespace-nowrap font-poppins">
                                   {t("PROFILE", "PROFIL")}
                              </h1>
                         </ScrollParallax>
                    </div>

                    <div className="relative z-10 max-w-7xl w-full flex flex-col gap-32 items-center mt-12">

                         {/* Intro Row */}
                         <div className="flex flex-col md:flex-row gap-12 items-start w-full max-w-6xl">
                              {/* Left: Heading */}
                              <div className="flex-1">
                                   <ScrollParallax offset={20}>
                                        <div className="mb-6 flex flex-col gap-2">
                                             <h2 className="text-xl md:text-2xl font-serif italic text-black/70 mb-2">
                                                  {t("Who I Am", "Siapa Saya")}
                                             </h2>
                                             <h1 className="text-7xl md:text-9xl font-black font-poppins leading-[0.85] tracking-tighter">
                                                  {t("I'm", "Saya")} <br /><span className="text-black block">OKTAA</span>
                                             </h1>
                                             <span className="text-xl md:text-3xl text-black font-light tracking-widest uppercase mt-4 block">
                                                  Full Stack Developer
                                             </span>
                                        </div>

                                        <div className="flex gap-4">
                                             <Magnetic strength={0.2}>
                                                  <button
                                                       onClick={() => window.open('https://www.linkedin.com/in/firtiansyahokta/', '_blank')}
                                                       className="group/btn relative overflow-hidden cursor-pointer flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full transition-all duration-300 border border-white/10"
                                                  >
                                                       <span className="relative z-10 flex items-center gap-2">
                                                            {t("Let's Connect", "Mari Terhubung")} <ArrowUpRight className="w-4 h-4" />
                                                       </span>
                                                       <Ripple color="white" className="z-20 mix-blend-difference" size={200} />
                                                  </button>
                                             </Magnetic>
                                             {/* <Magnetic strength={0.2}>
                                                  <button
                                                       onClick={() => setIsModalOpen(true)}
                                                       className="group/btn relative overflow-hidden cursor-pointer flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full transition-all duration-300 border border-black/10 hover:border-black/30"
                                                  >
                                                       <span className="relative z-10 flex items-center gap-2">
                                                            {t("View CV", "Lihat CV")} <ArrowDownRight className="w-4 h-4" />
                                                       </span>
                                                       <Ripple color="black" className="z-20 mix-blend-difference" size={200} />
                                                  </button>
                                             </Magnetic> */}

                                        </div>
                                   </ScrollParallax>
                              </div>

                              {/* Right: Bio Text */}
                              <div className="flex-1 max-w-lg relative">
                                   <ScrollParallax offset={50}>
                                        <div className="md:pl-8 py-4">
                                             <p className="text-lg md:text-xl text-black leading-relaxed font-poppins font-">
                                                  {language === 'en' ? (
                                                       <>
                                                            Hi there! You can call me <span className="italic font-bold">Okta</span> or <span className="italic font-bold">Tayen</span>. I&apos;m a student with degree in Informatics Engineering and a passionate about web development, programming, and exploring the latest technology trends. I specialize in creating dynamic and interactive websites while continuously learning new technologies. I also have experience with or am familiar with technology such as <span className='text-orange-500 not-italic'>Laravel</span>, <span className='text-blue-500 not-italic'>Next.js</span>, and more. Let&apos;s connect and collaborate on some exciting projects together!
                                                       </>
                                                  ) : (
                                                       <>
                                                            Halo! Kalian bisa memanggil saya <span className="italic font-bold">Okta</span> atau <span className="italic font-bold">Tayen</span>. Saya seorang mahasiswa jurusan Teknik Informatika dan bersemangat tentang pengembangan web, pemrograman, dan menjelajahi tren teknologi terbaru. Saya mengkhususkan diri dalam membuat situs web yang dinamis dan interaktif sambil terus mempelajari teknologi baru. Saya juga memiliki pengalaman atau akrab dengan teknologi seperti <span className='text-orange-500 not-italic'>Laravel</span>, <span className='text-blue-500 not-italic'>Next.js</span>, dan lainnya. Mari terhubung dan berkolaborasi dalam beberapa proyek menarik bersama!
                                                       </>
                                                  )}
                                             </p>
                                        </div>
                                   </ScrollParallax>
                              </div>
                         </div>
                    </div>
               </section>


               {/* --- JOURNEY SECTION (CINEMATIC LIST) --- */}
               <section className="relative py-32 px-4 bg-black text-white z-0">
                    <div className="max-w-6xl mx-auto">

                         {/* Section Header */}
                         <div className="flex items-end justify-between mb-24 pb-8 border-b border-white/20">

                              <h2 className="text-5xl md:text-7xl font-black font-poppins uppercase leading-none">

                                   <ScrollParallax offset={50} axis="x">
                                        {t("Professional", "Perjalanan")}<br />
                                   </ScrollParallax>
                                   <ScrollParallax offset={-50} axis="x">
                                        <span className="text-zinc-500">{t("Journey", "Karir")}</span>
                                   </ScrollParallax>
                              </h2>
                              <div className="hidden md:block text-right">
                                   <p className="text-zinc-500 text-sm tracking-widest uppercase">{t("Experience &", "Pengalaman &")}<br />{t("Education", "Pendidikan")}</p>
                              </div>
                         </div>

                         {/* Experience List */}
                         <div className="flex flex-col">
                              {experiences.map((exp) => (
                                   <div
                                        key={exp.id}
                                        onMouseEnter={() => setHoveredExp(exp.id)}
                                        onMouseLeave={() => setHoveredExp(null)}
                                        className="group relative border-b border-white/10 py-8 md:py-12 transition-all duration-500 hover:py-12 md:hover:py-16 hover:bg-white/5 px-2 md:px-8 cursor-default"
                                   >
                                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 relative z-10">
                                             <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 flex-1">
                                                  <span className="text-xs md:text-base font-mono text-zinc-500 group-hover:text-white transition-colors duration-300">
                                                       {exp.year}
                                                  </span>
                                                  <h3 className="text-2xl md:text-5xl font-bold font-poppins text-zinc-300 group-hover:text-white transition-colors duration-300 leading-tight">
                                                       {exp.role}
                                                  </h3>
                                             </div>

                                             <div className="flex items-center gap-4 text-zinc-400 group-hover:text-white transition-colors duration-300">
                                                  <span className="text-lg md:text-2xl font-light">{exp.company}</span>
                                                  <Plus className={cn("w-6 h-6 transition-transform duration-500", hoveredExp === exp.id ? "rotate-45" : "rotate-0")} />
                                             </div>
                                        </div>

                                        {/* Accordion Content */}
                                        <AnimatePresence>
                                             {hoveredExp === exp.id && (
                                                  <motion.div
                                                       initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                       animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                                                       exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                       className="overflow-hidden"
                                                  >
                                                       <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                                            <p className="w-full text-base text-zinc-400 leading-relaxed text-left">
                                                                 {language === 'id' ? (exp.description_id || exp.description) : exp.description}
                                                            </p>
                                                            <div className="w-full md:w-auto min-w-50 flex flex-wrap justify-start md:justify-end content-end gap-2">
                                                                 {exp.techStack?.map(tech => (
                                                                      <span key={tech} className="px-3 py-1 rounded-full border border-white/20 text-xs text-zinc-300 uppercase tracking-wider">
                                                                           {tech}
                                                                      </span>
                                                                 ))}
                                                            </div>
                                                       </div>
                                                  </motion.div>
                                             )}
                                        </AnimatePresence>

                                        {/* Background Glow on Hover */}
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                   </div>
                              ))}
                         </div>

                         {/* Education Header */}
                         <div className="mt-32 mb-12 flex items-center gap-4">
                              <div className="h-px flex-1 bg-white/20" />
                              <h3 className="text-2xl font-bold uppercase tracking-widest text-zinc-500">{t("Education", "Pendidikan")}</h3>
                              <div className="h-px flex-1 bg-white/20" />
                         </div>


                         {/* Education List - Credential Bars */}
                         <div className="flex flex-col gap-6">
                              {educations.map((edu, idx) => (
                                   <ScrollParallax key={edu.id} offset={20 + (idx * 10)}>
                                        <div className="group relative w-full overflow-hidden rounded-xl border border-white/5 bg-white/2 p-8 transition-all duration-500 hover:bg-white/5 hover:border-white/20">
                                             <Ripple color="white" className="z-20 mix-blend-difference transition-all duration-300" size={1500} />
                                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                                  {/* Institution & Year */}
                                                  <div className="flex flex-col gap-1">
                                                       <span className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase group-hover:text-zinc-300 transition-colors">
                                                            {edu.year}
                                                       </span>

                                                       <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                                                            {edu.institution}
                                                       </h3>
                                                  </div>

                                                  {/* Degree Info */}
                                                  <div className="flex flex-col md:items-end gap-1">
                                                       <span className="text-lg font-medium text-zinc-200 group-hover:text-white transition-colors">
                                                            {edu.major}
                                                       </span>
                                                       <p className="text-sm text-zinc-500 max-w-md md:text-right group-hover:text-zinc-400 transition-colors">
                                                            {edu.description}
                                                       </p>
                                                  </div>
                                             </div>

                                             {/* Decorative Glow */}
                                             <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                        </div>
                                   </ScrollParallax>
                              ))}
                         </div>

                    </div>
               </section >

               {/* CV Modal Overlay */}
               <AnimatePresence>
                    {isModalOpen && (
                         <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
                              onClick={() => setIsModalOpen(false)}
                         >
                              {/* Wrapper for positioning */}
                              <div className="relative w-full max-w-3xl mx-4 md:mx-0">
                                   <motion.div
                                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                        exit={{ y: 50, opacity: 0, scale: 0.95 }}
                                        className="relative w-full max-h-[85vh] overflow-y-auto bg-white rounded-xl shadow-2xl no-scrollbar"
                                        onClick={(e) => e.stopPropagation()}
                                   >
                                        {/* Close Button */}
                                        <button
                                             onClick={() => setIsModalOpen(false)}
                                             className="fixed md:absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all backdrop-blur-sm"
                                        >
                                             <X className="w-6 h-6" />
                                        </button>

                                        {/* Canva Embed */}
                                        <div className="w-full">
                                             <div style={{ position: 'relative', width: '100%', height: '0', paddingTop: '141.4286%', paddingBottom: '0', boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '0', marginBottom: '0', overflow: 'hidden', borderRadius: '0', willChange: 'transform' }}>
                                                  <iframe
                                                       loading="lazy"
                                                       style={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0', border: 'none', padding: '0', margin: '0' }}
                                                       src="https://www.canva.com/design/DAF_0_-2Vwo/9VvGyIqRxtUr0tPlN8suDw/view?embed"
                                                       allowFullScreen
                                                       title="CV Embed"
                                                  >
                                                  </iframe>
                                             </div>
                                        </div>
                                   </motion.div>

                                   {/* Download Button - Outside Card (Attached to bottom right) */}
                                   <div className="absolute -bottom-12 z-50">
                                        <Magnetic strength={0.2}>
                                             <a
                                                  href="/cv.pdf"
                                                  download="Firtiansyah_Okta_CV.pdf"
                                                  className="group/btn relative overflow-hidden cursor-pointer flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full transition-all duration-300 border border-white/20 shadow-2xl hover:scale-105 active:scale-95"
                                             >
                                                  <span className="relative z-10 flex items-center gap-2 text-sm font-medium">
                                                       Download PDF <ArrowDownRight className="w-4 h-4" />
                                                  </span>
                                                  <Ripple color="white" className="z-20 mix-blend-difference" size={200} />
                                             </a>
                                        </Magnetic>
                                   </div>
                              </div>
                         </motion.div>
                    )}
               </AnimatePresence>

          </div >
     );
}
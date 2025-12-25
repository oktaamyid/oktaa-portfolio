"use client";

import Link from "next/link";
import Magnetic from '@/components/ui/Magnetic';
import Ripple from '@/components/ui/Ripple';
import { ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";

export default function NotFound() {
     return (
          <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden text-white selection:bg-cyan-500/30">
               {/* Background effects */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black" />
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

               <div className="relative z-10 flex flex-col items-center text-center px-6">
                    {/* Massive 404 Watermark */}
                    <motion.h1
                         initial={{ opacity: 0, scale: 0.8 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.8, ease: "easeOut" }}
                         className="text-[12rem] md:text-[20rem] font-black leading-none text-white/3 font-poppins select-none tracking-tighter blur-sm"
                    >
                         404
                    </motion.h1>

                    {/* Content Overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8 md:mt-12 flex flex-col items-center gap-8 w-full">
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2, duration: 0.6 }}
                              className="space-y-4"
                         >
                              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white drop-shadow-2xl">
                                   Signal Lost
                              </h2>
                              <div className="h-0.5 w-12 bg-white/20 mx-auto" />
                              <p className="text-zinc-500 max-w-md mx-auto text-sm md:text-base leading-relaxed font-light">
                                   The frequency you are looking for is out of range.<br className="hidden md:block" />
                                   Return to the source to re-establish connection.
                              </p>
                         </motion.div>

                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4, duration: 0.6 }}
                         >
                              <Magnetic strength={0.3}>
                                   <Link href="/" className="group relative inline-flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 border border-white/20 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                        <span className="relative z-10 font-medium flex items-center gap-2 text-sm tracking-wide">
                                             <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                             RETURN TO BASE
                                        </span>
                                        <Ripple color="black" className="z-20 mix-blend-difference" size={100} />
                                   </Link>
                              </Magnetic>
                         </motion.div>
                    </div>
               </div>
          </div>
     );
}
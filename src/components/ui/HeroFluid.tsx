'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HeroFluid() {
     return (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
               {/* Primary Fluid Orb - Right Side */}
               <motion.div
                    className={cn(
                         "absolute rounded-full",
                         // Mobile: Larger & centered vertically, Desktop: Original size & Right
                         "w-[90vw] h-[90vw] md:w-[45vw] md:h-[45vw] lg:w-[40vw] lg:h-[40vw]",
                         "top-[10%] md:top-[20%]",
                         "right-[-45%] md:right-[-10%]",
                         "bg-linear-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20",
                         "blur-3xl filter opacity-60 mix-blend-screen"
                    )}
                    animate={{
                         scale: [1, 1.2, 1],
                         x: [0, -30, 0],
                         y: [0, 50, 0],
                    }}
                    transition={{
                         duration: 18,
                         repeat: Infinity,
                         ease: "easeInOut",
                    }}
               />

               {/* Secondary Fluid Orb - Bottom Right Accent */}
               <motion.div
                    className={cn(
                         "absolute rounded-full",
                         // Mobile: Bottom right punch, Desktop: Bottom right punch
                         "w-[80vw] h-[80vw] md:w-[35vw] md:h-[35vw] lg:w-[30vw] lg:h-[30vw]",
                         "top-[40%] md:top-[50%]",
                         "right-[-20%] md:right-[10%]",
                         "bg-linear-to-tl from-rose-500/20 via-amber-500/20 to-orange-500/20",
                         "blur-3xl filter opacity-40 mix-blend-screen"
                    )}
                    animate={{
                         scale: [1.2, 1, 1.2],
                         x: [0, 40, 0],
                         y: [0, -30, 0],
                    }}
                    transition={{
                         duration: 20,
                         repeat: Infinity,
                         ease: "easeInOut",
                         delay: 2
                    }}
               />

               {/* Tertiary Fluid Orb - Top Center - subtle fill */}
               <motion.div
                    className={cn(
                         "absolute rounded-full",
                         // Mobile: Top left/center, Desktop: Top Center
                         "w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] lg:w-[25vw] lg:h-[25vw]",
                         "top-[-10%] md:top-[10%]",
                         "right-[20%] md:right-[30%]",
                         "bg-linear-to-tr from-cyan-500/10 via-teal-500/10 to-transparent",
                         "blur-3xl filter opacity-30 mix-blend-screen"
                    )}
                    animate={{
                         scale: [0.9, 1.1, 0.9],
                         x: [0, 20, 0],
                         rotate: [0, 180, 0]
                    }}
                    transition={{
                         duration: 25,
                         repeat: Infinity,
                         ease: "easeInOut",
                    }}
               />
          </div>
     );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";
import { wrap } from "@motionone/utils";

interface ParallaxTextProps {
     children: string;
     baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
     const baseX = useMotionValue(0);
     const { scrollY } = useScroll();
     const scrollVelocity = useVelocity(scrollY);
     const smoothVelocity = useSpring(scrollVelocity, {
          damping: 50,
          stiffness: 400
     });
     const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
          clamp: false
     });

     const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

     const directionFactor = useRef<number>(1);
     useAnimationFrame((t, delta) => {
          let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

          if (velocityFactor.get() < 0) {
               directionFactor.current = -1;
          } else if (velocityFactor.get() > 0) {
               directionFactor.current = 1;
          }

          moveBy += directionFactor.current * moveBy * velocityFactor.get();

          baseX.set(baseX.get() + moveBy);
     });

     return (
          <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
               <motion.div className="flex whitespace-nowrap gap-10 md:gap-24" style={{ x }}>
                    {[...Array(4)].map((_, i) => (
                         <span
                              key={i}
                              className="text-7xl md:text-9xl font-black uppercase tracking-tighter transition-all duration-300 hover:text-white cursor-default"
                              style={{
                                   WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)",
                                   color: "transparent"
                              }}
                         >
                              {children}
                         </span>
                    ))}
               </motion.div>
          </div>
     );
}

interface SkillsMarqueeProps {
     items: string[];
}

export default function SkillsMarquee({ items }: SkillsMarqueeProps) {
     // Split items into two rows for visual variety
     const midpoint = Math.ceil(items.length / 2);
     const row1 = items.slice(0, midpoint).join(" • ");
     const row2 = items.slice(midpoint).join(" • ");

     return (
          <div className="relative w-full py-20 overflow-hidden bg-black flex flex-col gap-4 md:gap-8">

               {/* Cinematic Vignette */}
               <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black to-transparent z-10 pointer-events-none" />
               <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent z-10 pointer-events-none" />

               {/* Diagonal Layout Container */}
               <div className="-rotate-2 scale-110 flex flex-col gap-2 md:gap-6 py-10 border-y border-white/5 bg-white/2 backdrop-blur-sm">
                    {/* Row 1: Right to Left */}
                    <div className="hover:opacity-100 opacity-50 transition-opacity duration-500">
                         <ParallaxText baseVelocity={-2}>{row1}</ParallaxText>
                    </div>

                    {/* Row 2: Left to Right */}
                    <div className="hover:opacity-100 opacity-50 transition-opacity duration-500">
                         <ParallaxText baseVelocity={2}>{row2}</ParallaxText>
                    </div>
               </div>

          </div>
     );
}

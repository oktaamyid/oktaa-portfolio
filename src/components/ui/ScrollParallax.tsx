'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollParallaxProps {
     children: React.ReactNode;
     offset?: number; // How many pixels to move
     direction?: 'start-end' | 'end-start'; // Movement direction logic
     axis?: 'x' | 'y';
     className?: string;
     enableOnMobile?: boolean;
}

export default function ScrollParallax({
     children,
     offset = 100,
     axis = 'y',
     className = '',
     enableOnMobile = false,
}: ScrollParallaxProps) {
     const ref = useRef<HTMLDivElement>(null);
     const [isMobile, setIsMobile] = useState(false);

     // Track scroll position of the element relative to the viewport
     // "start end" = when top of element hits bottom of viewport
     // "end start" = when bottom of element hits top of viewport
     const { scrollYProgress } = useScroll({
          target: ref,
          offset: ["start end", "end start"],
     });

     // Map 0 -> 1 progress to offset -> -offset movement
     // Use springs for smoother scroll stopping
     const movement = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
     const springConfig = { damping: 15, mass: 0.1, stiffness: 100 };
     const smoothMovement = useSpring(movement, springConfig);

     const style = axis === 'x'
          ? { x: smoothMovement }
          : { y: smoothMovement };

     useEffect(() => {
          const checkMobile = () => {
               setIsMobile(window.matchMedia('(max-width: 768px)').matches);
          };
          checkMobile();
          window.addEventListener('resize', checkMobile);
          return () => window.removeEventListener('resize', checkMobile);
     }, []);

     if (!enableOnMobile && isMobile) {
          return <div className={className}>{children}</div>;
     }

     return (
          <div ref={ref} className={`${className} overflow-visible`}>
               <motion.div style={style}>
                    {children}
               </motion.div>
          </div>
     );
}

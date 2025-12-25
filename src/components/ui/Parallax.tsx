'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ParallaxProps {
     children: React.ReactNode;
     speed?: number; // Speed factor. + for same direction, - for opposite.
     className?: string;
}

export default function Parallax({ children, speed = 20, className = '' }: ParallaxProps) {
     const [isMobile, setIsMobile] = useState(false);
     const x = useMotionValue(0);
     const y = useMotionValue(0);

     // Smooth out the movement
     const springConfig = { damping: 30, stiffness: 200, mass: 0.1 };
     const springX = useSpring(x, springConfig);
     const springY = useSpring(y, springConfig);

     useEffect(() => {
          // Check for mobile/touch device
          const checkMobile = () => {
               setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
          };

          checkMobile();
          window.addEventListener('resize', checkMobile);

          const handleMouseMove = (e: MouseEvent) => {
               // Don't calculate if mobile to save resources
               if (window.matchMedia('(max-width: 768px)').matches) return;

               const { innerWidth, innerHeight } = window;
               // Calculate normalized position (-0.5 to 0.5)
               const normalizedX = (e.clientX / innerWidth) - 0.5;
               const normalizedY = (e.clientY / innerHeight) - 0.5;

               // Apply speed scaling
               x.set(normalizedX * speed);
               y.set(normalizedY * speed);
          };

          window.addEventListener('mousemove', handleMouseMove);

          return () => {
               window.removeEventListener('resize', checkMobile);
               window.removeEventListener('mousemove', handleMouseMove);
          };
     }, [x, y, speed]);

     if (isMobile) {
          // On mobile, still return motion.div to maintain component tree consistency and animation propagation
          return (
               <motion.div className={className}>
                    {children}
               </motion.div>
          );
     }

     return (
          <motion.div
               style={{ x: springX, y: springY }}
               className={className}
          >
               {children}
          </motion.div>
     );
}

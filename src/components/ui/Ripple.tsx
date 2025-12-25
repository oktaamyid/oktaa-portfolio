'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface RippleProps {
     color?: string;
     size?: number;
     className?: string;
}

export default function Ripple({ color = '#FFFFFF', size = 150, className = '' }: RippleProps) {
     const containerRef = useRef<HTMLDivElement>(null);
     const x = useMotionValue(0);
     const y = useMotionValue(0);
     const scale = useMotionValue(0);

     // "Ink" physics: Slightly slower, heavier feel
     const positionSpringConfig = { damping: 25, stiffness: 120, mass: 0.2 };
     const scaleSpringConfig = { damping: 20, stiffness: 150, mass: 0.1 };

     const springX = useSpring(x, positionSpringConfig);
     const springY = useSpring(y, positionSpringConfig);
     const springScale = useSpring(scale, scaleSpringConfig);

     useEffect(() => {
          const container = containerRef.current;
          if (!container) return;

          const parent = container.parentElement;
          if (!parent) return;

          // Ensure parent is relative and overflow hidden
          const style = window.getComputedStyle(parent);
          if (style.position === 'static') {
               parent.style.position = 'relative';
          }
          if (style.overflow !== 'hidden') {
               parent.style.overflow = 'hidden';
          }

          const handleMouseMove = (e: MouseEvent) => {
               const rect = parent.getBoundingClientRect();
               const clientX = e.clientX;
               const clientY = e.clientY;

               // Update values relative to the parent
               x.set(clientX - rect.left - size / 2);
               y.set(clientY - rect.top - size / 2);
          };

          const handleMouseEnter = () => {
               scale.set(1);
          };

          const handleMouseLeave = () => {
               scale.set(0);
          };

          parent.addEventListener('mousemove', handleMouseMove);
          parent.addEventListener('mouseenter', handleMouseEnter);
          parent.addEventListener('mouseleave', handleMouseLeave);

          return () => {
               parent.removeEventListener('mousemove', handleMouseMove);
               parent.removeEventListener('mouseenter', handleMouseEnter);
               parent.removeEventListener('mouseleave', handleMouseLeave);
          };
     }, [x, y, scale, size]);

     return (
          <div
               ref={containerRef}
               className={`absolute inset-0 pointer-events-none ${className}`}
               style={{ borderRadius: 'inherit' }}
          >
               <motion.div
                    style={{
                         x: springX,
                         y: springY,
                         scale: springScale, // Animate scale for expanding/spreading effect
                         width: size,
                         height: size,
                         backgroundColor: color,
                    }}
                    className="absolute rounded-full"
               />
          </div>
     );
}

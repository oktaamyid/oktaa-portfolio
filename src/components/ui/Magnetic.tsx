'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, MouseEvent, useRef } from 'react';

interface MagneticProps {
     children: ReactNode;
     strength?: number; // How strong the pull is. Higher = more movement. Default 0.3
}

export default function Magnetic({ children, strength = 0.3 }: MagneticProps) {
     const ref = useRef<HTMLDivElement>(null);

     const x = useMotionValue(0);
     const y = useMotionValue(0);

     // Smooth, springy animation
     const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
     const springX = useSpring(x, springConfig);
     const springY = useSpring(y, springConfig);

     const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
          const { clientX, clientY } = e;
          const { height, width, left, top } = ref.current!.getBoundingClientRect();

          // Calculate distance from center
          const middleX = clientX - (left + width / 2);
          const middleY = clientY - (top + height / 2);

          // Update motion values
          x.set(middleX * strength);
          y.set(middleY * strength);
     };

     const handleMouseLeave = () => {
          x.set(0);
          y.set(0);
     };

     return (
          <motion.div
               ref={ref}
               onMouseMove={handleMouseMove}
               onMouseLeave={handleMouseLeave}
               style={{ x: springX, y: springY }}
               className="inline-block" // Ensure it doesn't break layout
          >
               {children}
          </motion.div>
     );
}

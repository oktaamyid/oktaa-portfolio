"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface CircleCursorProps {
     bigSize?: number; // Ukuran lingkaran besar
     smallSize?: number; // Ukuran lingkaran kecil
     blendMode?: string; // Jenis mix-blend-mode
}

const CircleCursor = ({ bigSize = 30, smallSize = 10, blendMode = "difference" }: CircleCursorProps) => {
     const [position, setPosition] = useState({ x: 0, y: 0 });
     const [isHovering, setIsHovering] = useState(false);
     const cursorRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
          const updatePosition = (e: MouseEvent) => {
               setPosition({ x: e.pageX - bigSize / 2, y: e.pageY - bigSize / 2 });
          };

          const handleMouseEnter = (e: MouseEvent) => {
               if (e.target instanceof HTMLElement && e.target.classList.contains("hoverable")) {
                    setIsHovering(true);
               }
          };

          const handleMouseLeave = (e: MouseEvent) => {
               if (e.target instanceof HTMLElement && e.target.classList.contains("hoverable")) {
                    setIsHovering(false);
               }
          };

          document.body.addEventListener("mousemove", updatePosition);
          document.body.addEventListener("mouseover", handleMouseEnter);
          document.body.addEventListener("mouseout", handleMouseLeave);

          // Sembunyikan kursor default
          document.body.style.cursor = "none";

          return () => {
               document.body.removeEventListener("mousemove", updatePosition);
               document.body.removeEventListener("mouseover", handleMouseEnter);
               document.body.removeEventListener("mouseout", handleMouseLeave);
               document.body.style.cursor = "auto"; // Kembalikan kursor default saat komponen di-unmount
          };
     }, [bigSize]);

     return (
          <div ref={cursorRef} className="cursor fixed z-1000 pointer-events-none">
               <motion.div
                    className="cursor__ball cursor__ball--big"
                    animate={{ x: position.x, y: position.y, scale: isHovering ? 4 : 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
               >
                    <svg height={bigSize} width={bigSize}>
                         <circle cx={bigSize / 2} cy={bigSize / 2} r={bigSize / 2.5} strokeWidth="0" fill="#f7f8fa" />
                    </svg>
               </motion.div>
               <motion.div
                    className="cursor__ball cursor__ball--small"
                    animate={{ x: position.x + (bigSize - smallSize) / 2 - 2, y: position.y + (bigSize - smallSize) / 2 - 2 }}
                    transition={{ duration: 0.1, ease: "linear" }}
               >
                    <svg height={smallSize} width={smallSize}>
                         <circle cx={smallSize / 2} cy={smallSize / 2} r={smallSize / 2.5} strokeWidth="0" fill="#f7f8fa" />
                    </svg>
               </motion.div>

               <style jsx>{`
        .cursor {
          pointer-events: none;
          mix-blend-mode: ${blendMode};
        }

        .cursor__ball {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
        }
      `}</style>
          </div>
     );
};

export default CircleCursor;
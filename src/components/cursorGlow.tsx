"use client"; // Pastikan ini ada di baris pertama karena menggunakan useEffect dan useState

import { useEffect, useState } from "react";

export default function CursorGlow() {
     const [position, setPosition] = useState({ x: 0, y: 0 });

     useEffect(() => {
          const handleMouseMove = (e: MouseEvent) => {
               setPosition({ x: e.clientX, y: e.clientY });
          };

          window.addEventListener("mousemove", handleMouseMove);

          return () => {
               window.removeEventListener("mousemove", handleMouseMove);
          };
     }, []);

     return (
          <div
               className="fixed pointer-events-none transform -translate-x-1/2 -translate-y-1/2 rounded-full w-[44rem] h-[40rem] bg-gradient-radial from-gray-800 to-transparent opacity-30"
               style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
               }}
          />
     );
}
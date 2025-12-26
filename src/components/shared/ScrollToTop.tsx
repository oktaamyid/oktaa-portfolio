"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import Ripple from "../ui/Ripple";

export default function ScrollToTop() {
     const [isVisible, setIsVisible] = useState(false);
     const pathname = usePathname();

     const isSongsPage = pathname === "/songs";
     const isPortalPage = pathname === "/portal";

     useEffect(() => {
          const toggleVisibility = () => {
               if (window.scrollY > 300) {
                    setIsVisible(true);
               } else {
                    setIsVisible(false);
               }
          };

          window.addEventListener("scroll", toggleVisibility);
          return () => window.removeEventListener("scroll", toggleVisibility);
     }, []);

     const scrollToTop = () => {
          window.scrollTo({
               top: 0,
               behavior: "smooth",
          });
     };

     return (
          !isPortalPage && (
               <AnimatePresence>
                    {isVisible && (

                         <motion.button
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              onClick={scrollToTop}
                              className={`fixed right-6 z-40 p-3 bg-white text-black rounded-full shadow-lg hover:bg-zinc-200 transition-colors ${isSongsPage ? "bottom-24 md:bottom-32" : "bottom-6"
                                   }`}
                              aria-label="Scroll to top"
                         >
                              <Ripple color="white" size={100} className="z-20 mix-blend-difference transition-all duration-300 ease-in-out" />
                              <FaArrowUp className="w-5 h-5" />
                         </motion.button>
                    )}
               </AnimatePresence>
          )
     );
}

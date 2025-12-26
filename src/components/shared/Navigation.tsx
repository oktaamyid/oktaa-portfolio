'use client';

import { useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { cn } from "@/lib/utils";
import Ripple from "../ui/Ripple";

interface NavLink {
     href: string;
     label: string;
     target?: string;
}

const navLinks: NavLink[] = [
     { href: '/', label: 'Home' },
     { href: '/about', label: 'About' },
     { href: '/projects', label: 'Projects' },
     { href: '/songs', label: 'Songs' },
     { href: '/portal', label: 'Portal', target: '_blank' },
];

export function Navigation() {
     const pathname = usePathname();
     const [isActive, setIsActive] = useState(false);
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          setMounted(true);
     }, []);

     // Close menu when route changes
     useEffect(() => {
          setIsActive(false);
     }, [pathname]);

     if (!mounted) return null;

     return (
          <>
               {/* Fixed Toggle Button - Top Right */}
               <div className="fixed top-8 right-8 z-60">
                    <Magnetic strength={0.3}>
                         <button
                              onClick={() => setIsActive(!isActive)}
                              className="group flex items-center justify-center w-16 h-16 rounded-full bg-black text-white border border-white/20 relative overflow-hidden transition-all duration-300 hover:scale-110"
                         >
                              {/* Hamburger / Close Icon Transition */}
                              <div className="relative w-6 h-4 flex flex-col justify-between items-center group-hover:gap-0 transition-all">
                                   <motion.span
                                        animate={{ rotate: isActive ? 45 : 0, y: isActive ? 8 : 0 }}
                                        className="w-full h-0.5 bg-white origin-center transition-transform duration-300"
                                   />
                                   <motion.span
                                        animate={{ opacity: isActive ? 0 : 1 }}
                                        className="w-full h-0.5 bg-white transition-opacity duration-300"
                                   />
                                   <motion.span
                                        animate={{ rotate: isActive ? -45 : 0, y: isActive ? -8 : 0 }}
                                        className="w-full h-0.5 bg-white origin-center transition-transform duration-300"
                                   />
                              </div>
                              <Ripple className="z-20 mix-blend-difference" color="white" size={65} />
                         </button>
                    </Magnetic>
               </div>

               {/* Cinematic Full Screen Overlay */}
               <AnimatePresence mode="wait">
                    {isActive && (
                         <motion.div
                              initial={{ y: "-100%" }}
                              animate={{ y: 0 }}
                              exit={{ y: "-100%" }}
                              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                              className="fixed inset-0 bg-[#0f0f0f] z-50 flex flex-col justify-center items-center"
                         >
                              {/* Background Decoration */}
                              <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                                   <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/30 rounded-full blur-[120px]" />
                                   <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-purple-500/20 rounded-full blur-[100px]" />
                              </div>

                              <div className="flex flex-col gap-4 items-center">
                                   {navLinks.map((link, index) => (
                                        <motion.div
                                             key={link.href}
                                             initial={{ opacity: 0, y: 50 }}
                                             animate={{
                                                  opacity: 1,
                                                  y: 0,
                                                  transition: { delay: 0.5 + (index * 0.1) }
                                             }}
                                             exit={{ opacity: 0, y: 50 }}
                                        >
                                             <Link href={link.href} target={link.target}>
                                                  <motion.div
                                                       whileHover={{ scale: 1.1, x: 20 }}
                                                       className={cn(
                                                            "text-5xl md:text-7xl font-bold uppercase tracking-tighter cursor-pointer relative group",
                                                            pathname === link.href ? "text-white" : "text-zinc-500 hover:text-white"
                                                       )}
                                                  >
                                                       <span className="relative z-10">{link.label}</span>

                                                       {/* Hover Underline */}
                                                       <span
                                                            className="absolute -bottom-2 left-0 w-full h-0.75 bg-white origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                                                       />
                                                  </motion.div>
                                             </Link>
                                        </motion.div>
                                   ))}
                              </div>

                              {/* Footer Info in Menu */}
                              <motion.div
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1, transition: { delay: 1 } }}
                                   className="absolute bottom-10 left-10 md:left-20 text-zinc-500 text-sm font-light uppercase tracking-widest"
                              >
                                   <p>oktaamyid © {new Date().getFullYear()}</p>
                              </motion.div>
                         </motion.div>
                    )}
               </AnimatePresence>
          </>
     );
}

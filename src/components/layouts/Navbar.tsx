"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from 'next-themes';
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from 'lucide-react';

const sections = [
     { name: "Home", path: "/" },
     { name: "About", path: "/about" },
     { name: "Portal", path: "/portal" },
] as const;

export default function Navbar() {
     const pathname = usePathname();
     const [mounted, setMounted] = useState(false);
     const { setTheme } = useTheme();

     useEffect(() => {
          setMounted(true);
     }, []);

     if (!mounted) {
          return null;
     }

     return (
          <nav className="w-full backdrop-blur-lg z-40 default-pattern">
               <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between py-4">
                         <div className="text-2xl sm:text-3xl font-bold font-poppins text-gray-900 dark:text-white">
                              OKTAA
                         </div>
                         <div className="flex items-center space-x-4">
                              <DropdownMenu>
                                   <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                             <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                             <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                             <span className="sr-only">Toggle theme</span>
                                        </Button>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setTheme("light")}>
                                             Light
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                                             Dark
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setTheme("system")}>
                                             System
                                        </DropdownMenuItem>
                                   </DropdownMenuContent>
                              </DropdownMenu>
                              <div className="md:hidden">
                                   <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                             <Button variant="outline" size="icon">
                                                  <Menu className="h-full w-full" />
                                                  <span className="sr-only">Menu</span>
                                             </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[100px] mt-3">
                                             {sections.map(({ name, path }) => (
                                                  <DropdownMenuItem key={path} asChild>
                                                       <Link
                                                            href={path}
                                                            rel={path.startsWith("http") ? "noopener noreferrer" : "canonical"}
                                                            target={path.startsWith("http") ? "_blank" : undefined}
                                                            className={`px-4 py-3 text-md font-semibold ${pathname === path
                                                                      ? "text-cyan-500 dark:text-cyan-400"
                                                                      : "text-gray-600 dark:text-gray-400"
                                                                 }`}
                                                       >
                                                            {name}
                                                       </Link>
                                                  </DropdownMenuItem>
                                             ))}
                                        </DropdownMenuContent>
                                   </DropdownMenu>
                              </div>
                              <div className="hidden md:flex items-center space-x-8">
                                   {sections.map(({ name, path }) => (
                                        <Link
                                             key={path}
                                             href={path}
                                             rel={path.startsWith("http") ? "noopener noreferrer" : "canonical"}
                                             target={path.startsWith("http") ? "_blank" : undefined}
                                             className={`text-xs md:text-sm lg:text-base capitalize hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300 font-semibold ${pathname === path ? "text-cyan-500" : "text-gray-400"
                                                  }`}
                                        >
                                             {name}
                                        </Link>
                                   ))}
                              </div>
                         </div>
                    </div>
               </div>
          </nav>
     );
}
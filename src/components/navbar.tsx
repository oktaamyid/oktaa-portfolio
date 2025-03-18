"use client"; // Pastikan ini ada di baris pertama

import { usePathname } from "next/navigation";
import Link from "next/link";

const sections = [
     { name: "Home", path: "/" },
     { name: "View CV", path: "/cv" },
] as const;

export default function Navbar() {
     const pathname = usePathname();

     return (
          <nav className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 shadow-md rounded-full px-8 py-3 md:px-5 md:py-2 lg:px-6 flex space-x-3 md:space-x-6 lg:space-x-8 items-center z-50 backdrop-blur-lg bg-opacity-80 max-w-[90%] md:max-w-md">
               {sections.map(({ name, path }) => (
                    <Link
                         key={path}
                         href={path}
                         className={`text-xs md:text-sm lg:text-base capitalize hover:text-white hover:underline ${
                              pathname === path ? "text-blue-400" : "text-gray-400"
                         }`}
                    >
                         {name}
                    </Link>
               ))}
          </nav>
     );
}

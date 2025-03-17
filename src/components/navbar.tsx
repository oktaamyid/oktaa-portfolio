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
          <nav className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 shadow-lg rounded-full px-6 py-2 flex space-x-8 items-center z-50 backdrop-blur-lg bg-opacity-80">
               {sections.map(({ name, path }) => (
                    <Link
                         key={path}
                         href={path}
                         className={`text-md capitalize hover:text-white hover:underline ${
                              pathname === path ? "text-blue-400" : "text-gray-400"
                         }`}
                    >
                         {name}
                    </Link>
               ))}
          </nav>
     );
}

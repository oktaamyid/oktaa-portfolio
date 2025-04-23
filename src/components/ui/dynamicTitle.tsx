"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const greetings = [
     "Halo", 
     "Hello", 
     "Bonjour", 
     "Hola", 
     "Ciao", 
     "Hallo", 
     "こんにちは", 
     "안녕하세요", 
     "Привет", // Russian
     "नमस्ते", // Hindi
     "Salam",  // Arabic
     "Merhaba", // Turkish
     "Olá",    // Portuguese
     "Sawubona", // Zulu
     "你好",    // Chinese (Simplified)
     "வணக்கம்", // Tamil
     "สวัสดี", // Thai
     "Hej",    // Swedish
     "Aloha"   // Hawaiian
];

const greetingIntervalMs = 3000;

export default function DynamicTitle() {
     const pathname = usePathname();
     const [greetingIndex, setGreetingIndex] = useState(0);

     useEffect(() => {
          if (pathname !== "/") return;

          const interval = setInterval(() => {
               setGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
          }, greetingIntervalMs);

          return () => clearInterval(interval);
     }, [pathname]);

     useEffect(() => {
          if (pathname === "/") {
               document.title = `${greetings[greetingIndex]}. Firtiansyah Oktaa~ | Full-stack Engineer & Tech Enthusiast`;
          }
     }, [greetingIndex, pathname]);

     return null;
}

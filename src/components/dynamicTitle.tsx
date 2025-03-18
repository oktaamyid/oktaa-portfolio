"use client";

import { useEffect, useState } from "react";

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
     const [greetingIndex, setGreetingIndex] = useState(0);

     useEffect(() => {
          const interval = setInterval(() => {
               setGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
          }, greetingIntervalMs);

          return () => clearInterval(interval);
     }, []);

     useEffect(() => {
          document.title = `${greetings[greetingIndex]}. Oktaa~`;
     }, [greetingIndex]);

     return null;
}

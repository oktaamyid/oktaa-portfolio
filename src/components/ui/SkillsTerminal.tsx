"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillsTerminalProps {
     categories: {
          category: string;
          skills: string;
     }[];
}

export default function SkillsTerminal({ categories }: SkillsTerminalProps) {
     const [activeTab, setActiveTab] = useState("skills.json");
     const [isTyping, setIsTyping] = useState(true);

     // Simulate typing effect completion
     useEffect(() => {
          const timer = setTimeout(() => setIsTyping(false), 2000);
          return () => clearTimeout(timer);
     }, []);

     return (
          <div className="w-full max-w-4xl mx-auto font-mono text-sm md:text-base">
               <div className="rounded-xl overflow-hidden bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">

                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                         <div className="flex gap-2">
                              <div className="w-3 h-3 rounded-full bg-red-500/80" />
                              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                              <div className="w-3 h-3 rounded-full bg-green-500/80" />
                         </div>
                         <div className="text-zinc-500 text-xs tracking-widest uppercase">oktaa@dev: ~/skills</div>
                         <div className="flex gap-4 text-zinc-600">
                              <Minimize2 className="w-4 h-4" />
                              <Maximize2 className="w-4 h-4" />
                              <X className="w-4 h-4" />
                         </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6 md:p-10 text-zinc-300">
                         <div className="flex gap-4 mb-4 text-zinc-500 border-b border-white/5 pb-2">
                              <button
                                   onClick={() => setActiveTab("skills.json")}
                                   className={cn(
                                        "hover:text-white transition-colors",
                                        activeTab === "skills.json" && "text-yellow-400 font-bold"
                                   )}
                              >
                                   skills.json
                              </button>
                              <button
                                   onClick={() => setActiveTab("README.md")}
                                   className={cn(
                                        "hover:text-white transition-colors",
                                        activeTab === "README.md" && "text-blue-400 font-bold"
                                   )}
                              >
                                   README.md
                              </button>
                         </div>

                         {activeTab === "skills.json" ? (
                              <motion.div
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   className="space-y-1"
                              >
                                   <span className="text-zinc-500">{"{"}</span>

                                   {categories.map((cat, i) => (
                                        <div key={i} className="pl-4 md:pl-8 group">
                                             <span className="text-purple-400">"{cat.category.toLowerCase()}"</span>
                                             <span className="text-zinc-500">: </span>
                                             <span className="text-zinc-500">[</span>
                                             <div className="pl-4 md:pl-8 flex flex-wrap gap-2">
                                                  {cat.skills.split(", ").map((skill, j, arr) => (
                                                       <span key={skill} className="hover:bg-white/10 px-1 rounded transition-colors cursor-crosshair">
                                                            <span className="text-green-400">"{skill}"</span>
                                                            {j < arr.length - 1 && <span className="text-zinc-500">,</span>}
                                                       </span>
                                                  ))}
                                             </div>
                                             <span className="text-zinc-500">]</span>
                                             {i < categories.length - 1 && <span className="text-zinc-500">,</span>}
                                        </div>
                                   ))}

                                   <span className="text-zinc-500">{"}"}</span>
                              </motion.div>
                         ) : (
                              <motion.div
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   className="space-y-4"
                              >
                                   <h1 className="text-2xl font-bold text-white mb-4"># Technical Overview</h1>
                                   <p className="leading-relaxed">
                                        I am a full-stack developer passionate about building scalable, high-performance web applications.
                                        My stack focuses on <span className="text-blue-400">React</span>, <span className="text-blue-400">Next.js</span>, and modern CSS frameworks.
                                   </p>
                                   <p className="text-zinc-500 italic">
                                        ~ Run `npm install oktaa` to collaborate.
                                   </p>
                              </motion.div>
                         )}

                         {/* Cursor Animation */}
                         <div className="mt-4 flex items-center gap-2">
                              <span className="text-green-500">➜</span>
                              <span className="text-blue-400">~</span>
                              <motion.span
                                   className="w-2.5 h-5 bg-zinc-500 block"
                                   animate={{ opacity: [1, 0] }}
                                   transition={{ duration: 0.8, repeat: Infinity }}
                              />
                         </div>

                    </div>
               </div>
          </div>
     );
}

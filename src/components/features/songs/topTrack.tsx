'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SpotifyTrack } from '@/lib/spotify';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TopTracksProps {
     tracks: SpotifyTrack[];
}

export default function TopTracks({ tracks }: TopTracksProps) {
     const [activeTrack, setActiveTrack] = useState<SpotifyTrack | null>(null);

     // Mouse position for the floating image
     const x = useMotionValue(0);
     const y = useMotionValue(0);

     // Smooth spring animation for the image movement
     const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
     const activeX = useSpring(x, springConfig);
     const activeY = useSpring(y, springConfig);

     // Handle mouse move to update coordinates
     const handleMouseMove = (e: React.MouseEvent) => {
          x.set(e.clientX);
          y.set(e.clientY);
     };

     return (
          <div
               className="relative w-full"
               onMouseMove={handleMouseMove}
               onMouseLeave={() => setActiveTrack(null)}
          >
               <div className="flex flex-col">
                    {tracks.map((track, index) => (
                         <motion.a
                              key={track.id}
                              href={track.external_urls.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial="initial"
                              whileHover="hover"
                              whileTap="hover"
                              whileFocus="hover"
                              className="group relative flex items-center justify-between py-6 transition-colors duration-300"
                              onMouseEnter={() => setActiveTrack(track)}
                         >
                              {/* Animated Dividers */}
                              {/* Base Grey Line */}
                              <div className="absolute bottom-0 left-0 w-full h-px bg-black/10" />

                              {/* Framer Motion Sliding Line */}
                              <motion.span
                                   variants={{
                                        initial: { scaleX: 0, originX: 1 },
                                        hover: { scaleX: 1, originX: 0 }
                                   }}
                                   transition={{ duration: 0.5, ease: "easeOut", originX: { duration: 0 } }}
                                   className="absolute bottom-0 left-0 w-full h-0.5 z-10 bg-black"
                              />


                              {/* Left: Index & Info */}
                              <div className="flex items-center gap-8 md:gap-12 pl-2">
                                   <span className="text-sm font-mono text-zinc-400 w-6">
                                        {String(index + 1).padStart(2, '0')}
                                   </span>

                                   <div className="flex flex-col">
                                        <motion.h3
                                             variants={{
                                                  initial: { x: 0 },
                                                  hover: { x: 24 } // 24px = translate-x-6
                                             }}
                                             transition={{ duration: 0.2, ease: "easeOut" }}
                                             className="text-xl md:text-3xl font-bold text-black uppercase tracking-tight font-poppins"
                                        >
                                             {track.name}
                                        </motion.h3>
                                        <motion.p
                                             variants={{
                                                  initial: { x: 0 },  
                                                  hover: { x: 24 }
                                             }}
                                             transition={{ duration: 0.2, ease: "easeOut" }}
                                             className="text-zinc-500 text-sm md:text-base"
                                        >
                                             {track.artists.map(artist => artist.name).join(', ')}
                                        </motion.p>
                                   </div>
                              </div>

                              {/* Right: Icon or Duration (Optional, keeping minimal) */}
                              <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                                   <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                   </svg>
                              </div>

                              {/* Mobile Only: Visible Thumbnail (Hidden on Desktop) */}
                              <div className="md:hidden absolute right-4 opacity-100 w-12 h-12 rounded overflow-hidden">
                                   {track.album.images[0]?.url && (
                                        <Image
                                             src={track.album.images[0].url}
                                             alt={track.name}
                                             fill
                                             className="object-cover"
                                        />
                                   )}
                              </div>
                         </motion.a>
                    ))}
               </div>

               <motion.div
                    style={{
                         x: activeX,
                         y: activeY,
                         top: 0,
                         left: 0,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                         opacity: activeTrack ? 1 : 0,
                         scale: activeTrack ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.2 }}
                    className="pointer-events-none fixed z-50 hidden md:block w-75 h-75 overflow-hidden rounded-xl shadow-2xl"
               >
                    {/* Render current active track image */}
                    {activeTrack && activeTrack.album.images[0]?.url && (
                         <div className="relative w-full h-full bg-black">
                              <Image
                                   src={activeTrack.album.images[0].url}
                                   alt={activeTrack.name}
                                   fill
                                   className="object-cover"
                                   priority // Load fast for hover
                              />
                              {/* Overlay Info */}
                              <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent text-white">
                                   <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Now Hovering</p>
                                   <p className="font-bold truncate">{activeTrack.name}</p>
                              </div>
                         </div>
                    )}
               </motion.div>
          </div>
     );
}
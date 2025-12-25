'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FaPlay, FaPause, FaSpotify } from 'react-icons/fa';
import { SpotifyTrack } from '@/lib/spotify';
import Magnetic from '@/components/ui/Magnetic';
import { useNowPlaying } from '@/hooks/useNowPlaying';

interface NowPlayingProps {
     track: SpotifyTrack | null;
}

export default function NowPlaying({ track: initialTrack }: NowPlayingProps) {
     const { track, isPlaying } = useNowPlaying(initialTrack);


     /* Re-implementing local progress state and animation ref */
     const [progress, setProgress] = useState(0); // This needs useState import
     const animationRef = useRef<number | null>(null);
     const duration = track?.duration_ms ?? 0;

     // Simulated progress bar for visual effect
     useEffect(() => {
          if (!isPlaying) {
               if (animationRef.current) cancelAnimationFrame(animationRef.current);
               return;
          }

          const startTime = Date.now() - progress;
          const durationMs = duration;

          const updateProgress = () => {
               const elapsed = Date.now() - startTime;
               const newProgress = Math.min(elapsed, durationMs);
               setProgress(newProgress);

               if (newProgress < durationMs) {
                    animationRef.current = requestAnimationFrame(updateProgress);
               } else {
                    // When song ends visually, we rely on the next poll to update the track
                    // But we can reset temporarily
                    // setIsPlaying(false); 
                    // setProgress(0);
               }
          };

          animationRef.current = requestAnimationFrame(updateProgress);

          return () => {
               if (animationRef.current) cancelAnimationFrame(animationRef.current);
          };
     }, [isPlaying, duration, progress]);


     if (!track || !track.is_playing) {
          return null;
     }

     return (
          <div className="fixed bottom-6 right-6 z-50 md:bottom-12 md:right-12">
               <Magnetic strength={0.2}>
                    <div className="flex items-center gap-4 bg-white/80 p-3 pr-6 rounded-full border border-black/10 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-white">
                         {/* Rotating Album Art */}
                         <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 overflow-hidden rounded-full border border-black/5">
                              {track.album?.images?.[0]?.url ? (
                                   <Image
                                        src={track.album.images[0].url}
                                        alt={track.name}
                                        fill
                                        className={`object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
                                   />
                              ) : (
                                   <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                                        <FaSpotify className="text-zinc-300" />
                                   </div>
                              )}

                              {/* Center Hole for "Vinyl" look */}
                              <div className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full border border-black/5" />
                         </div>

                         {/* Info */}
                         <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                   <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Now Playing</span>
                              </div>
                              <h3 className="text-sm font-bold text-black leading-tight max-w-37.5 truncate">
                                   {track.name}
                              </h3>
                              <p className="text-xs text-zinc-500 max-w-37.5 truncate">
                                   {track.artists.map(a => a.name).join(', ')}
                              </p>
                         </div>

                         {/* Play Icon (Visual Only) */}
                         <div className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-black text-white">
                              <FaSpotify className="w-4 h-4" />
                         </div>
                    </div>
               </Magnetic>
          </div>
     );
}
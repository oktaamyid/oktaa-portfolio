'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { FaPlay, FaPause } from 'react-icons/fa';
import { SpotifyTrack } from '@/lib/spotify';

interface NowPlayingProps {
     track: SpotifyTrack | null;
}

export default function NowPlaying({ track }: NowPlayingProps) {
     const [isPlaying, setIsPlaying] = useState(false);
     const [progress, setProgress] = useState(0);
     const animationRef = useRef<number | null>(null);
     const duration = track?.duration_ms ?? 0;

     const togglePlay = () => {
          setIsPlaying(!isPlaying);
     };

     useEffect(() => {
          if (!isPlaying) {
               cancelAnimationFrame(animationRef.current!);
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
                    setIsPlaying(false);
                    setProgress(0);
               }
          };

          animationRef.current = requestAnimationFrame(updateProgress);

          return () => {
               cancelAnimationFrame(animationRef.current!);
          };
     }, [isPlaying, duration, progress]);

     useEffect(() => {
          // Reset progress when track changes
          setProgress(0);
          setIsPlaying(true);
     }, [track]);

     if (!track) {
          return (
               <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-dashed border-gray-600 aspect-video w-full max-w-xs flex flex-col items-center justify-center p-6 text-center mx-auto">
                    <h2 className="text-xl font-bold text-white mb-2">Now Playing</h2>
                    <p className="text-gray-400">No active track</p>
               </div>
          );
     }

     // Format milliseconds to minutes:seconds
     const formatTime = (ms: number) => {
          const seconds = Math.floor(ms / 1000);
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
     };

     return (
          <div className="relative aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-lg bg-gray-900">
               {/* Album art */}
               <div className="relative w-full h-full">
                    <Image
                         src={track?.album?.images?.[0]?.url ?? '/default-album.png'}
                         alt={track?.name ?? 'Unknown Track'}
                         fill
                         className="object-cover"
                         priority
                    />
               </div>

               {/* Overlay and info */}
               <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                         {isPlaying ? 'PLAYING' : 'PAUSED'}
                    </div>

                    <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                         <h3 className="text-white font-bold text-lg line-clamp-1">{track?.name || 'Unknown Track'}</h3>
                         <p className="text-gray-300 text-sm line-clamp-1">
                              {track?.artists?.map((artist: { name: string }) => artist.name).join(', ') ?? 'Unknown Artist'}
                         </p>
                    </div>

                    {/* Progress bar and time */}
                    <div className="mt-2 flex items-center gap-2">
                         <span className="text-xs text-gray-400">
                              {formatTime(progress)}
                         </span>
                         <div className="flex-1 bg-gray-700 rounded-full h-1">
                              <div
                                   className="bg-green-500 h-1 rounded-full"
                                   style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                              />
                         </div>
                         <span className="text-xs text-gray-400">
                              {formatTime(duration)}
                         </span>
                    </div>

                    {/* Play/Pause button */}
                    <button
                         onClick={togglePlay}
                         className="absolute right-3 bottom-3 bg-green-600 hover:bg-green-500 text-white rounded-full p-3 transition-all transform hover:scale-110"
                    >
                         {isPlaying ? <FaPause className="w-3 h-3" /> : <FaPlay className="w-3 h-3" />}
                    </button>
               </div>
          </div>
     );
}
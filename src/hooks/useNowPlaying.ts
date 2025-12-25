import { useState, useEffect, useRef } from 'react';
import { SpotifyTrack } from '@/lib/spotify';

export function useNowPlaying(initialTrack: SpotifyTrack | null) {
     const [track, setTrack] = useState<SpotifyTrack | null>(initialTrack);
     const [isPlaying, setIsPlaying] = useState(false);

     // Poll for updates
     useEffect(() => {
          const fetchNowPlaying = async () => {
               try {
                    const res = await fetch('/api/now-playing');
                    if (res.ok) {
                         const newTrack = await res.json();
                         setTrack(newTrack);
                    }
               } catch (error) {
                    console.error('Failed to fetch now playing:', error);
               }
          };

          const interval = setInterval(fetchNowPlaying, 5000); // Poll every 5 seconds
          return () => clearInterval(interval);
     }, []);

     // Update isPlaying state
     useEffect(() => {
          if (track?.is_playing) {
               setIsPlaying(true);
          } else {
               setIsPlaying(false);
          }
     }, [track]);

     return { track, isPlaying };
}

import { useState, useEffect } from 'react';
import { SpotifyTrack } from '@/lib/spotify';

export function useNowPlaying(initialTrack: SpotifyTrack | null) {
     const [track, setTrack] = useState<SpotifyTrack | null>(initialTrack);
     const [isPlaying, setIsPlaying] = useState(initialTrack?.is_playing ?? false);

     // Poll for updates
     useEffect(() => {
          let isMounted = true;

          const fetchNowPlaying = async () => {
               try {
                    const res = await fetch('/api/now-playing');
                    if (res.ok && isMounted) {
                         const newTrack = await res.json();
                         setTrack(newTrack);
                         setIsPlaying(newTrack?.is_playing ?? false);
                    }
               } catch (error) {
                    console.error('Failed to fetch now playing:', error);
               }
          };

          fetchNowPlaying(); // Fetch immediately on mount
          const interval = setInterval(fetchNowPlaying, 5000); // Poll every 5 seconds

          return () => {
               isMounted = false;
               clearInterval(interval);
          };
     }, []);

     // Update isPlaying state whenever track changes
     useEffect(() => {
          if (track?.is_playing) {
               setIsPlaying(true);
          } else {
               setIsPlaying(false);
          }
     }, [track]);

     return { track, isPlaying };
}

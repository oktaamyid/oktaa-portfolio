import Image from 'next/image';
import { SpotifyTrack } from '@/lib/spotify';

interface NowPlayingProps {
     track: SpotifyTrack | null;
}

export default function NowPlaying({ track }: NowPlayingProps) {
     if (!track) {
          return (
               <div className="bg-gray-800 p-4 rounded-lg">
                    <p>No track currently playing</p>
               </div>
          );
     }

     return (
          <div className="bg-gray-800 p-4 rounded-lg">
               <h2 className="text-xl font-semibold mb-2">Now Playing</h2>
               <div className="flex items-center gap-3">
                    <Image
                         src={track.album.images[0].url}
                         alt={track.name}
                         width={64}
                         height={64}
                         className="rounded"
                         priority
                    />
                    <div>
                         <h3 className="font-medium">{track.name}</h3>
                         <p className="text-sm text-gray-400">
                              {track.artists.map(artist => artist.name).join(', ')}
                         </p>
                    </div>
               </div>
          </div>
     );
}
import Image from 'next/image';
import { SpotifyTrack } from '@/lib/spotify';
import { FaPlay } from 'react-icons/fa';

interface NowPlayingProps {
     track: SpotifyTrack | null;
}

export default function NowPlaying({ track }: NowPlayingProps) {
     if (!track) {
          return (
               <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700 w-full max-w-2xl mx-auto">
                    <h2 className="text-xl font-semibold text-center">Now Playing</h2>
                    <p className="text-center text-gray-400">No track currently playing</p>
               </div>
          );
     }

     return (
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700 w-full max-w-2xl mx-auto">
               <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Now Playing</h2>
               <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="relative flex-shrink-0">
                         <Image
                              src={track.album.images[0].url}
                              alt={track.name}
                              width={120}
                              height={120}
                              className="rounded-lg shadow-lg w-24 h-24 sm:w-32 sm:h-32"
                              priority
                         />
                         <a
                              href={track.external_urls.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute bottom-2 right-2 bg-green-600 hover:bg-green-500 text-white rounded-full p-2 transition-all transform hover:scale-110"
                              aria-label="Play on Spotify"
                         >
                              <FaPlay className="w-3 h-3 sm:w-4 sm:h-4" />
                         </a>
                    </div>

                    <div className="flex-1 min-w-0 text-center sm:text-left">
                         <h3 className="font-bold text-lg sm:text-xl line-clamp-2">{track.name}</h3>
                         <p className="text-gray-400 mt-1 line-clamp-1">
                              {track.artists.map(artist => artist.name).join(', ')}
                         </p>
                         <p className="text-sm text-gray-500 mt-2 line-clamp-1">{track.album.name}</p>

                         <div className="mt-3 sm:mt-4">
                              <a
                                   href={track.external_urls.spotify}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors"
                              >
                                   <span className="text-sm sm:text-base">Play on Spotify</span>
                                   <FaPlay className="w-3 h-3" />
                              </a>
                         </div>
                    </div>
               </div>
          </div>
     );
}
import Image from 'next/image';
import { SpotifyTrack } from '@/lib/spotify';
import { FaPlay } from 'react-icons/fa';

interface TopTracksProps {
     tracks: SpotifyTrack[];
}

export default function TopTracks({ tracks }: TopTracksProps) {
     return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
               {tracks.map((track, index) => (
                    <a
                         key={track.id}
                         href={track.external_urls.spotify}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="group relative aspect-square overflow-hidden rounded-lg hover:ring-2 hover:ring-green-500 transition-all duration-300"
                    >
                         {/* Album art background with transition */}
                         {track.album.images[0]?.url ? (
                              <Image
                                   src={track.album.images[0].url}
                                   alt={track.name}
                                   fill
                                   className="object-cover transition-transform duration-700 group-hover:scale-110"
                                   quality={50}
                              />
                         ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                         )}

                         {/* Gradient overlay for better text visibility */}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-90" />

                         {/* Content with slide-up effect */}
                         <div className="absolute inset-0 flex flex-col justify-end pb-3 px-3 text-start">
                              <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                   <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 drop-shadow-lg">
                                        {track.name}
                                   </h3>
                                   <p className="text-gray-300 text-xs sm:text-sm line-clamp-1 mt-1 transition-opacity duration-300 opacity-90 group-hover:opacity-100">
                                        {track.artists.map(artist => artist.name).join(', ')}
                                   </p>
                              </div>
                         </div>

                         {/* Play button */}
                         <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                              <div className="bg-green-600 hover:bg-green-500 text-white rounded-full p-2 transition-all">
                                   <FaPlay className="w-2 h-2 sm:w-3 sm:h-3" />
                              </div>
                         </div>

                         {/* Track number */}
                         <div className="absolute left-3 top-3 bg-black/70 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                              {index + 1}
                         </div>
                    </a>
               ))}
          </div>
     );
}
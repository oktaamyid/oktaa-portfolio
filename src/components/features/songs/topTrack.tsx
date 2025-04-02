import Image from 'next/image';
import { SpotifyTrack } from '@/lib/spotify';

interface TopTracksProps {
     tracks: SpotifyTrack[];
}

export default function TopTracks({ tracks }: TopTracksProps) {
     return (
          <div className="bg-gray-800 p-4 rounded-lg">
               <h2 className="text-xl font-semibold mb-3">Top Tracks</h2>
               <div className="space-y-3">
                    {tracks.map((track, index) => (
                         <div key={track.id} className="flex items-center gap-3">
                              <span className="text-gray-400 w-5">{index + 1}</span>
                              <Image
                                   src={track.album.images[2].url}
                                   alt={track.name}
                                   width={40}
                                   height={40}
                                   className="rounded"
                              />
                              <div className="flex-1 min-w-0">
                                   <p className="font-medium truncate">{track.name}</p>
                                   <p className="text-sm text-gray-400 truncate">
                                        {track.artists.map(artist => artist.name).join(', ')}
                                   </p>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
}
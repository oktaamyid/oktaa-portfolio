import { getNowPlaying, getTopTracks } from '@/lib/spotify';
import NowPlaying from '@/components/features/songs/nowPlaying';
import TopTracks from '@/components/features/songs/topTrack';

export const revalidate = 3600; // Revalidate every hour

export default async function SongsPage() {
     const [nowPlaying, topTracks] = await Promise.all([
          getNowPlaying(),
          getTopTracks()
     ]);

     return (
          <div className="min-h-screen bg-gray-900 text-white p-4">
               <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">My Spotify</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <NowPlaying track={nowPlaying} />
                         <TopTracks tracks={topTracks} />
                    </div>
               </div>
          </div>
     );
}
import { getNowPlaying, getTopTracks } from '@/lib/spotify';
import NowPlaying from '@/components/features/songs/nowPlaying';
import TopTracks from '@/components/features/songs/topTrack';
import SidebarSocials from '@/components/layouts/sidebarSocials';

export const revalidate = 3600;

export default async function SongsPage() {
     const [nowPlaying, topTracks] = await Promise.all([
          getNowPlaying(),
          getTopTracks()
     ]);

     return (
          <div className="max-w-5xl mx-auto px-4 py-12 space-y-16 mt-14">
               {/* Sidebar Socials */}
               <SidebarSocials />
               <h1 className="text-3xl font-bold text-center">My Songs Journey</h1>

               <div className="flex justify-center">
                    {nowPlaying && <NowPlaying track={nowPlaying} />}
               </div>

               <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-center">Top Tracks That Define Me</h2>
                    <TopTracks tracks={topTracks} />
               </div>
          </div>
     );
}
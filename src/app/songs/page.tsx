
import { getNowPlaying, getTopTracks } from '@/lib/spotify';
import TopTracks from '@/components/features/songs/topTrack';
import NowPlaying from '@/components/features/songs/nowPlaying';
import ScrollParallax from '@/components/ui/ScrollParallax';

export const revalidate = 3600; // Cache for 1 hour

export default async function SongsPage() {
     const [nowPlaying, topTracksShort, topTracksMedium] = await Promise.all([
          getNowPlaying(),
          getTopTracks('short_term', 8), // Last 4 weeks
          getTopTracks('medium_term', 8), // Last 6 months  
     ]);

     const hasAnyData = nowPlaying || topTracksShort.length > 0 || topTracksMedium.length > 0;

     return (
          <div className="min-h-screen pt-32 pb-24 bg-white text-black">
               <NowPlaying track={nowPlaying} />
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-end justify-between mb-24 pb-8 border-b border-black/10">
                         <div>
                              <h1 className="text-6xl md:text-8xl font-black font-poppins uppercase leading-none tracking-tighter">
                                   <ScrollParallax offset={20} axis="x" className="inline-block">
                                        <span className="block text-zinc-300">Heavy</span>
                                   </ScrollParallax>
                                   <ScrollParallax offset={-20} axis="x" className="inline-block">
                                        <span className="block text-black">Rotation.</span>
                                   </ScrollParallax>
                              </h1>
                         </div>
                         <div className="mt-8 md:mt-0 md:text-right">
                              <p className="text-zinc-500 uppercase tracking-widest text-sm font-medium">
                                   CURRENT JAMS <br /> ON REPEAT∞
                              </p>
                         </div>
                    </div>

                    {!hasAnyData && (
                         <div className="text-center py-24 border border-dashed border-zinc-200 rounded-2xl">
                              <p className="text-zinc-400 font-medium">
                                   Spotify data is strictly for the vibes.<br />Currently unavailable.
                              </p>
                         </div>
                    )}

                    {/* Top Tracks - Last Month */}
                    {topTracksShort.length > 0 && (
                         <div className="mb-24">
                              <div className="flex items-center gap-4 mb-12">
                                   <div className="h-px bg-black/10 flex-1"></div>
                                   <h2 className="text-sm font-bold uppercase tracking-widest text-black/40">
                                        Current Mood (4 Weeks)
                                   </h2>
                                   <div className="h-px bg-black/10 flex-1"></div>
                              </div>
                              <TopTracks tracks={topTracksShort} />
                         </div>
                    )}

                    {/* Top Tracks - Last 6 Months */}
                    {topTracksMedium.length > 0 && (
                         <div className="mb-12">
                              <div className="flex items-center gap-4 mb-12">
                                   <div className="h-px bg-black/10 flex-1"></div>
                                   <h2 className="text-sm font-bold uppercase tracking-widest text-black/40">
                                        All Time Classics (6 Months)
                                   </h2>
                                   <div className="h-px bg-black/10 flex-1"></div>
                              </div>
                              <TopTracks tracks={topTracksMedium} />
                         </div>
                    )}
               </div>
          </div>
     );
}
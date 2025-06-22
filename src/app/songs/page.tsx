import { getNowPlaying, getTopTracks } from '@/lib/spotify';
// import NowPlaying from '@/components/features/songs/nowPlaying';
import TopTracks from '@/components/features/songs/topTrack';

export const revalidate = 3600; // Cache selama 1 jam

export default async function SongsPage() {
     const [nowPlaying, topTracksShort, topTracksMedium, ] = await Promise.all([
          getNowPlaying(),
          getTopTracks('short_term', 8), // 4 minggu terakhir
          getTopTracks('medium_term', 8), // 6 bulan terakhir  
          // getRecentlyPlayed(10) // 10 lagu terakhir yang diputar
     ]);

     // Check if we have data or if there are scope issues
     const hasAnyData = nowPlaying || topTracksShort.length > 0 || topTracksMedium.length > 0;

     return (
          <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
               {/* <h1 className="text-3xl font-bold text-center">My Songs Journey</h1> */}

               {!hasAnyData && (
                    <div className="text-center py-12">
                         <p className="text-gray-600 dark:text-gray-400">
                              Spotify data is currently unavailable. This might be due to API configuration or authorization scope issues.
                         </p>
                    </div>
               )}

               {/* Now Playing Section */}
               {/* {nowPlaying && (
                    <div className="flex justify-center">
                         <NowPlaying track={nowPlaying} />
                    </div>
               )} */}

               {/* Top Tracks - Last Month */}
               {topTracksShort.length > 0 && (
                    <div className="space-y-8">
                         <div>
                              <h2 className="text-2xl font-bold text-center">Top Tracks This Month</h2>
                              <p className="text-center text-gray-600 dark:text-gray-400 mt-2">Based on last 4 weeks</p>
                         </div>
                         <TopTracks tracks={topTracksShort} />
                    </div>
               )}

               {/* Top Tracks - Last 6 Months */}
               {topTracksMedium.length > 0 && (
                    <div className="space-y-8">
                         <div>
                              <h2 className="text-2xl font-bold text-center">All-Time Favorites</h2>
                              <p className="text-center text-gray-600 dark:text-gray-400 mt-2">Based on last 6 months</p>
                         </div>
                         <TopTracks tracks={topTracksMedium} />
                    </div>
               )}
          </div>
     );
}
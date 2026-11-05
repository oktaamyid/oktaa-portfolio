import { getNowPlaying, getTopTracks } from '@/lib/spotify';
import SongsContent from '@/components/features/songs/SongsContent';

export const dynamic = 'force-dynamic';

export default async function SongsPage() {
     const [nowPlaying, topTracksShort, topTracksMedium] = await Promise.all([
          getNowPlaying(),
          getTopTracks('short_term', 10), // Last 4 weeks
          getTopTracks('medium_term', 10), // Last 6 months  
     ]);

     return (
          <SongsContent
               nowPlaying={nowPlaying}
               topTracksShort={topTracksShort}
               topTracksMedium={topTracksMedium}
          />
     );
}

'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { SpotifyTrack } from '@/lib/spotify';
import TopTracks from '@/components/features/songs/topTrack';
import NowPlaying from '@/components/features/songs/nowPlaying';
import ScrollParallax from '@/components/ui/ScrollParallax';

interface SongsContentProps {
     nowPlaying: SpotifyTrack | null;
     topTracksShort: SpotifyTrack[];
     topTracksMedium: SpotifyTrack[];
}

export default function SongsContent({ nowPlaying, topTracksShort, topTracksMedium }: SongsContentProps) {
     const { t } = useLanguage();
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
                                        <span className="block text-black font-serif italic font-light tracking-normal">{t("Heavy", "Musik")}</span>
                                   </ScrollParallax>
                                   <ScrollParallax offset={-20} axis="x" className="inline-block">
                                        <span className="block text-black">{t("Rotation.", "Favorit.")}</span>
                                   </ScrollParallax>
                              </h1>
                         </div>
                         <div className="mt-8 md:mt-0 md:text-right">
                              <p className="text-zinc-500 uppercase tracking-widest text-sm font-medium">
                                   {t("CURRENT JAMS", "LAGU SAAT INI")} <br /> {t("ON REPEAT∞", "DIPUTAR ULANG∞")}
                              </p>
                         </div>
                    </div>

                    {!hasAnyData && (
                         <div className="text-center py-24 border border-dashed border-zinc-200 rounded-2xl">
                              <p className="text-zinc-400 font-medium">
                                   {t("Spotify data is strictly for the vibes.", "Data Spotify hanya untuk suasana.")}<br />
                                   {t("Currently unavailable.", "Saat ini tidak tersedia.")}
                              </p>
                         </div>
                    )}

                    {/* Top Tracks - Last Month */}
                    {topTracksShort.length > 0 && (
                         <div className="mb-24">
                              <div className="flex items-center gap-4 mb-12">
                                   <div className="h-px bg-black/10 flex-1"></div>
                                   <h2 className="text-sm font-bold uppercase tracking-widest text-black/40">
                                        {t("Current Mood (4 Weeks)", "Mood Saat Ini (4 Minggu)")}
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
                                        {t("All Time Classics (6 Months)", "Klasik Sepanjang Masa (6 Bulan)")}
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

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_USERNAME = process.env.LASTFM_USERNAME;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

export interface SpotifyTrack {
     id: string;
     name: string;
     artists: { name: string }[];
     album: {
          images: { url: string }[];
          name: string;
     };
     type: 'track';
     duration_ms: number;
     external_urls: {
          spotify: string;
     };
     is_playing?: boolean;
}

// Mendapatkan token generic dari Spotify (Tidak butuh akun Premium)
async function getSpotifyGenericToken() {
     if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) return null;

     const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
     try {
          const response = await fetch('https://accounts.spotify.com/api/token', {
               method: 'POST',
               headers: {
                    Authorization: `Basic ${basic}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: new URLSearchParams({ grant_type: 'client_credentials' }),
               next: { revalidate: 3500 } // Cache token hampir 1 jam
          });
          const data = await response.json();
          return data.access_token;
     } catch (e) {
          console.error("Failed to get spotify generic token", e);
          return null;
     }
}

// Mencari album cover di Spotify berdasarkan nama lagu dan artis
async function getSpotifyCover(trackName: string, artistName: string, token: string): Promise<{ url: string }[] | null> {
     try {
          const query = encodeURIComponent(`track:${trackName} artist:${artistName}`);
          const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
               headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          const spotifyTrack = data.tracks?.items?.[0];

          if (spotifyTrack?.album?.images?.length > 0) {
               return spotifyTrack.album.images;
          }
          return null;
     } catch (e) {
          return null;
     }
}

// tslint:disable-next-line: no-explicit-any
function mapLastfmTrack(track: any): SpotifyTrack {
     let images = track.image
          ? track.image.map((img: any) => ({ url: img['#text'] })).reverse()
          : [];

     // Hapus gambar bintang default Last.fm
     images = images.filter((i: any) => i.url && i.url.length > 0 && !i.url.includes('2a96cbd8b46e442fc41c2b86b821562f.png'));

     const artistName = typeof track.artist === 'string'
          ? track.artist
          : (track.artist?.name || track.artist?.['#text'] || 'Unknown Artist');

     const albumName = track.album?.['#text'] || track.name;

     return {
          id: `${track.mbid || track.name}-${artistName}`.replace(/\s+/g, '-').toLowerCase(),
          name: track.name,
          artists: [{ name: artistName }],
          album: {
               images: images,
               name: albumName,
          },
          type: 'track',
          duration_ms: parseInt(track.duration || '0') * 1000 || 180000,
          external_urls: {
               spotify: track.url || `https://open.spotify.com/search/${encodeURIComponent(`${track.name} ${artistName}`)}`,
          },
          is_playing: track['@attr']?.nowplaying === 'true'
     }
}

// Fungsi helper untuk memperkaya track Last.fm dengan gambar dari Spotify
async function enrichTracksWithSpotifyImages(tracks: SpotifyTrack[]): Promise<SpotifyTrack[]> {
     const token = await getSpotifyGenericToken();
     if (!token) return tracks;

     const enrichedTracks = await Promise.all(tracks.map(async (track) => {
          // Jika gambar kosong, cari di Spotify
          if (!track.album.images || track.album.images.length === 0) {
               const spotifyImages = await getSpotifyCover(track.name, track.artists[0].name, token);
               if (spotifyImages) {
                    return {
                         ...track,
                         album: { ...track.album, images: spotifyImages }
                    };
               }
          }
          return track;
     }));

     return enrichedTracks;
}

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
     if (!LASTFM_API_KEY || !LASTFM_USERNAME) return null;

     try {
          const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`, {
               cache: 'no-store'
          });

          if (!response.ok) return null;

          const data = await response.json();
          const track = data.recenttracks?.track?.[0];

          if (!track || track['@attr']?.nowplaying !== 'true') {
               return null;
          }

          let mappedTrack = mapLastfmTrack(track);
          const enrichedResp = await enrichTracksWithSpotifyImages([mappedTrack]);
          return enrichedResp[0];
     } catch (e) {
          console.error("Last.fm now playing error:", e);
          return null;
     }
}

export async function getTopTracks(
     timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
     limit: number = 8
): Promise<SpotifyTrack[]> {
     if (!LASTFM_API_KEY || !LASTFM_USERNAME) return [];

     let period = '1month';
     if (timeRange === 'short_term') period = '1month';
     if (timeRange === 'medium_term') period = '6month';
     if (timeRange === 'long_term') period = 'overall';

     try {
          const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&period=${period}&limit=${limit}`, {
               next: { revalidate: 3600 }
          });

          if (!response.ok) return [];

          const data = await response.json();
          // tslint:disable-next-line: no-explicit-any
          const tracks = data.toptracks?.track || [];
          // tslint:disable-next-line: no-explicit-any
          let mappedTracks = tracks.map((track: any) => mapLastfmTrack(track));

          return await enrichTracksWithSpotifyImages(mappedTracks);
     } catch (e) {
          console.error("Last.fm top tracks error:", e);
          return [];
     }
}

export async function getRecentlyPlayed(limit: number = 10): Promise<SpotifyTrack[]> {
     if (!LASTFM_API_KEY || !LASTFM_USERNAME) return [];
     try {
          const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=${limit}`, {
               cache: 'no-store'
          });

          if (!response.ok) return [];

          const data = await response.json();
          // tslint:disable-next-line: no-explicit-any
          const tracks = data.recenttracks?.track || [];
          // tslint:disable-next-line: no-explicit-any
          let mappedTracks = tracks.map((track: any) => mapLastfmTrack(track));

          return await enrichTracksWithSpotifyImages(mappedTracks);
     } catch (e) {
          console.error("Last.fm recently played error:", e);
          return [];
     }
}
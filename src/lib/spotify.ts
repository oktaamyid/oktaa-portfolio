import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
     clientId: process.env.SPOTIFY_CLIENT_ID,
     clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
     refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
});

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
}

interface SpotifyNowPlayingResponse {
     item: SpotifyTrack | null;
     is_playing: boolean;
}

interface SpotifyError {
     body?: {
          error?: {
               status: number;
               message: string;
          };
     };
     statusCode?: number;
     message?: string;
}

interface SpotifyRecentlyPlayedItem {
     track: SpotifyTrack;
     played_at: string;
     context?: {
          type: string;
          href: string;
          external_urls: {
               spotify: string;
          };
          uri: string;
     };
}

function isSpotifyError(error: unknown): error is SpotifyError {
     return (
          typeof error === 'object' &&
          error !== null &&
          'body' in error &&
          typeof (error as SpotifyError).body === 'object'
     );
}

function isScopeError(error: unknown): boolean {
     if (!isSpotifyError(error)) return false;
     return error.body?.error?.message?.toLowerCase().includes('scope') ?? false;
}

async function refreshAccessToken(): Promise<void> {
     try {
          const data = await spotifyApi.refreshAccessToken();
          spotifyApi.setAccessToken(data.body.access_token);
     } catch (error: unknown) {
          console.error('Error refreshing access token:', error);
          throw error;
     }
}

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
     try {
          await refreshAccessToken();
          const response = await spotifyApi.getMyCurrentPlayingTrack();
          const data = response.body as SpotifyNowPlayingResponse;

          return data?.item?.type === 'track' ? data.item : null;
     } catch (error: unknown) {
          console.error('Error getting now playing:', error);
          // Jika scope tidak cukup, return null agar tidak crash
          if (isScopeError(error)) {
               console.warn('Insufficient scope for now playing. Need user-read-currently-playing scope.');
          }
          return null;
     }
}

export async function getTopTracks(
     timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
     limit: number = 8
): Promise<SpotifyTrack[]> {
     try {
          await refreshAccessToken();
          const response = await spotifyApi.getMyTopTracks({
               limit,
               time_range: timeRange
          });
          return response.body.items.filter((item: SpotifyTrack) => item.type === 'track');
     } catch (error: unknown) {
          console.error('Error getting top tracks:', error);
          // Jika scope tidak cukup, return empty array
          if (isScopeError(error)) {
               console.warn('Insufficient scope for top tracks. Need user-top-read scope.');
          }
          return [];
     }
}

export async function getRecentlyPlayed(limit: number = 10): Promise<SpotifyTrack[]> {
     try {
          await refreshAccessToken();
          const response = await spotifyApi.getMyRecentlyPlayedTracks({ limit });
          return response.body.items
               .map((item: SpotifyRecentlyPlayedItem) => item.track)
               .filter((track: SpotifyTrack) => track.type === 'track');
     } catch (error: unknown) {
          console.error('Error getting recently played:', error);
          // Jika scope tidak cukup, return empty array
          if (isScopeError(error)) {
               console.warn('Insufficient scope for recently played. Need user-read-recently-played scope.');
          }
          return [];
     }
}
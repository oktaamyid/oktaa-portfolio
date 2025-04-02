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

async function refreshAccessToken() {
     const data = await spotifyApi.refreshAccessToken();
     spotifyApi.setAccessToken(data.body.access_token);
}

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
     try {
          await refreshAccessToken();
          const response = await spotifyApi.getMyCurrentPlayingTrack();
          const data = response.body as SpotifyNowPlayingResponse;

          return data?.item?.type === 'track' ? data.item : null;
     } catch (error) {
          console.error('Error getting now playing:', error);
          return null;
     }
}

export async function getTopTracks(): Promise<SpotifyTrack[]> {
     try {
          await refreshAccessToken();
          const response = await spotifyApi.getMyTopTracks({ limit: 8 });
          return response.body.items.filter((item: SpotifyTrack) => item.type === 'track');
     } catch (error) {
          console.error('Error getting top tracks:', error);
          return [];
     }
}
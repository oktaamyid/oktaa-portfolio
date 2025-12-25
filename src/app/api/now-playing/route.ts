import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
     try {
          const track = await getNowPlaying();
          return NextResponse.json(track);
     } catch (error) {
          console.error('Error in /api/now-playing:', error);
          return NextResponse.json(null, { status: 500 });
     }
}

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json(
                { error: 'URL parameter is required' },
                { status: 400 }
            );
        }

        const screenshotApiKey = process.env.SCREENSHOT_API_KEY;

        if (!screenshotApiKey) {
            return NextResponse.json(
                { error: 'Screenshot API key not configured' },
                { status: 500 }
            );
        }

        const screenshotUrl = `https://api.screenshotmachine.com?key=${screenshotApiKey}&url=${encodeURIComponent(url)}&dimension=1280x800`;

        // Return the screenshot URL or redirect to it
        return NextResponse.json({ 
            screenshotUrl,
            success: true 
        });

    } catch (error) {
        console.error('Error generating screenshot URL:', error);
        return NextResponse.json(
            { error: 'Failed to generate screenshot URL' },
            { status: 500 }
        );
    }
}

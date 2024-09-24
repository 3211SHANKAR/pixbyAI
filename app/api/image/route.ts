import { NextResponse } from 'next/server';
import { Hit } from './types';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q'); 

    const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
    
    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const pixabayURL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo`;

    try {
        const response = await fetch(pixabayURL);
        const data = await response.json();

        if (data.totalHits === 0) {
            return NextResponse.json({ message: 'No images found' }, { status: 404 });
        }

        const images = data.hits.map((hit:Hit) => ({
            id: hit.id,
            tags: hit.tags,
            previewURL: hit.previewURL,
            webformatURL: hit.webformatURL,
            largeImageURL: hit.largeImageURL,
            views: hit.views,
            downloads: hit.downloads,
            user: hit.user,
            userImageURL: hit.userImageURL,
            pageURL: hit.pageURL,
        }));

        return NextResponse.json({ total: data.total, images });

    } catch (e) {
        return NextResponse.json({ message: 'Failed to fetch images', error: e }, { status: 501 });
    }
}

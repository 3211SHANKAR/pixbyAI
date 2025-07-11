import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ images: [] });
    }
    // Use Lexica.art API for free prompt-to-image (no API key required)
    // Docs: https://lexica.art/docs/api-reference#search
    const lexicaUrl = `https://lexica.art/api/v1/search?q=${encodeURIComponent(prompt)}`;
    const res = await fetch(lexicaUrl);
    console.log('Lexica response status:', res.status);
    console.log('Lexica response headers:', JSON.stringify(Object.fromEntries(res.headers.entries())));
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Lexica API error:', errorText);
      return NextResponse.json({ images: [], error: `Lexica API error: ${res.status} - ${errorText}` });
    }
    let text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Lexica API error (invalid JSON):", text);
      return NextResponse.json({ images: [], error: text });
    }
    // Lexica returns an array of images in data.images, each with a .src property
    const images = Array.isArray(data.images) ? data.images.map((img: any) => img.src) : [];
    return NextResponse.json({ images });
  } catch (error) {
    let errorMsg = 'Unknown error';
    if (error instanceof Error) {
      errorMsg = error.message + (error.stack ? ('\n' + error.stack) : '');
    } else if (typeof error === 'string') {
      errorMsg = error;
    } else {
      try {
        errorMsg = JSON.stringify(error);
      } catch {}
    }
    console.error('Error generating image:', errorMsg);
    return NextResponse.json({ images: [], error: errorMsg });
  }
}

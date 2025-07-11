import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string.' },
        { status: 400 }
      );
    }

    const HF_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';

    const hfResponse = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        options: { wait_for_model: true },
      }),
    });

    if (!hfResponse.ok) {
      const errText = await hfResponse.text();
      console.error('❌ Hugging Face API error:', hfResponse.status, errText);
      return NextResponse.json(
        { error: 'Image generation failed: ' + errText },
        { status: 500 }
      );
    }

    const arrayBuffer = await hfResponse.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    // NOTE: Hugging Face returns image/jpeg for SDXL
    const contentType = hfResponse.headers.get("content-type") || "image/jpeg";
    const imageUrl = `data:${contentType};base64,${base64}`;

    return NextResponse.json({ imageUrl });
  } catch (error:unknown) {
    console.error('❌ Server error while generating image:', error);
    return NextResponse.json(
      {
        error: 'Internal server error during image generation.',
        details: String(error),
      },
      { status: 500 }
    );
  }
}

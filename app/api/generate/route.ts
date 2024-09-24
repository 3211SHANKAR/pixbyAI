import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with your API Key
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,  // Replace with your OpenAI Key environment variable
  dangerouslyAllowBrowser: true,    // For client-side requests if needed
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required and must be a string' }, { status: 400 });
    }

    // Generate the image based on the prompt
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    if (response && response.data && response.data.length > 0) {
      const imageUrl = response.data[0].url;
      return NextResponse.json({ imageUrl });
    } else {
      return NextResponse.json({ error: 'Failed to generate image.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Something went wrong while generating the image.' }, { status: 500 });
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const fetchImages = async (category:string) => {
  const res = await fetch(
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${category}&image_type=photo&pretty=true`
  );
  // const res = await fetch(
  //   `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${category}&editors_choice=true&image_type=photo`
  // );
  const data = await res.json();
  return data.hits;
};

export async function GET() {
  try {
    const categories = ["nature", "science", "education", "places", "computer", "food", "sports", "music"];

    // const imagesByCategory = await fetchImages();

    const promises = categories.map((category) => fetchImages(category));
    const imagesByCategory = await Promise.all(promises);

    return NextResponse.json(imagesByCategory);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch images', error }, { status: 500 });
  }
}

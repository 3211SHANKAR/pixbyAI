"use client";
import React from 'react'
import { CardsCarousel } from './CardsCarousel'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/store/store';
import SearchResults from './SearchResults';
import { Hit } from '@/app/api/image/types';
import { Trophy } from 'lucide-react';

// import Image from "next/image";

// Define the type for a single image item
export type ImageItem = {
    category: string;     
    title: string;        
    tags: string[];         
    src: string;          
    largeImageURL: string;
    views: number;        
    downloads: number;    
    user: string;         
    userImageURL: string; 
    pageURL: string;      
  };
  
  
  export type CategoryData = {
    category: string;
    data: ImageItem[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const convertToCustomFormat = (category: string, images: any): CategoryData => {
    return {
      category,
      data: images.map((image:Hit) => ({
        category,
        title: `Image by ${image.user}`,
        tags: image.tags.split(', '), 
        src: image.webformatURL,
        largeImageURL: image.largeImageURL,
        views: image.views,
        downloads: image.downloads,
        user: image.user,
        userImageURL: image.userImageURL,
        pageURL: image.pageURL,
      })),
    };
  };
  

 export type LatestImagesResponse = CategoryData[];

const HomeImages = () => {
    const [imagesByCategory, setImagesByCategory] = useState([]);
    const { images} = useAppSelector((state) => state.searchImages);


    useEffect(() => {
        const fetchImages = async () => {
            const response = await axios.get('/api/latest');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const customData = response.data.map((images: any, index: number) => {
              const category = ["nature", "science", "education", "places", "computer", "food", "sports", "music"][index];
              return convertToCustomFormat(category, images);
            });
            setImagesByCategory(customData);
            console.log("response",response.data);
            console.log("custom",customData);
        };

        fetchImages();
    }, []);

  return (
    <div className=' w-full h-full flex flex-col gap-4 items-start justify-normal '>
      {
        images.length > 0 ? (
          <SearchResults images={images} />
        ) :
          <>
            <h2 className=" text-left w-full text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            <Trophy size={32} className="inline " color='gold' />  Editor{"'"}s Choice on Pixabay 
            </h2>
            {
              imagesByCategory.map((category: CategoryData) => (
                <CardsCarousel data={category} key={category.category} />
              ))
            }
          </>
      }
    </div>
  )
}

export default HomeImages
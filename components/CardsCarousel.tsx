/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { CategoryData as DataPropsObject, ImageItem } from "./HomeImages";
import { Download, DownloadIcon, EyeIcon, Heart, TagIcon, User } from "lucide-react";
import { addToFavorites, removeFromFavorites } from "@/store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import ShareButton from "./ShareButton";
import { downloadImage } from "@/lib/downloadImage";


export function CardsCarousel({data}:{data:DataPropsObject}) {
  const cards = data.data.map((card, index) => (
        <Card key={card.src} card={card} content={<Content data={card} />} views={card.views} downloads={card.downloads} index={index} />
    ));

  return (
    <div className="w-full h-full pt-5">
      <h1 className=" text-lg sm:text-xl font-medium md:max-w-lg text-wrap underline decoration-dashed underline-offset-4 decoration-gray-500 ">
        Category - {data.category.toUpperCase()}
      </h1>
      <Carousel items={cards} />
    </div>
  );
}


export const Content = ({data}: {data:ImageItem}) => {
    const dispatch = useAppDispatch();

    // Get the current list of favorite images from the store
    const favoriteImages = useAppSelector((state) => state.favoriteImages.images);
  
    // Check if the image is already in favorites
    const isFavorite = favoriteImages.some(fav => fav.src === data.src);
  
    const handleToggleFavorite = () => {
      if (isFavorite) {
        // If it's already a favorite, remove it
        const imageIndex = favoriteImages.findIndex(fav => fav.src === data.src);
        dispatch(removeFromFavorites(imageIndex));
      } else {
        // Otherwise, add it to favorites
        dispatch(addToFavorites(data));
      }
    };
     

    const handleDownload = () => {
        downloadImage(data.largeImageURL, `image-${data.title}.jpg`);
    };


    return (
        <div className="max-w-3xl mx-auto backdrop-blur-lg shadow-lg rounded-lg overflow-hidden">
            <div className="w-full flex justify-start items-center p-5 ">
                  <Avatar>
                    <AvatarImage src={data.userImageURL} alt={data.user} />
                    <AvatarFallback> <User/> </AvatarFallback>
                </Avatar>
                <p className="text-xl md:text-2xl font-semibold text-neutral-800 dark:text-white"
                >
                  {data.title}
                </p>
              </div>
        <div className="relative w-full aspect-video" >
            <img
            src={data.largeImageURL}
            alt={data.title}
            className="absolute object-contain top-0 left-0 w-full h-full"
            referrerPolicy="no-referrer"
            />
        </div>
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                
                <div className=" flex justify-center items-center gap-4 ">
                    <button onClick={handleToggleFavorite}>
                        {isFavorite ? <Heart fill="red" color="red" /> : <Heart color="red" /> }
                    </button>
                    <button onClick={handleDownload} className="flex justify-center items-center gap-2">
                        <Download/> 
                    </button>
                    <ShareButton url={data.pageURL} />
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
            {data.tags.map(tag => tag.trim()).map(tag => (
                <span
                key={tag}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm flex items-center"
                >
                <TagIcon className="w-4 h-4 mr-1" />
                {tag}
                </span>
            ))}
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-gray-600">
              <EyeIcon className="w-5 h-5 mr-1" />
              <span>{data.views}</span>
              </div>
              <div className="flex items-center text-gray-600">
              <DownloadIcon className="w-5 h-5 mr-1" />
              <span>{data.downloads}</span>
              </div>
          </div>
        </div>
        </div>
    );
  };
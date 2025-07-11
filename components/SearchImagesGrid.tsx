
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogDescription } from "@/components/ui/dialog"
import { Hit } from "@/app/api/image/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addToFavorites, removeFromFavorites } from "@/store/favoritesSlice";
import { Download, DownloadIcon, EyeIcon, Heart, TagIcon, User } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  


const convertToCustomFormat = (category: string, image: Hit) => {
    return {
      category,
      data: {
        category: category,
        title: `Image by ${image.user}`,
        tags: image.tags.split(', '), 
        src: image.webformatURL,
        largeImageURL: image.largeImageURL,
        views: image.views,
        downloads: image.downloads,
        user: image.user,
        userImageURL: image.userImageURL,
        pageURL: image.pageURL,
      },
    };
  };

export default function SearchImagesGrid({ images }: { images: Hit[] }) {
  const [selectedImage, setSelectedImage] = useState<Hit | null>(null)

  return (
    <div className="container mx-auto p-4  ">
      <div className="  w-full h-full place-content-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        { !!images && images.map((image) => (
          <div
            key={image.id}
            className="  cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.webformatURL}
              alt={image.user}
              className="rounded-lg object-contain w-full h-48 sm:h-64"
            />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {
            selectedImage && (
              <Content data={selectedImage!}/>
            )
          }
        </DialogContent>
      </Dialog>
    </div>
  )
}


const Content = ({data}: {data:Hit}) => {
    const dispatch = useAppDispatch();

    // Get the current list of favorite images from the store
    const favoriteImages = useAppSelector((state) => state.favoriteImages.images);
  
    // Check if the image is already in favorites
    const isFavorite = favoriteImages.some(fav => fav.src === data.webformatURL);
  
    const handleToggleFavorite = () => {
      if (isFavorite) {
        const imageIndex = favoriteImages.findIndex(fav => fav.src === data.webformatURL);
        dispatch(removeFromFavorites(imageIndex));
      } else {
         const updatedData = convertToCustomFormat(data.tags[0], data);
         console.log("updatedData",updatedData);
         dispatch(addToFavorites(updatedData.data));
      }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(data.largeImageURL, { mode: "cors" });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `image-${data.id}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch {
            alert("Failed to download image.");
        }
    };


    return (
        <div className="max-w-3xl mx-auto backdrop-blur-lg shadow-lg rounded-lg overflow-hidden">
            <div className="w-full flex justify-start items-center p-5 ">
                {/* <img
                  src={data.userImageURL}
                  alt={data.user}
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                  referrerPolicy="no-referrer"
                  /> */}

                <Avatar>
                    <AvatarImage src={data.userImageURL} alt={data.user} />
                    <AvatarFallback> <User/> </AvatarFallback>
                </Avatar>

                <p className="text-xl md:text-2xl font-semibold text-neutral-800 dark:text-white"
                >
                  {data.user}
                </p>
              </div>
        <div className="relative w-full aspect-video" >

            <img
            src={data.largeImageURL}
            alt={data.user}
            className="absolute object-contain top-0 left-0 w-full h-full"
            referrerPolicy="no-referrer"
            />
        </div>
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
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
                <div className=" flex justify-center items-center gap-4 ">
                    <button onClick={handleToggleFavorite}>
                        {isFavorite ? <Heart fill="red" color="red" /> : <Heart color="red" /> }
                    </button>
                    <button onClick={handleDownload} className="flex justify-center items-center gap-2">
                        <Download/> Download this image
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
            {data.tags.split(', ').map(tag => tag.trim()).map(tag => (
                <span
                key={tag}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm flex items-center"
                >
                <TagIcon className="w-4 h-4 mr-1" />
                {tag}
                </span>
            ))}
            </div>
        </div>
        </div>
    );
  };
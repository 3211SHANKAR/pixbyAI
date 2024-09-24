/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogDescription } from "@/components/ui/dialog"
import { Content } from "./CardsCarousel";
import { ImageItem } from "@/store/favoritesSlice";


export default function ImageGallery({ images }: { images: ImageItem[] }) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  return (
    <div className="container mx-auto p-4  ">
      <div className="  w-full h-full place-content-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        { !!images && images.map((image) => (
          <div
            key={image.title}
            className="  cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.src}
              alt={image.title}
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
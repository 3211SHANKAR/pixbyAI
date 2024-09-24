'use client'
import { useAppSelector } from '@/store/store' 
// import { Card } from '@/components/ui/apple-cards-carousel'
// import { Content } from '@/components/CardsCarousel'
import Navbar from '@/components/Navbar'
import ImageGallery from '@/components/ImageGallary'

export default function Page() {
  const favoriteImages = useAppSelector((state) => state.favoriteImages.images)

  return (
    <div className="container mx-auto px-4 py-8 -z-10 ">
      <Navbar />
      <h1 className="text-3xl font-semibold text-center my-8">Discover your Favorite Images here</h1>
      <div className="grid place-items-center p-4 w-full ">
        <ImageGallery images={favoriteImages} />
        {
            favoriteImages.length === 0 && (
                <p className="text-center col-span-full text-lg text-gray-500">No favorite images yet</p>
            )
        }
      </div>
    </div>
  )
}
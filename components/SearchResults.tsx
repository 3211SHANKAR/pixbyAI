"use client";
import React from 'react'
import { Hit } from '@/app/api/image/types';
import { useAppSelector } from '@/store/store';
import SearchImagesGrid from './SearchImagesGrid';



const SearchResults = ({images}:{images:Hit[]}) => {
    const { loading, error } = useAppSelector((state) => state.searchImages);

  return (
    <>
          <div className=' w-full h-full flex flex-col gap-4 items-start justify-normal '>
              <h2 className=" text-left w-full text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                  Your search results
              </h2>
              {
                loading ? <p>Loading...</p> : <SearchImagesGrid images={images} />
              }
              {
                error && <p>{error}</p>
              }
              
          </div>
    </>
  )
}

export default SearchResults

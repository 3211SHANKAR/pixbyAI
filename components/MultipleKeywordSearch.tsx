"use client"

import { useState, FormEvent, KeyboardEvent } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppDispatch } from "@/store/store" // Custom hooks from your setup
import { searchStart, searchSuccess, searchFailure } from '@/store/searchImagesSlice';

export default function MultipleKeywordSearch() {
  const [keywords, setKeywords] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const dispatch = useAppDispatch();
  // const { images, loading, error } = useAppSelector((state) => state.searchImages);

  const fetchImages = async (keywords: string[]) => {
    try {
      dispatch(searchStart());
      const response = await fetch(`/api/image?q=${keywords.join("+")}`)
      const data = await response.json()
      console.log("Images:", data)
      
      dispatch(searchSuccess(data.images));

      // setImages(data.images)
    } catch (error) {
      console.error("Failed to fetch images", error)
      dispatch(searchFailure('Failed to fetch images.'));
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addKeyword()
    const updatedKeywords = inputValue.trim() !== "" && !keywords.includes(inputValue.trim())
      ? [...keywords, inputValue.trim()]
      : keywords
    if (updatedKeywords.length > 0) {
      console.log("Search data:", updatedKeywords)
      fetchImages(updatedKeywords)
    }
    setInputValue("")
  }

  const addKeyword = () => {
    if (inputValue.trim() !== "" && !keywords.includes(inputValue.trim())) {
      setKeywords([...keywords, inputValue.trim()])
      setInputValue("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Tab") {
      e.preventDefault()
      addKeyword()
    } else if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(e)
    } else if (e.key === "Backspace" && inputValue === "") {
      setKeywords(keywords.slice(0, -1))
    }
  }

  return (
    <div className="w-full mx-auto my-5">
      <form onSubmit={handleSubmit} className="space-y-4 flex justify-normal items-center gap-4 ">
        <div className=" w-full flex flex-wrap items-center shadow gap-2 p-2 border border-slate-700 rounded-lg focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 backdrop-blur-lg ">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="flex items-center gap-1 px-2 py-1 text-sm bg-indigo-600 text-white rounded-full"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(keyword)}
                className="text-primary-foreground hover:text-primary-foreground/80"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search images using keywords..."
            className="flex-1 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-4 "
          />
          <Button type="submit" size={"icon"} variant={"ghost"} className="w-fit rounded-full hover:bg-indigo-100 h-fit p-2 mr-4 ">
          <Search size={24} className=" text-indigo-800 " />
        </Button>
        </div>
        
      </form>
      <div className="w-full flex justify-between items-center mt-4 ">
        <h1 className=" text-base font-medium ">
             <span className="text-indigo-600 px-1 border text-sm rounded border-gray-500 mx-1 bg-gray-100 "> Tab </span> or <span className="text-indigo-600 px-1 border text-sm rounded border-gray-500 mx-1 bg-gray-100 "> {","} </span>  to add keywords
        </h1>
        <h1 className=" text-base font-medium ">
            <span className="text-indigo-600 px-1 border text-sm rounded border-gray-500 mx-1 bg-gray-100 ">Enter</span> to search
        </h1>
      </div>
    </div>
  )
}
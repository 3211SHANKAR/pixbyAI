"use client";
import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import { downloadImage } from "@/lib/downloadImage";
import Link from "next/link";


function Page() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Enter your prompt"
  );
  useEffect(() => {
    const items = localStorage.getItem('img');
    if (items) {
      setResult(items);
      console.log("getitem", items);
    } else setResult("");
  }, []);
  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      console.log(data);
      setResult(data.imageUrl);
      setIsImage(true);
      localStorage.setItem('img', data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };
  const handleDownload = () => {
    downloadImage(result, 'pixai-image');
  }


  return (
    <div className="w-full min-h-screen text-white  flex flex-col justify-start items-center gap-10 p-10 ">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Navbar/>
      <div className="w-full h-full text-white grid md:grid-cols-2 place-items-center place-content-center gap-10 ">
        <div className=" w-full flex flex-col justify-center items-center md:items-baseline lg:p-20 gap-4" >
          <h2>Generate an Image using PixAi</h2>
          <textarea
            className="block p-2.5 w-full text-sm bg-gray-800 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            cols={4}
            value={prompt}
            required
            />
          <button onClick={generateImage} className=" border p-2 rounded-md border-yellow-400/80 " >Generate an Image</button>
        </div>
        <div className=" flex flex-col justify-center items-center gap-5 ">
              { !isImage && <ImageIcon />}
              {loading && (<>
              <h2>Generating Image...</h2>
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
              </>
            )
          }
            { isImage ? (
            <div className=" flex flex-col justify-center items-center gap-10 rounded-lg  ">
               <img loading="lazy" className="result-image shadow-lg shadow-cyan-200/10 rounded-lg" src={result} alt="result" />
              <button className="text-white p-2 hover:underline hover:underline-offset-4 hover:decoration-dashed" onClick={handleDownload} >
                  Download Image
              </button>
            </div>
          ):<></>}
        </div>
      </div>
      <span className=" w-full absolute bottom-0 left-0 text-center mx-auto my-10 p-2 text-sm font-semibold ">
        Developed by <Link href={'https://github.com/harsh3dev/pixai'} target="_blank" className="text-indigo-700 hover:underline hover:underline-offset-4 decoration-slice " >Harsh Pandey</Link>
      </span>
    </div>
  );
}

export default Page;
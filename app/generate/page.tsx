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
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] w-full bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-0 sm:p-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none z-0">
        <div className="absolute w-60 h-60 bg-indigo-400/20 rounded-full blur-3xl left-10 top-10 animate-pulse" />
        <div className="absolute w-40 h-40 bg-pink-400/20 rounded-full blur-2xl right-10 bottom-10 animate-pulse" />
      </div>
      <Navbar/>
      <div className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-4xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 gap-10 border border-indigo-100 dark:border-gray-800 backdrop-blur-md mt-8">
        <div className="flex-1 flex flex-col justify-center items-center md:items-start gap-6">
          <h2 className="text-4xl font-extrabold text-center md:text-left bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 drop-shadow">AI Image Generator</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2 text-center md:text-left">Describe your image and generate unique AI art instantly!</p>
          <textarea
            className="block p-2.5 w-full text-lg bg-background text-foreground rounded-lg border-2 border-indigo-300 dark:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            value={prompt}
            required
          />
          <button onClick={generateImage} className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-lg font-bold shadow hover:from-indigo-600 hover:to-pink-600 transition w-full md:w-auto" >Generate Image</button>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-5">
          { !isImage && !loading && <ImageIcon className="w-24 h-24 text-indigo-300 dark:text-indigo-500" />}
          {loading && (<>
            <h2 className="text-lg font-semibold">Generating Image...</h2>
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </>)}
          { isImage && (
            <div className="flex flex-col justify-center items-center gap-6 rounded-lg">
              <img loading="lazy" className="result-image shadow-lg shadow-cyan-200/10 rounded-lg max-w-xs max-h-80 object-contain bg-white dark:bg-gray-900 border-2 border-indigo-200 dark:border-indigo-700" src={result} alt="result" />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition text-center cursor-pointer" onClick={handleDownload} >
                Download Image
              </button>
            </div>
          )}
        </div>
      </div>
      <span className="w-full text-center mx-auto my-10 p-2 text-sm font-semibold relative z-10">
        Developed by <Link href={'https://github.com/harsh3dev/pixai'} target="_blank" className="text-indigo-700 hover:underline hover:underline-offset-4 decoration-slice " >Harsh Pandey X Gourishankar</Link>
      </span>
    </section>
  );
}

export default Page;
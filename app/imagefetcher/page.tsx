"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

export default function ImageFetcherPage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    setImages([]);
    try {
      const res = await fetch('/api/imagefetcher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });
      const data = await res.json();
      if (Array.isArray(data.images) && data.images.length > 0) {
        setImages(data.images);
      } else if (data.error) {
        alert('Error: ' + data.error);
      } else {
        alert('No image generated.');
      }
    } catch (err) {
      alert('Failed to generate image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] w-full bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-0 sm:p-8 overflow-hidden">
      <Navbar sectionIcon={<ImageIcon className="w-8 h-8 text-indigo-500" />} />
      <div className="relative z-10 h-100 flex flex-col items-center w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 gap-8 border border-indigo-100 dark:border-gray-800 backdrop-blur-md mt-8">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 drop-shadow flex items-center gap-2">
          <ImageIcon className="w-8 h-8 text-indigo-500" />
          Image Fetcher
        </h2>
        <div className="flex w-full gap-4">
          <input
            className="flex-1 p-2 bg-black rounded-lg border-2 border-indigo-300 dark:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            placeholder="Search for images..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            onClick={fetchImages}
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-lg font-bold shadow hover:from-indigo-600 hover:to-pink-600 transition"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Images"}
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mt-6">
          {images.map((img, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <img
                src={img}
                alt={`Fetched ${idx}`}
                className="rounded-lg shadow border border-indigo-200 dark:border-indigo-700 object-cover w-full h-40"
              />
              <button
                onClick={async () => {
                  try {
                    const response = await fetch(img, { mode: "cors" });
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `pixai-image-${idx}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  } catch (e) {
                    alert("Failed to download image.");
                  }
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs font-semibold shadow"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

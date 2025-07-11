"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function AvatarGenerator() {
  const [prompt, setPrompt] = React.useState("");
  const [image, setImage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // 3D cartoon avatar generation using DiceBear 'adventurer' style with prompt as seed
  const generateAvatar = async () => {
    setLoading(true);
    setImage(null);
    setTimeout(() => {
      setImage(
        `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
          prompt || "PixAI"
        )}`
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <section className="relative flex h-screen flex-col items-center justify-center min-h-[70vh] w-full bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-0 sm:p-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none z-0">
        <div className="absolute w-60 h-60 bg-indigo-400/20 rounded-full blur-3xl left-10 top-10 animate-pulse" />
        <div className="absolute w-40 h-40 bg-pink-400/20 rounded-full blur-2xl right-10 bottom-10 animate-pulse" />
      </div>
      {/* Fixed Navbar at top */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 20,
        }}
      >
        <Navbar />
      </div>
      <div className="relative z-10 flex flex-col items-center  w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 gap-6 border border-indigo-100 dark:border-gray-800 backdrop-blur-md mt-8">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 drop-shadow">
          AI funny Avatar Generator
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-2">
          Describe your dream avatar and generate a unique funny Avatar
          instantly!
        </p>
        <div className="flex w-full gap-2">
          <input
            className="flex-1 border-2 border-indigo-300 dark:border-indigo-700 rounded-lg px-4 py-2 text-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Describe your Avatar (e.g. futuristic robot, 3D cat)"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateAvatar()}
          />
          <button
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-lg font-bold shadow hover:from-indigo-600 hover:to-pink-600 transition"
            onClick={generateAvatar}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
        {image && (
          <div className="mt-6 flex flex-col items-center">
            <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center shadow-lg border-4 border-indigo-200 dark:border-indigo-700">
              {image && (
                <Image
                  src={image}
                  alt="Preview"
                  width={200}
                  height={200}
                  unoptimized // <- only if image is SVG or external and cannot be optimized
                />
              )}
            </div>
            <button
              className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition text-center cursor-pointer"
              onClick={async () => {
                // Convert SVG to JPG and trigger download
                const response = await fetch(image);
                const svgText = await response.text();
                const svg = new Blob([svgText], { type: "image/svg+xml" });
                const url = URL.createObjectURL(svg);
                const img = new window.Image();
                img.crossOrigin = "anonymous";
                img.onload = function () {
                  const canvas = document.createElement("canvas");
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob(
                      (blob) => {
                        if (blob) {
                          const jpgUrl = URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = jpgUrl;
                          link.download = "avatar.jpg";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          URL.revokeObjectURL(jpgUrl);
                        }
                      },
                      "image/jpeg",
                      0.95
                    );
                  }
                  URL.revokeObjectURL(url);
                };
                img.src = url;
              }}
            >
              Download Avatar (JPG)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

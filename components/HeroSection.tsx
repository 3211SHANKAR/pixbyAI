"use client";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center justify-center min-h-[40vh] py-12 overflow-hidden">
      <div
        ref={parallaxRef}
        className="transition-transform duration-300 ease-out"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold text-center mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Welcome to PixAI
        </h1>
        <p className="text-lg sm:text-2xl text-center font-medium text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
          Explore, generate, and share AI-powered images and avatars. Experience creativity with every scroll.
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none">
        {/* Subtle animated background shapes */}
        <div className="absolute w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl left-10 top-10 animate-pulse" />
        <div className="absolute w-32 h-32 bg-pink-400/20 rounded-full blur-2xl right-10 bottom-10 animate-pulse" />
      </div>
    </section>
  );
}

import HomeImages from "@/components/HomeImages";
import MultipleKeywordSearch from "@/components/MultipleKeywordSearch";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";


export default function Home() {
  return (
    <main className="w-full min-h-screen p-5 md:p-10 flex flex-col items-center justify-start gap-6 relative bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background dark:bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <Navbar/>
      <HeroSection />
      <div className="w-full flex flex-col justify-normal gap-4 p-4">
        <MultipleKeywordSearch/>
        <HomeImages/>
      </div>
      <span className=" w-full absolute bottom-0 left-0 text-center mx-auto my-10 p-2 text-sm font-semibold ">
        Developed by <Link href={'https://github.com/harsh3dev/pixai'} target="_blank" className="text-indigo-700 hover:underline hover:underline-offset-4 decoration-slice " >Harsh Pandey X Gourishankar</Link>
      </span>
    </main>
  );
}

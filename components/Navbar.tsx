import { Heart } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = ({ sectionIcon }: { sectionIcon?: React.ReactNode }) => {
  return (
    <header className="w-full min-h-10 p-4 rounded-lg border shadow grid place-items-center backdrop-blur-lg ">
      <div className=" w-full h-full flex justify-between items-center gap-4 ">
        <div className="flex items-center gap-2">
          {sectionIcon}
          <Link href={"/"} className=" text-2xl sm:text-4xl font-extrabold text-center text-indigo-500 ">
            PixAI
          </Link>
        </div>
        <div className=" flex justify-between items-center gap-4 sm:gap-8 ">
          <DarkModeToggle />
          <Link href={"/avatar"} className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg px-3 py-2 font-bold shadow hover:from-indigo-600 hover:to-pink-600 transition">
            🧑‍🎨 Avatar
          </Link>
          
          <Link href={"/favorites"} className=" hover:bg-slate-200 text-indigo-500  transition-all ease-linear p-2 rounded-full ">
            <Heart size={28} />
          </Link>
          <Link href={"/generate"} className="bg-indigo-500 text-white rounded-lg px-3 py-3 hover:shadow-md hover:bg-indigo-600 transition-all ease-linear font-bold">
            ✨ Imagine with PixAI
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar

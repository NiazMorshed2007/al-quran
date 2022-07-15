import React from "react";
import Logo from "./logo";
import { BsSearch } from "react-icons/bs";

const Banner = () => {
  return (
    <div className="relative flex flex-col items-center overflow-hidden justify-center">
      <img
        className="absolute w-full h-full -z-10 top-0 left-0"
        src="https://quran.com/images/background.jpg"
        alt=""
      />
      <Logo />
      <div className="search-bar cursor-pointer mb-20 flex items-center justify-between p-5 rounded-3xl w-11/12 md:w-6/12 bg-white">
        <div className="flex items-center gap-4">
          <BsSearch className="text-lg text-primary" />
          <p className="text-slate-500">What do you want to read?</p>
        </div>
        <kbd className="p-1 border px-2 text-xs rounded-md text-gray-500">
          Ctrl + k
        </kbd>
      </div>
      {/* <img
        className="w-full object-cover"
        src="https://img.freepik.com/free-photo/moon-light-shine-through-window-into-islamic-mosque-interior_1217-2597.jpg?size=626&ext=jpg"
        alt=""
      /> */}
    </div>
  );
};

export default Banner;

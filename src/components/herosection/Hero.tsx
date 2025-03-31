import React from "react";
import Header from "../header/Header";
import Post from "../post/Post";

const Hero = () => {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="relative z-20 w-full">
        <Header />
        <Post />
      </div>
    </div>
  );
};

export default Hero;

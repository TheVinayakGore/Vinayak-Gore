"use client";
import React from "react";
import Link from "next/link";
import { SparklesCore } from "./ui/sparkles";
import { MdChevronRight } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { Highlight } from "./ui/hero-highlight";

const Hero = () => {
  const headline = `Visions Of Vinu`;

  const words = [
    {
      text: "Portfolio",
    },
    {
      text: "Development",
    },
    {
      text: "Projects",
    },
    {
      text: "Create",
    },
    {
      text: "Blogs",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-20 m-auto h-full w-full">
        <div className="flex flex-col items-center justify-center overflow-hidden rounded-md w-full h-full">
          <div className="flex flex-col items-center justify-center">
            <TextGenerateEffect headline={headline} />
            <Highlight className="flex items-center justify-center m-auto px-16 pb-2">
              <p className="text-center tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                <span className="text-2xl mx-2">⌲</span>
                <span className="text-sm">Design.Implement.Inspire</span>
              </p>
            </Highlight>
          </div>

          <div className="w-[40rem] h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-5 w-full h-full">
          <TypewriterEffect words={words} className="text-center mx-2" />

          <div className="m-40 flex justify-center text-center text-sm text-zinc-400 font-semibold space-x-3">
            <Link href="#start">
              <button className="animate-shimmer transition-colors bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border border-zinc-800 hover:border-zinc-600 hover:text-zinc-100 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-md px-10 h-12 font-semibold inline-block">
                <div className="flex items-center space-x-3">
                  <span>Get Started</span>
                  <MdChevronRight />
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-orange-400/90 to-orange-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </Link>

            <Link href="#auther">
              <button className="animate-shimmer transition-colors bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border border-zinc-800 hover:border-zinc-600 hover:text-zinc-100 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-md px-10 h-12 inline-block">
                <div className="flex items-center space-x-3">
                  <span>Auther</span>
                  <PiStudent />
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

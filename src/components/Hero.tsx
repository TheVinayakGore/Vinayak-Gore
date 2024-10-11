"use client";
import React from "react";
import Link from "next/link";
import { SparklesCore } from "./ui/sparkles";
import { MdChevronRight } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { Highlight } from "./ui/hero-highlight";
import Image from "next/image";

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
      <main className="flex flex-col items-center justify-center m-auto h-full w-full">
        <div className="flex flex-col items-center justify-center overflow-hidden rounded-md w-full h-full">
          <div className="flex flex-col items-center justify-center">
            <TextGenerateEffect
              headline={headline}
            />
            <Image
              src="/vinu.png"
              alt="card"
              width={1000}
              height={1000}
              priority
              className="block md:hidden rounded-xl border-[1px] border-yellow-400 shadow-xl shadow-yellow-500/[0.3] mb-5 w-auto h-auto"
            />
            <Highlight className="flex items-center justify-center mx-auto text-xs sm:text-base md:text-lg px-6 sm:px-10 md:px-16 pb-2">
              <p className="text-center tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                <span className="text-xl sm:text-2xl mx-2">⌲</span>
                <span className="text-xs sm:text-sm">
                  Design.Implement.Inspire
                </span>
              </p>
            </Highlight>
          </div>

          <div className="max-w-0 md:max-w-[40rem] w-full h-auto md:h-60 relative mx-auto py-10">
            <div className="absolute inset-x-4 sm:inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] sm:h-[3px] lg:h-[4px] w-3/4 blur-sm" />
            <div className="absolute inset-x-4 sm:inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px sm:h-[1px] w-3/4" />
            <div className="absolute inset-x-4 sm:inset-x-24 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] sm:h-[6px] lg:h-[7px] w-1/4 blur-sm" />
            <div className="absolute inset-x-4 sm:inset-x-24 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px sm:h-[1px] lg:h-[2px] w-1/4" />
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="absolute inset-0 w-full h-full"
              particleColor="#FFFFFF"
            />
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-5 w-full h-full px-4 md:px-10 lg:px-20">
          <TypewriterEffect words={words} className="text-center mx-2" />

          <div className="flex flex-col sm:flex-row justify-center text-center text-sm text-zinc-400 font-semibold space-y-4 sm:space-y-0 sm:space-x-3">
            <Link href="#start" className="w-full sm:w-auto">
              <button className="animate-shimmer transition-colors bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border border-zinc-800 hover:border-zinc-600 hover:text-zinc-100 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-md px-8 py-3 h-12 font-semibold inline-block w-full">
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                  <span>Get Started</span>
                  <MdChevronRight />
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-orange-400/90 to-orange-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </Link>

            <Link href="#auther" className="w-full sm:w-auto">
              <button className="animate-shimmer transition-colors bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border border-zinc-800 hover:border-zinc-600 hover:text-zinc-100 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-md px-8 py-3 h-12 font-semibold inline-block w-full">
                <div className="flex items-center justify-center space-x-2">
                  <span>Auther</span>
                  <PiStudent />
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Hero;

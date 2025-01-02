"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Workflow from "@/components/Workflow";
import Gallery from "@/components/Gallery";
import Auther from "@/components/Auther";
import Freelance from "@/components/Freelance";
import SocialMedia from "@/components/SocialMedia";
import TechStacks from "@/components/TechStacks";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoadingBar from "@/components/LoadingBar";

const Page: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSunIcon, setIsSunIcon] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      document.body.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    setIsSunIcon((prevState) => !prevState);
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingBar loading={loading} />
      <div className="absolute top-0 z-[-20] h-screen w-screen bg-white dark:bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(135,206,250,0.5),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(150,150,150,0.3),rgba(0,0,0,0))]"></div>
      <main className="relative antialiased">
        <div className="flex flex-col gap-y-32 pt-28 pb-28">
          <Navbar toggleTheme={toggleTheme} isSunIcon={isSunIcon} />
          {loading && <LoadingSpinner />}
          <div className="flex flex-col gap-y-32">
            <div className="flex flex-col w-full h-full">
              <Hero isDarkMode={isDarkMode} />
            </div>
            <div className="h-[15rem] md:h-[25rem] lg:h-[30rem] flex items-center justify-center text-center">
              <TextHoverEffect
                text="GORE"
                className="text-[0] sm:text-2xl md:text-5xl lg:text-[6.5rem]"
              />
            </div>
            <div className="flex flex-col space-y-48 w-full h-full">
              <Workflow />
              <TechStacks />
            </div>
            <div className="flex-col space-y-32">
              <div className="mt-3">
                <Gallery />
              </div>
              <div className="pt-5 pb-10 border-t border-b border-zinc-300 dark:border-zinc-800">
                <Auther isDarkMode={isDarkMode} />
              </div>
            </div>
            <div className="flex flex-col space-y-40 w-full h-full">
              <Freelance />
              <SocialMedia isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;

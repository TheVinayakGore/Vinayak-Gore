"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Tabs } from "@/components/ui/tabs";
import Tutorials from "./Tutorials";
// import Playlists from "./Playlists";
import CheatSheets from "./CheatSheets";
import Posters from "./Posters";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoadingBar from "@/components/LoadingBar";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Navbar from "@/components/Navbar";

const Create: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSunIcon, setIsSunIcon] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      setIsSunIcon(storedTheme !== "dark");
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
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    {
      title: "Tutorials",
      value: "Tutorials",
      description:
        "Explore step-by-step guide to web UI templates build with various skills & techs.",
      content: (
        <div className="w-full relative h-full rounded-xl dark:text-white bg-gradient-to-br from-white/[0.05] dark:from-white/[0.1] to-white/[0.05] dark:to-white/[0.1] backdrop-blur-2xl border border-zinc-200 dark:border-none shadow-xl z-30">
          <Suspense fallback={<LoadingSpinner />}>
            <Tutorials />
          </Suspense>
        </div>
      ),
    },
    // {
    //   title: "Playlists",
    //   value: "Playlists",
    //   description: "Created playlists of tutorials on my YouTube channel, watch & enjoy videos !",
    //   content: (
    //     <div className="w-full relative h-full rounded-xl dark:text-white bg-gradient-to-br from-white/[0.05] dark:from-white/[0.1] to-white/[0.05] dark:to-white/[0.1] backdrop-blur-2xl border border-zinc-200 dark:border-none shadow-xl z-30">
    //       <Suspense fallback={<LoadingSpinner />}>
    //         <Playlists />
    //       </Suspense>
    //     </div>
    //   ),
    // },
    {
      title: "Cheat Sheets",
      value: "Cheat Sheets",
      description:
        "Quick reference guides to help you solve problems and code efficiently.",
      content: (
        <div className="w-full relative h-full rounded-xl dark:text-white bg-gradient-to-br from-white/[0.05] dark:from-white/[0.1] to-white/[0.05] dark:to-white/[0.1] backdrop-blur-2xl border border-zinc-200 dark:border-none shadow-xl z-30">
          <Suspense fallback={<LoadingSpinner />}>
            <CheatSheets />
          </Suspense>
        </div>
      ),
    },
    {
      title: "Posters",
      value: "Posters",
      description:
        "Beautifully designed posters as my hobby and for entertenment purposes.",
      content: (
        <div className="w-full relative h-full rounded-xl dark:text-white bg-gradient-to-br from-white/[0.05] dark:from-white/[0.1] to-white/[0.05] dark:to-white/[0.1] backdrop-blur-2xl border border-zinc-200 dark:border-none shadow-xl z-30">
          <Suspense fallback={<LoadingSpinner />}>
            <Posters />
          </Suspense>
        </div>
      ),
    },
  ];

  return (
    <>
      <LoadingBar loading={loading} />
      {loading && <LoadingSpinner />}
      <Navbar toggleTheme={toggleTheme} isSunIcon={isSunIcon} />
      <main className="flex flex-col items-start py-40 w-full h-full">
        <div className="relative flex flex-col m-auto items-start justify-start w-full h-full">
          <div className="flex flex-col items-center m-auto leading-none w-full h-full">
            <TextHoverEffect
              text="CREATE"
              className="text-[0px] md:text-[5rem] z-10 leading-none"
            />
            <div className="w-screen sm:max-w-[90rem] px-10 -mt-48 z-40 h-full">
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Create;

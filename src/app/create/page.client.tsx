"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Tabs } from "@/components/ui/tabs";
import Tutorials from "./Tutorials";
import Playlists from "./Playlists";
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
      description: "A technology company that builds economic infrastructure",
      content: (
        <div className="w-full relative h-full rounded-xl text-white bg-gradient-to-br from-purple-700 to-pink-900 z-30">
          <Suspense fallback={<LoadingSpinner />}>
            <Tutorials />
          </Suspense>
        </div>
      ),
    },
    {
      title: "Playlists",
      value: "Playlists",
      description: "A streaming service that offers a wide variety of award",
      content: (
        <div className="w-full relative h-full rounded-xl text-white bg-gradient-to-br from-purple-700 to-pink-900 z-30">
          <Suspense fallback={<LoadingSpinner />}>
            <Playlists />
          </Suspense>
        </div>
      ),
    },
    {
      title: "Cheat Sheets",
      value: "Cheat Sheets",
      description: "A technology company that focuses on building products",
      content: (
        <div className="w-full relative h-full rounded-xl text-white bg-gradient-to-br from-purple-700 to-pink-900 z-30">
          <Suspense fallback={<LoadingSpinner />}>
            <CheatSheets />
          </Suspense>
        </div>
      ),
    },
    {
      title: "Posters",
      value: "Posters",
      description: "A multinational technology company focusing",
      content: (
        <div className="w-full relative h-full rounded-xl text-white bg-gradient-to-br from-purple-700 to-pink-900 z-30">
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
      <main className="flex flex-col items-start py-20 w-full h-full">
        <div className="relative flex flex-col m-auto items-start justify-start w-full h-full">
          <div className="flex flex-col items-center m-auto top-10 w-full h-full">
            <TextHoverEffect text="CREATE" className="text-[5rem] -mt-10 z-10" />
            <div className="px-14 -mt-56 z-40">
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Create;
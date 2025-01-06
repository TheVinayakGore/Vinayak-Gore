"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [visitorCount, setVisitorCount] = useState<number>(0);

  const colors = [
    "text-violet-500",
    "text-green-500",
    "text-blue-500",
    "text-purple-500",
    "text-orange-500",
    "text-red-500",
    "text-blue-500",
    "text-indigo-500",
  ];

  useEffect(() => {
    const storedCount = localStorage.getItem("visitorCount");

    if (storedCount) {
      const newCount = parseInt(storedCount) + 1;
      localStorage.setItem("visitorCount", newCount.toString());
      setVisitorCount(newCount);
    } else {
      localStorage.setItem("visitorCount", "1");
      setVisitorCount(1);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [colors.length]);

  return (
    <>
      <footer className="flex flex-col items-center p-4 md:p-10 space-y-10 md:space-y-28 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-300 dark:border-zinc-800 text-xs md:text-sm z-[100] w-full">
        <ul className="flex flex-col md:flex-row items-center md:items-start justify-between text-zinc-600 w-full space-y-4 md:space-y-0">
          <li className="flex-col space-y-3">
            <Link
              href="/"
              className="flex items-center justify-center space-x-5"
            >
              <Image
                src="/vinu.png"
                alt="logo"
                width={60}
                height={60}
                className="rounded-full hover:scale-125 transition duration-500 border-[0.17rem] border-pink-500 dark:border-zinc-200 w-16"
              />
              <span className="footerLogo text-2xl md:text-4xl font-bold text-zinc-800 dark:text-zinc-300">
                Vinayak Gore
              </span>
            </Link>
          </li>
          <li>
            <div className="flex flex-col items-center md:items-end text-zinc-500">
              <p className="text-xs md:text-sm">Copyright © 2024 vinayak-gore.vercel.app</p>
              <p className="font-light text-zinc-600 text-sm md:text-base">
                <span
                  className={`text-base md:text-lg font-medium transition-colors duration-[2000ms] ease-linear ${colors[colorIndex]}`}
                >
                  {visitorCount}
                </span>{" "}
                Visitors
              </p>
            </div>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
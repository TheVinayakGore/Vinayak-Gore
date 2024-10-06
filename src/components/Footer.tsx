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
    // Get the current visitor count from localStorage
    const storedCount = localStorage.getItem("visitorCount");

    // If visitor count exists, increment it, else set it to 1
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
      <footer className="flex flex-col items-center p-10 space-y-28 bg-zinc-950 border-t border-zinc-800 text-sm z-40 w-full">
        <ul className="flex items-start justify-between text-zinc-600 w-full">
          <li className="flex-col space-y-3">
            <Link
              href="/"
              className="flex items-center justify-center space-x-5"
            >
              <Image
                src="/logo.svg"
                className="rounded-full border-2"
                alt="logo"
                width={60}
                height={60}
              />
              <span className="footerLogo text-4xl font-bold text-zinc-300">
                Vinayak Gore
              </span>
            </Link>
          </li>
          <li>
            <div className="flex flex-col items-end text-zinc-500">
              <p className="text-sm">Copyright © 2024 VinayakGore.com</p>
              <p className="font-light text-zinc-600 text-base">
                <span
                  className={`text-lg font-medium transition-colors duration-[2000ms] ease-linear ${colors[colorIndex]}`}
                >
                  {visitorCount / 2}
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

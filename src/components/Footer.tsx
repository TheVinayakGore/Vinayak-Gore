"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import usePathname hook

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

  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    if (pathname === "/") {
      // Increment visitor count only for the home page
      const storedCount = localStorage.getItem("visitorCount");

      if (storedCount) {
        const newCount = parseInt(storedCount) + 1;
        localStorage.setItem("visitorCount", newCount.toString());
        setVisitorCount(newCount);
      } else {
        localStorage.setItem("visitorCount", "1");
        setVisitorCount(1);
      }
    }
  }, [pathname]); // Dependency array includes pathname

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
      <footer className="flex flex-col items-center p-3 md:p-5 md:px-10 space-y-10 md:space-y-28 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-300 dark:border-zinc-800 text-xs md:text-sm z-[100] w-full">
        <ul className="flex flex-col md:flex-row items-center justify-between text-zinc-600 w-full space-y-4 md:space-y-0">
          <li className="flex-col space-y-3">
            <Link
              href="/"
              className="flex items-center justify-center space-x-3"
            >
              <Image
                src="/vinu.png"
                alt="logo"
                width={60}
                height={60}
                className="rounded-full hover:scale-125 transition duration-500 border-2 border-orange-500 w-10"
              />
              <span className="footerLogo text-lg md:text-xl font-bold text-zinc-800 dark:text-zinc-300">
                Vinayak Gore
              </span>
            </Link>
          </li>
          <li>
            <div className="flex flex-col items-center md:items-end text-zinc-500">
              <p className="text-xs md:text-[0.9rem]">
                <span className="text-base">©</span> Vinayak Gore {new Date().getFullYear()}
              </p>
              <p
                className={`${pathname === "/" ? "block" : "hidden"} font-light text-zinc-600 text-xs md:text-sm`}
              >
                <span
                  className={`font-medium transition-colors duration-[2000ms] ease-linear ${colors[colorIndex]}`}
                >
                  {visitorCount}
                </span>{" "}
                Visits
              </p>
            </div>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;

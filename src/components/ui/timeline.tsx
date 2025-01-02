"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const updateHeight = () => {
        const calculatedHeight =
          ref.current?.getBoundingClientRect().height || 0;
        const manualHeight = 2050; // Example: Set your manual height here
        setHeight(Math.max(calculatedHeight, manualHeight)); // Use manual height if it's greater
      };
      updateHeight();
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0%", "end 100%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-5">
        <h2 className="text-lg sm:text-xl md:text-5xl mb-4 font-medium bg-clip-text text-transparent bg-gradient-to-b from-black to-zinc-400 dark:from-zinc-50 dark:to-zinc-700 h-14 max-w-4xl">
          Highlights
        </h2>
        <p className="text-neutral-700 dark:text-neutral-500 text-base md:text-lg max-w-lg">
          I&apos;ve been working/learning on Web Developement skills for the
          past 2 years. Here&apos;s a timeline of my journey.
        </p>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="text-xl md:pl-20 md:text-5xl font-bold bg-gradient-to-b from-black to-zinc-400 dark:from-zinc-300 dark:to-zinc-600 bg-clip-text tracking-tight text-transparent py-5">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="text-2xl mb-4 text-left font-bold bg-gradient-to-b from-black to-zinc-400 dark:from-zinc-300 dark:to-zinc-600 bg-clip-text tracking-tight text-transparent py-5">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

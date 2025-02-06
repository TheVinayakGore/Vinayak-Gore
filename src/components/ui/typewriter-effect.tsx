"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) =>
        prevIndex === words.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div
      className={cn(
        "text-sm sm:text-sm md:text-lg lg:text-xl",
        className
      )}
    >
      <div className="inline-block overflow-hidden text-zinc-300 dark:text-zinc-600 font-light w-40">
        <div className="flex items-center">
          <span>{"{"}</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWordIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative w-full"
            >
              <span className="block text-center text-pink-500 dark:text-yellow-400">
                {words[currentWordIndex].text}
              </span>
            </motion.div>
          </AnimatePresence>
          <span>{"}"}</span>
        </div>
      </div>
    </div>
  );
};

"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  headline,
  className,
  filter = true,
  duration = 2,
}: {
  headline: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const headlineArray = headline.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration || 2,
        delay: stagger(0.2),
      }
    );
  }, [animate, filter, duration]);

  const renderheadline = () => {
    return (
      <motion.div ref={scope}>
        {headlineArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="text-[0px] md:text-7xl lg:text-8xl xl:text-[9rem] 2xl:text-[10.3rem] bg-clip-text text-transparent bg-gradient-to-b from-black to-zinc-600 dark:from-white dark:to-black font-extrabold text-center relative z-20 h-auto opacity-0 w-full"
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div>{renderheadline()}</div>
      </div>
    </div>
  );
};

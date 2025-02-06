"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="flex items-center cursor-pointer text-black dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-600"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && children && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 pt-1 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl"
              >
                <motion.div
                  layout
                  className="p-4 w-max h-full"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border bg-white/[0.7] backdrop-blur-[2px] dark:bg-black/[0.85] border-zinc-400 dark:border-zinc-800 shadow-lg flex items-center justify-center m-auto space-x-4 p-2 w-full"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  priority = false,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  target: string;
  priority?: boolean;
}) => {
  return (
    <Link href={href} target="_blank" className="flex space-x-4 items-start justify-center m-auto group hover:bg-gradient-to-r from-rose-300 to-pink-500 dark:from-blue-700 dark:to-pink-600 hover:text-white text-black dark:text-white rounded-lg p-2 overflow-auto w-full h-full">
      <div className="relative max-w-48 lg:max-w-60 h-28 md:h-28">
        <Image
          src={src}
          alt={title}
          width={500} 
          height={500} 
          className="rounded-md dark:shadow-xl group-hover:shadow-zinc-950/[0.4] border border-zinc-200 w-full h-full"
          priority={priority}
        />
      </div>
      <div className="text-sm lg:text-base w-1/2">
        <h4 className="text-base font-bold mb-1 w-full">
          {title}
        </h4>
        <p className="text-xs lg:text-sm">
          {description}...
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-black dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-600 w-full h-full"
    >
      {children}
    </Link>
  );
};

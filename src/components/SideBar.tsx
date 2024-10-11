"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { RiArrowRightSLine } from "react-icons/ri";
import { BsMoonStars } from "react-icons/bs";
import { HiOutlineSun } from "react-icons/hi2";

interface SideBarProps {
  isSidebarOpen: boolean;
  handleBackdropClick: (event: React.MouseEvent) => void;
  closeSidebar: () => void;
  toggleTheme: () => void; // Added toggleTheme as a prop
  isSunIcon: boolean;
}

const arrowIcon = (
  <RiArrowRightSLine className="text-xl opacity-0 group-hover:opacity-100" />
);

const SideBar: React.FC<SideBarProps> = ({
  isSidebarOpen,
  handleBackdropClick,
  closeSidebar,
  toggleTheme,
  isSunIcon,
}) => {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed block sm:hidden inset-0 bg-black/[0.6] backdrop-blur-sm z-[100]"
          onClick={handleBackdropClick}
        >
          <div className="absolute right-0 p-5 w-full h-full shadow-md sidebar-content">
            <div className="flex items-center justify-between p-2 mx-3 bg-transparent/[0.05] dark:bg-transparent/[0.3] border border-white dark:border-zinc-700 rounded-full w-full">
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={40}
                  height={40}
                  className="rounded-full border border-white"
                  priority
                />
                <p className="text-2xl text-white">Vinu Gore</p>
              </Link>
              <div className="flex items-center space-x-1">
                <button
                  className="text-2xl p-2 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  onClick={toggleTheme}
                >
                  {isSunIcon ? <HiOutlineSun /> : <BsMoonStars />}
                </button>
                <button
                  className="text-2xl p-2 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  onClick={closeSidebar}
                  aria-label="Close sidebar"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-y-5 mt-10">
              <div className="flex flex-col items-start gap-y-1 px-5 text-zinc-300 dark:text-zinc-500">
                <h1 className="text-xl text-white font-medium mb-1">
                  ✦ Author
                </h1>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Who am I ?</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Tech Stacks</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Freelance</p>
                </Link>
              </div>
              <div className="flex flex-col items-start gap-y-1 px-5 text-zinc-300 dark:text-zinc-500">
                <h1 className="text-xl text-white font-medium mb-1">
                  ✦ Contact
                </h1>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Email</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Social Handles</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Feedback Form</p>
                </Link>
              </div>
              <div className="flex flex-col items-start gap-y-1 px-5 text-zinc-300 dark:text-zinc-500">
                <h1 className="text-xl text-white font-medium mb-1">✦ Blogs</h1>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Programming</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Web Dev</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">App Dev</p>
                </Link>
              </div>
              <div className="flex flex-col items-start gap-y-1 px-5 text-zinc-300 dark:text-zinc-500">
                <h1 className="text-xl text-white font-medium mb-1">
                  ✦ Projects
                </h1>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Stock Manager</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Mega Mall</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Voice AI</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Venz Park</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Gore Blogs</p>
                </Link>
              </div>
              <div className="flex flex-col items-start gap-y-1 px-5 text-zinc-300 dark:text-zinc-500">
                <h1 className="text-xl text-white font-medium mb-1">
                  ✦ Create
                </h1>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Tutorials</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Playlists</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Figma</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Cheat Sheets</p>
                </Link>
                <Link
                  href="/"
                  className="flex items-center group hover:text-teal-400"
                >
                  {arrowIcon}
                  <p className="whitespace-nowrap">Posters</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;

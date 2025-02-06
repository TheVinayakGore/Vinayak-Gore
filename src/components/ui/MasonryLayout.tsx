"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "../../sanity/lib/image";
import Link from "next/link";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdOutlineDownloading } from "react-icons/md";
import { BiRightArrowCircle } from "react-icons/bi";
import { PiGithubLogo } from "react-icons/pi";
import { RxDoubleArrowRight } from "react-icons/rx";

interface Tutorial {
  _id: string;
  tutfilter: string;
  tuttitle: string;
  tutcategory: string;
  tutstack: string[];
  tutshortdesc: string;
  tutimage?: {
    asset: {
      _ref: string;
    };
    caption?: string;
  };
  tutdownload: boolean;
  tutorialGitUrl: string;
  tutorialYTUrl: string;
  tutlink: string;
}

const MasonryLayout = ({ tutorialData }: { tutorialData: Tutorial[] }) => {
  return (
    <div className="masonry-grid gap-6 w-full mx-auto p-4">
      {tutorialData.map((item, index) => (
        <motion.div
          key={index}
          className="masonry-item w-[25.5rem] bg-blue-100 rounded-lg shadow-lg relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-full">
            <Image
              src={
                item.tutimage
                  ? urlFor(item.tutimage.asset).url()
                  : "/defaultImage.png"
              }
              height={1000}
              width={1000}
              className="w-full h-auto rounded-t-lg"
              alt={item.tuttitle || "tutorial image"}
            />
          </div>
          <div className="p-5">
            <div className="flex flex-wrap items-center mb-3">
              {item.tutstack?.map((stack, index) => (
                <span
                  key={index}
                  className="p-1 px-2 mr-1 leading-4 border border-pink-500 rounded text-xs mb-1 font-light text-pink-500"
                >
                  {stack}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold text-black">{item.tuttitle}</h3>
            <p className="text-sm mt-2 text-zinc-800 font-light">
              {item.tutshortdesc}
            </p>
            <div className="flex flex-col items-center justify-between space-y-2 m-auto pt-4 w-full">
              <div className="w-full">
                <div className="flex items-center justify-between text-sm w-full">
                  <Link
                    href={item.tutorialGitUrl}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center px-2 py-1 rounded-full bg-transparent text-zinc-800 border border-zinc-800 hover:border-white hover:bg-gradient-to-r from-violet-500 to-pink-500 hover:text-white hover:shadow-md transition duration-200"
                  >
                    <PiGithubLogo className="w-5 h-5" />
                    <span className="relative text-base z-20 mx-3">GitHub</span>
                    <RxDoubleArrowRight className="w-6 h-6" />
                  </Link>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between text-sm w-full">
                  <Link
                    href={item.tutorialYTUrl}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center px-1 pl-3 py-1 rounded-full bg-transparent text-zinc-800 border border-zinc-800 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-md transition duration-200"
                  >
                    <span className="relative z-20">YouTube</span>
                    <IoPlayCircleOutline className="ml-3 w-6 h-6" />
                  </Link>
                  <button className="flex items-center px-1 pl-3 py-1 rounded-full bg-transparent text-zinc-800 border border-zinc-800 hover:border-green-500 hover:bg-green-500 hover:text-white hover:shadow-md transition duration-200">
                    <span className="relative z-20">Download</span>
                    <MdOutlineDownloading className="ml-3 w-6 h-6" />
                  </button>
                  <Link
                    href={`/create/${item._id}`}
                    target="_blank"
                    className="flex items-center px-1 pl-3 py-1 rounded-full bg-transparent text-zinc-800 border border-zinc-800 hover:border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-md transition duration-200"
                  >
                    <span className="relative z-20">Read More</span>
                    <BiRightArrowCircle className="ml-3 w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MasonryLayout;

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import Image from "next/image";
import { ImYoutube } from "react-icons/im";
import { TfiUser } from "react-icons/tfi";
import { RxDownload } from "react-icons/rx";
import Comments from "./Comments";
import Link from "next/link";
import Tooltip from "./Tooltip";

const Auther = () => {
  return (
    <>
      <div id="auther" className="flex flex-col w-full">
        <div>
          <LampContainer>
            <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              className="mt-8 bg-gradient-to-br from-zinc-100 to-zinc-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
            >
              Namaste <br /> I am Vinayak Gore
            </motion.h1>
          </LampContainer>
        </div>

        <div className="flex flex-col items-center space-y-5 -mt-64 mb-10 w-full">
          <div className="flex flex-col items-center space-y-5 z-10 w-full">
            <Image
              src="/vinu.png"
              className="rounded-lg"
              alt="me"
              width="300"
              height="300"
            ></Image>
            <p className="text-base font-normal text-zinc-400 tracking-wider">
              Web Development | Frontend UI Design
            </p>
            <Image
              src="/sign2.png"
              className="w-52"
              alt="sign"
              width="200"
              height="50"
            ></Image>
          </div>

          <div className="flex items-center justify-center space-x-2 h-20">
            {/* YouTube Button */}
            <Link
              href="http://www.youtube.com/@vinayakgore7715"
              target="_blank"
              className="flex items-center space-x-5 py-3 px-5 bg-white hover:bg-red-500 hover:text-white text-zinc-800 text-base font-medium rounded-lg"
            >
              <span>Visit YouTube Channel</span>
              <span>
                <ImYoutube className="w-7 h-7" />
              </span>
            </Link>

            {/* LinkedIn Button */}
            <Link
              href="https://www.linkedin.com/in/vinayak-gore-b85b7922a/"
              target="_blank"
              className="flex items-center space-x-5 py-3 px-5 animate-shimmer transition-colors bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border border-white/[0.2] hover:border-zinc-500 text-zinc-300 hover:bg-blue-500 hover:text-white text-base font-medium rounded-lg"
            >
              <span>LinkedIn</span>
              <span>
                <TfiUser />
              </span>
            </Link>

            {/* Download Button with Tooltip */}
            <Tooltip
              text="Download Resume"
              className="-left-10 mb-2 bottom-full w-max h-max"
            >
              <button className="flex items-center py-3 px-4 border border-zinc-800 hover:border-zinc-500 hover:text-zinc-100 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-md">
                <RxDownload className="w-5 h-5" />
                <span className="absolute -bottom-0 left-[0.7rem] h-px w-[calc(100%-1.3rem)] bg-gradient-to-r from-emerald-400/0 via-green-500 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </Tooltip>
          </div>
        </div>
        <Comments />
      </div>
    </>
  );
};

export default Auther;

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

interface AuthorProps {
  isDarkMode: boolean;
}

const Auther: React.FC<AuthorProps> = ({ isDarkMode }) => {
  return (
    <>
      <main id="auther" className="flex flex-col items-center w-full">
        <LampContainer className="lamp-container">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="mt-8 bg-gradient-to-b from-black to-zinc-700 dark:from-zinc-100 dark:to-zinc-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Namaste <br /> I am Vinayak Gore
          </motion.h1>
        </LampContainer>

        <h1 className="block lg:hidden bg-gradient-to-b from-black to-zinc-700 dark:from-zinc-100 dark:to-zinc-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Namaste <br /> I am Vinayak Gore
        </h1>

        <div className="flex flex-col items-center space-y-5 mt-5 lg:-mt-64 mb-10 w-full px-4 sm:px-8">
          <div className="flex flex-col items-center space-y-5 z-10 w-full">
            <Image
              src="/vinu.png"
              alt="me"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <p className="text-sm font-mono font-normal text-black dark:text-zinc-400 tracking-wider text-center">
              MERN STACK | NEXT.JS | REACT.JS
            </p>
            <Image
              src={isDarkMode ? "/sign2.png" : "/sign1.png"}
              alt="sign"
              width={200}
              height={50}
              className="w-52"
            />
          </div>

          <div className="text-center p-3 text-xs sm:text-sm md:text-base max-w-4xl">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              incidunt quia consectetur quis, in fugiat temporibus cum beatae
              ducimus accusantium officiis commodi enim recusandae impedit
              perspiciatis voluptatem obcaecati non expedita possimus cupiditate
              delectus? Ad laudantium excepturi repellat ipsum corporis animi
              enim distinctio officia asperiores praesentium, adipisci labore
              eveniet blanditiis cupiditate architecto molestias, recusandae
              saepe quaerat harum voluptates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-2 h-full sm:h-20">
            {/* YouTube Button */}
            <Link
              href="http://www.youtube.com/@vinayakgore7715"
              target="_blank"
              className="flex items-center space-x-5 px-4 bg-black dark:bg-white hover:bg-red-500 dark:hover:bg-red-500 hover:text-white dark:hover:text-white text-white dark:text-zinc-800 text-base font-medium rounded-lg h-12"
            >
              <span>YouTube</span>
              <span>
                <ImYoutube className="w-7 h-7" />
              </span>
            </Link>

            {/* LinkedIn Button */}
            <Link
              href="https://www.linkedin.com/in/vinayak-gore-b85b7922a/"
              target="_blank"
              className="flex items-center space-x-5 my-2 sm:my-0 px-5 animate-shimmer transition-colors bg-[linear-gradient(110deg,#fbfbfd,45%,#efefef,55%,#fbfbfd)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border border-zinc-300 dark:border-zinc-800 hover:border-zinc-700 dark:hover:border-zinc-500 text-zinc-500 dark:text-zinc-300 hover:bg-blue-500 hover:text-black dark:hover:text-white text-base font-medium rounded-lg h-12"
            >
              <span>LinkedIn</span>
              <span>
                <TfiUser />
              </span>
            </Link>

            {/* Download Button with Tooltip */}
            <Tooltip
              text="Download Resume"
              className="mb-2 bottom-full w-full h-max"
            >
              <a
                href="https://raw.githubusercontent.com/TheVinayakGore/Resume/main/Resume.pdf"
                download="Resume.pdf"
                className="flex items-center px-5 border border-zinc-300 dark:border-zinc-800 hover:border-black dark:hover:border-zinc-500 text-zinc-400 hover:text-black dark:hover:text-white no-underline group cursor-pointer relative rounded-md h-12"
              >
                <p className="mr-5">Resume</p>
                <RxDownload className="w-5 h-5" />
                <span className="absolute -bottom-0 left-[0.7rem] h-[1px] dark:h-px w-[calc(100%-1.3rem)] bg-gradient-to-r from-emerald-400/0 via-green-500 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </a>
            </Tooltip>
          </div>
        </div>
        <Comments />
      </main>
    </>
  );
};

export default Auther;

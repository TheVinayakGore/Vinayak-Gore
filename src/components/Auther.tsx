import React from "react";
import Image from "next/image";
import { ImYoutube } from "react-icons/im";
import { TfiUser } from "react-icons/tfi";
import { RxDownload } from "react-icons/rx";
import Comments from "./Comments";
import Link from "next/link";
import Tooltip from "./Tooltip";
import { ContainerScroll } from "./ui/container-scroll-animation";

interface AuthorProps {
  isDarkMode: boolean;
}

const Auther: React.FC<AuthorProps> = ({ isDarkMode }) => {
  return (
    <>
      <main
        id="auther"
        className="responsive-themeBtn flex-col items-center justify-center m-auto px-10 lg:px-32 border-b border-zinc-300 dark:border-zinc-800 lg:max-w-8xl w-full h-full"
      >
        <div className="w-full h-full">
          <div className="flex flex-col overflow-hidden w-full h-full">
            <ContainerScroll
              titleComponent={
                <>
                  <h1 className="text-4xl font-semibold bg-gradient-to-b from-black to-zinc-500 dark:from-white dark:to-zinc-600 bg-clip-text tracking-tight text-transparent py-5">
                    Empowering Ideas with Stunning <br />
                    <span className="text-4xl md:text-[7rem] font-bold leading-none">
                      Web Creations
                    </span>
                  </h1>
                </>
              }
            >
              <div className="flex flex-col items-center justify-center m-auto overflow-auto space-y-5 py-20 w-full h-full">
                <div className="flex flex-col items-center space-y-5 z-10 w-full">
                  <Image
                    src="/vinu.png"
                    alt="vinugore"
                    width={400}
                    height={400}
                    className="rounded-2xl mt-10 lg:mt-0 w-auto"
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

                <div className="text-center p-3 text-xs sm:text-sm md:text-base max-w-4xl w-full">
                  <span className="text-base md:text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text tracking-tight text-transparent">
                    Namaste Guys,{" "}
                  </span>
                  <br />
                  <br />
                  I&apos;m Vinayak Gore, a Web Developer specializing in React,
                  Next.js, and the MERN stack, with experience in building
                  responsive websites using Tailwind CSS and Shadcn UI. I create
                  intuitive UIs and dynamic backend solutions with MongoDB and
                  Express. Whether you need a portfolio, online store, or custom
                  web app, I deliver quality work.
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
                    className="flex items-center space-x-5 my-2 sm:my-0 px-5 animate-shimmer transition-colors bg-[linear-gradient(110deg,#fbfbfd,45%,#efefef,55%,#fbfbfd)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border border-zinc-400 dark:border-zinc-800 hover:border-zinc-700 dark:hover:border-zinc-500 text-zinc-500 dark:text-zinc-300 hover:bg-blue-500 hover:text-black dark:hover:text-white text-base font-medium rounded-lg h-12"
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
                      className="flex items-center px-5 bg-white dark:bg-zinc-950 border border-zinc-400 dark:border-zinc-800 hover:border-black dark:hover:border-zinc-500 text-zinc-500 hover:text-black dark:hover:text-white no-underline group cursor-pointer relative rounded-md h-12"
                    >
                      <p className="mr-5">Resume</p>
                      <RxDownload className="w-5 h-5" />
                      <span className="absolute -bottom-0 left-[0.7rem] h-[1px] dark:h-px w-[calc(100%-1.3rem)] bg-gradient-to-r from-emerald-400/0 via-green-500 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                    </a>
                  </Tooltip>
                </div>
              </div>
            </ContainerScroll>
          </div>
        </div>
        <Comments />
      </main>
    </>
  );
};

export default Auther;

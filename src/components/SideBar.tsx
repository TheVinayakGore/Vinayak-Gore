"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { BsMoonStars } from "react-icons/bs";
import { HiOutlineSun } from "react-icons/hi2";
import { RiArrowRightSFill } from "react-icons/ri";
import { RiArrowRightUpFill } from "react-icons/ri";

interface MainProjects {
  _id: string;
  title: string;
  description: string;
  image?: {
    asset: {
      _ref: string;
    };
    caption?: string;
  };
  projectUrl?: string;
}

interface SideBarProps {
  mainprojects: MainProjects[];
  isSidebarOpen: boolean;
  handleBackdropClick: (event: React.MouseEvent) => void;
  closeSidebar: () => void;
  toggleTheme: () => void;
  isSunIcon: boolean;
  mailtoLink: string;
  handleFeedbackClick: any;
}

const SideBar: React.FC<SideBarProps> = ({
  mainprojects,
  isSidebarOpen,
  handleBackdropClick,
  closeSidebar,
  toggleTheme,
  isSunIcon,
  mailtoLink,
  handleFeedbackClick,
}) => {
  return (
    <>
      {isSidebarOpen && (
        <main
          className="sidebar-content items-center justify-center m-auto fixed block sm:hidden inset-0 bg-black/[0.6] backdrop-blur-lg z-[100] w-full"
          onClick={handleBackdropClick}
        >
          <div className="flex flex-col items-center space-y-3 absolute right-0 p-3 w-full h-full shadow-md sidebar-content">
            <nav className="flex items-center justify-between p-2 mx-3 bg-transparent/[0.05] dark:bg-transparent/[0.3] border border-white dark:border-zinc-700 rounded-full w-full">
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={40}
                  height={40}
                  className="rounded-full border border-white"
                  priority
                />
                <p className="text-xl text-white">Vinu Gore</p>
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
            </nav>
            <section className="grid-cols-responsive grid grid-cols-2 gap-5 items-start px-3 text-center text-sm text-white overflow-auto pb-5 w-full h-screen">
              <div className="flex flex-col items-start gap-5 w-full">
                <div className="border border-t-0 border-white rounded-2xl w-full">
                  <h1 className="p-2 bg-white text-black rounded-2xl hover:text-white w-full">
                    ✦ Projects
                  </h1>
                  {mainprojects.map((project) => (
                    <ul
                      key={project._id}
                      className="flex flex-col space-y-1 px-3 py-2 whitespace-nowrap text-start text-white rounded-lg w-full"
                    >
                      <li className="flex items-center hover:text-teal-400">
                        <RiArrowRightSFill />{" "}
                        <Link href={project.projectUrl || "/"} target="_blank">
                          {project.title}
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>
                <div className="border border-t-0 border-white rounded-2xl w-full">
                  <h1 className="p-2 bg-white text-black rounded-2xl hover:text-white w-full">
                    ✦ Contact
                  </h1>
                  <ul className="flex flex-col space-y-1 px-3 py-2 whitespace-nowrap text-start text-white rounded-lg w-full">
                    <li className="flex items-center hover:text-teal-400">
                      <RiArrowRightSFill />{" "}
                      <Link href={mailtoLink}>Mail me</Link>
                    </li>
                    <li className="flex items-center hover:text-teal-400">
                      <RiArrowRightSFill />{" "}
                      <Link href="/#socialMedia" target="_blank">
                        Social Media
                      </Link>
                    </li>
                    <li className="flex items-center hover:text-teal-400">
                      <RiArrowRightSFill />{" "}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleFeedbackClick();
                        }}
                      >
                        Give Feedback
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-start gap-5 w-full">
                <div className="border border-t-0 border-white rounded-2xl w-full">
                  <h1 className="p-2 bg-white text-black rounded-2xl hover:text-white w-full">
                    ✦ Author
                  </h1>
                  <ul className="flex flex-col space-y-1 px-3 py-2 whitespace-nowrap text-start text-white rounded-lg w-full">
                    <li className="flex items-center hover:text-teal-400">
                      <RiArrowRightSFill />{" "}
                      <Link href="/#auther" target="_blank">
                        Who am I ?
                      </Link>
                    </li>
                    <li className="flex items-center hover:text-teal-400">
                      <RiArrowRightSFill />{" "}
                      <Link href="/#techStacks" target="_blank">
                        Tech Stacks
                      </Link>
                    </li>
                    <li className="flex items-center hover:text-teal-400">
                      <RiArrowRightSFill />{" "}
                      <Link href="/#freelance" target="_blank">
                        Freelance
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col items-center space-y-2 w-full">
                  <Link
                    href="/create"
                    target="_blank"
                    className="flex items-center justify-between p-2 px-4 bg-white hover:bg-teal-500 text-black rounded-full hover:text-white w-full"
                  >
                    <span>✦ Create</span>{" "}
                    <RiArrowRightUpFill className="text-lg" />
                  </Link>
                  <Link
                    href="/blogs"
                    target="_blank"
                    className="flex items-center justify-between p-2 px-4 bg-white hover:bg-teal-500 text-black rounded-full hover:text-white w-full"
                  >
                    <span>✦ Blogs</span>{" "}
                    <RiArrowRightUpFill className="text-lg" />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default SideBar;

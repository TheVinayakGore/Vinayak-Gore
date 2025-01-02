"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { BackgroundGradient } from "./ui/background-gradient";
// import { MdArrowRightAlt } from "react-icons/md";
import { PiArrowCircleDownRight } from "react-icons/pi";
import { BsVectorPen } from "react-icons/bs";
import { BackgroundBeams } from "./ui/background-beams";
import Tooltip from "./Tooltip";
import Typewriter from "./Typewriter";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { format } from "date-fns";
import { GoArrowRight } from "react-icons/go";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "../components/ui/glowing-stars";
import { Timeline } from "./ui/timeline";

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

interface Blog {
  _id: string;
  title: string;
  desc: string;
  slug: {
    current: string;
  };
  content?: Array<any>;
  date?: string;
}

export const MAIN_PROJECTS_QUERY = defineQuery(`*[_type == "mainprojects"]{
  _id,
  title,
  description,
  "imageUrl": image.asset->url,
  projectUrl
}`);

const BLOGS_QUERY = defineQuery(`*[
  _type == "blogs"
  && defined(slug.current)
]{_id, title, desc, slug, content, date}|order(_createdAt desc)[0...5]`);

const Workflow = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await client.fetch(BLOGS_QUERY);

      // Sorting blogs by date in descending order
      const sortedBlogs = fetchedBlogs.sort((a: Blog, b: Blog) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA; // Newest first
      });

      setBlogs(sortedBlogs);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await client.fetch(MAIN_PROJECTS_QUERY);
      setProjects(fetchedProjects);
    };

    fetchProjects();
  }, []);

  const typingText = `
    Programming is the art of instructing a computer to perform specific tasks through written code. It involves designing, writing, testing, and maintaining code to solve problems or create interactive applications. With programming, you can build anything from simple scripts to complex systems like websites, games, and artificial intelligence models. The process encourages critical thinking, problem-solving, and creativity. Popular programming languages like JavaScript, Python, and C++ allow developers to interact with machines in meaningful ways, creating solutions that impact millions globally. Whether automating repetitive tasks or building groundbreaking software, programming empowers individuals to shape the digital world.
  `;

  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-300 text-xs md:text-sm mb-8">
            Developed and deployed{" "}
            <strong className="dark:text-neutral-200">Mega Mall</strong>, an
            e-commerce platform, and{" "}
            <strong className="dark:text-neutral-200">Gore Blogs</strong>, a
            blogging app, using{" "}
            <strong className="dark:text-neutral-200">Next.js</strong>,{" "}
            <strong className="dark:text-neutral-200">Tailwind CSS</strong>,{" "}
            <strong className="dark:text-neutral-200">Shadcn UI</strong>, and{" "}
            <strong className="dark:text-neutral-200">Sanity CMS</strong>. Both
            are live on{" "}
            <strong className="dark:text-neutral-200">Vercel</strong> with
            source code on{" "}
            <strong className="dark:text-neutral-200">GitHub</strong>.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {projects
              .filter(
                (project) =>
                  project.title === "Mega Mall" || project.title === "Key.Store"
              )
              .sort((a, b) => {
                if (a.title === "Mega Mall") return -1;
                if (b.title === "Mega Mall") return 1;
                return 0;
              })
              .map((project) => (
                <Link
                  key={project._id}
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener"
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={500}
                    height={1000}
                    priority
                    className="rounded-lg transform hover:scale-105 duration-300 border border-zinc-500 object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
                  />
                </Link>
              ))}
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-300 text-xs md:text-sm mb-8">
            Discover my portfolio with creations like{" "}
            <strong className="dark:text-neutral-200">Textify</strong>, a text
            utility app,{" "}
            <strong className="dark:text-neutral-200">DooZen</strong>, a task
            manager,{" "}
            <strong className="dark:text-neutral-200">News Mark</strong>, a
            real-time news aggregator, and a modern take on the classic{" "}
            <strong className="dark:text-neutral-200">Snake Game</strong>.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {projects
              .filter(
                (project) =>
                  project.title === "Textify" ||
                  project.title === "DooZen" ||
                  project.title === "News Mark" ||
                  project.title === "Snake Game"
              )
              .map((project) => (
                <Link
                  key={project._id}
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener"
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={500}
                    height={1000}
                    priority
                    className="rounded-lg transform hover:scale-105 duration-300 border border-zinc-500 object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
                  />
                </Link>
              ))}
          </div>
        </div>
      ),
    },
    {
      title: "Past 2022",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-300 text-xs md:text-sm mb-4">
            Started learning web development in 2022 with a focus on creating
            responsive and dynamic websites.
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-400 text-xs md:text-sm">
              ✅ Improved my UI layouts by building various types of websites.
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-400 text-xs md:text-sm">
              ✅ Designed and developed a different templates with Bootstrap & Tailwind CSS.
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-400 text-xs md:text-sm">
              ✅ Created projects to explore and learn advanced web development
              techniques.
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-400 text-xs md:text-sm">
              ✅ Started adding projects to GitHub.
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-400 text-xs md:text-sm">
              🧑‍💻 Below are my websites, which were created at a beginner level.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="https://www.linkedin.com/posts/vinayak-gore-b85b7922a_first-newbeginnings2022-html-activity-6949800187313688576-_UIS?utm_source=share&utm_medium=member_desktop"
              target="_blank"
            >
              <Image
                src="/F1.png"
                alt="Gym Website"
                width={500}
                height={500}
                priority
                className="rounded-lg transform hover:scale-105 duration-300 border border-zinc-500 object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/posts/vinayak-gore-b85b7922a_my-website-pdf-activity-6949802181495508992-iXfO?utm_source=share&utm_medium=member_desktop"
              target="_blank"
            >
              <Image
                src="/F2.png"
                alt="Construction web"
                width={500}
                height={500}
                priority
                className="rounded-lg transform hover:scale-105 duration-300 border border-zinc-500 object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <main
        id="start"
        className="flex flex-col items-center justify-center m-auto space-y-20 z-40 w-full"
      >
        <div className="font-medium w-full">
          <Timeline data={data} />
        </div>

        <div className="flex flex-col items-center justify-center space-y-5 md:space-y-14 mt-20 m-auto max-w-7xl w-full">
          <div className="z-40 w-full">
            <h1 className="md:text-4xl text-2xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-black to-zinc-400 dark:from-zinc-50 dark:to-zinc-600 font-semibold text-center relative z-20 h-8 sm:h-10 md:h-12 lg:h-14">
              Blogs Collection
            </h1>
            <p className="text-center tracking-widest text-zinc-500 text-xs sm:text-sm md:text-lg">
              Some blogs related to Modern UI & Front-end websites
            </p>
          </div>

          <div className="flex flex-col items-center justify-center m-auto w-full">
            {/* <ul className="flex flex-wrap items-center justify-center w-full">
              {indicesToShow.map((index) => {
                const project = projects[index];
                if (!project || !project.imageUrl) {
                  return null;
                }
                return (
                  <li
                    key={project._id}
                    className="w-full sm:w-1/2 lg:w-1/3 p-2"
                  >
                    <BackgroundGradient className="rounded-xl hover:shadow-xl shadow-black w-full h-full">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        layout="responsive"
                        height={400}
                        width={400}
                        className="rounded-t-xl w-full h-auto"
                      />
                      <div className="flex flex-col items-start gap-3 p-5">
                        <h1 className="text-base sm:text-2xl text-white font-semibold">
                          {project.title}
                        </h1>
                        <p className="text-sm text-zinc-200">
                          {project.description.slice(0, 500)}
                        </p>
                        <Link
                          href={project.projectUrl}
                          target="_blank"
                          className="hover:scale-110 transition-transform rounded-full p-2 px-6 mt-5 hover:shadow-lg shadow-zinc-800/[0.7] text-white inline-flex items-center space-x-3 border border-white hover:border-blue-600 text-sm font-medium hover:bg-blue-600"
                        >
                          <span>Explore Now</span>
                          <MdArrowRightAlt className="w-5 h-5" />
                        </Link>
                      </div>
                    </BackgroundGradient>
                  </li>
                );
              })}
            </ul> */}

            <div className="mx-auto overflow-y-auto py-5 w-full h-full">
              <div className="flex flex-wrap items-start justify-start w-full">
                {blogs.length > 0 ? (
                  blogs.slice(0, 5).map((blog) => (
                    <Link
                      key={blog._id}
                      href={`/blogs/${blog?.slug?.current}`}
                      target="_blank"
                      className="flex flex-col items-start w-full sm:w-1/2 lg:w-1/3 p-2 h-48"
                    >
                      <div className="hover:animate-shimmer transition-colors bg-[linear-gradient(110deg,#fbfbfd,45%,#efefef,55%,#fbfbfd)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] relative border border-zinc-200 dark:border-zinc-800 hover:shadow-lg shadow-zinc-200 dark:shadow-zinc-900 p-5 h-full overflow-hidden rounded-xl flex flex-col items-start group">
                        <div className="flex items-center space-x-2 text-xs leading-3 font-light text-zinc-500 dark:text-zinc-500 w-full">
                          <PiArrowCircleDownRight className="w-4 h-4" />
                          <span className="">
                            {blog.date
                              ? format(new Date(blog.date), "MMM dd, yyyy")
                              : "No Date"}{" "}
                          </span>
                        </div>
                        <h1 className="text-lg font-normal relative z-20 my-3 text-black dark:text-zinc-300">
                          {blog?.title}
                        </h1>
                        <p className="relative text-zinc-500 z-20 text-sm">
                          {blog?.desc
                            ? blog.desc.split(" ").slice(0, 15).join(" ") +
                              "..."
                            : "No description available"}
                        </p>
                        <span className="absolute -bottom-0 left-[1.125rem] h-[1px] dark:h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-transparent via-blue-700 dark:via-yellow-400 to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                        <span className="absolute -top-0 left-[1.125rem] h-[1px] dark:h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-transparent via-blue-700 dark:via-yellow-400 to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No blogs available.</p>
                )}
                <div className="flex items-start justify-start rounded-xl p-2 antialiased w-full md:w-1/2 lg:w-1/3">
                  <GlowingStarsBackgroundCard className="p-5 w-full">
                    <GlowingStarsTitle className="text-zinc-300 my-2">
                      About this site
                    </GlowingStarsTitle>
                    <div className="flex items-end justify-between">
                      <GlowingStarsDescription className="flex text-sm text-zinc-400 w-full">
                        Lorem ipsum dolor sit amet consec tetur, adipisicing
                        elit. Veniam
                      </GlowingStarsDescription>
                      <Link
                        href="/blogs/portfoliopage"
                        target="_blank"
                        className="flex items-center justify-end hover:scale-105 transition-transform text-zinc-200 w-10 h-10"
                      >
                        <GoArrowRight className="p-2 bg-[hsla(0,0%,100%,.1)] rounded-full w-9 h-9" />
                      </Link>
                    </div>
                  </GlowingStarsBackgroundCard>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between hover:shadow-xl shadow-zinc-200 dark:shadow-zinc-900 rounded-2xl w-full relative z-40 h-full md:h-[30rem]">
              <div className="relative bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-4 py-10 overflow-hidden rounded-2xl flex flex-col justify-between items-start w-full h-full">
                <h1 className="md:text-3xl text-2xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-black to-zinc-400 dark:from-zinc-50 dark:to-zinc-700 font-semibold text-center relative z-50 w-full h-20">
                  What is Programming ?
                </h1>

                <div className="font-normal text-base text-zinc-600 my-10 relative z-50 px-5 w-full h-full">
                  <Typewriter
                    text={typingText}
                    speed={30}
                    time={2000}
                    remove={0}
                    loop={true}
                  />
                </div>

                <Link
                  href="/blogs"
                  target="_blank"
                  className="flex items-center justify-center m-auto z-40"
                >
                  <Tooltip
                    text="Explore blogs page"
                    className="mb-2 -left-2 bottom-full w-max h-max"
                  >
                    <button className="animate-shimmer transition-colors bg-[linear-gradient(110deg,#fbfbfd,45%,#efefef,55%,#fbfbfd)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border border-zinc-400 dark:border-zinc-800 hover:border-blue-600 dark:hover:border-zinc-600 text-zinc-500 hover:text-blue-600 dark:hover:text-zinc-100 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-300 dark:shadow-zinc-900 rounded-md px-5 h-10 inline-block">
                      <div className="flex items-center text-sm space-x-3">
                        <span>Explore</span>
                        <BsVectorPen />
                      </div>
                      <span className="absolute -bottom-0 left-[1.125rem] h-[1px] dark:h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-transparent via-blue-500 dark:via-sky-500 to-transparent transition-opacity duration-500 group-hover:opacity-40" />
                    </button>
                  </Tooltip>
                </Link>
              </div>
              <div className="w-full">
                <span className="absolute -top-0 left-[1.125rem] h-[2px] dark:h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-transparent via-purple-500 dark:via-purple-400 to-transparent" />
                <span className="absolute -bottom-0 left-[1.125rem] h-[2px] dark:h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-transparent via-teal-500 dark:via-teal-400 to-transparent" />
                <BackgroundBeams />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Workflow;

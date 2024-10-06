"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BackgroundGradient } from "./ui/background-gradient";
import { MdArrowRightAlt } from "react-icons/md";
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
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Cupiditate possimus delectus doloribus a! Ea et, nesciunt
    nulla commodi aliquid tempora exercitationem doloribus ex
    cupiditate blanditiis ut praesentium aut magni adipisci?
    Voluptate aliquam nam distinctio ratione impedit tenetur
    blanditiis dolore quaerat corrupti repellendus praesentium
    unde, eligendi provident optio assumenda voluptates asperiores
    sequi nihil enim deserunt eveniet placeat suscipit. Temporibus
    debitis fugiat omnis at, odit nobis. Iusto porro quasi nostrum
    illo. Sapiente eius modi reprehenderit voluptatem saepe,
    voluptatum hic numquam amet, itaque repellendus incidunt,
    minus asperiores ipsum sit adipisci! Consequatur illo quidem
    quo, eum nobis repudiandae tempora doloremque itaque
    doloribus. Deleniti autem at, impedit accusamus tempora harum,
    distinctio rerum non, earum delectus eligendi possimus?
    Laudantium nihil esse ipsa, deserunt architecto aperiam nulla
    debitis veritatis, adipisci quidem facilis rerum earum
    suscipit optio molestias aliquam veniam at possimus sit
    aspernatur labore. Odit nisi, debitis delectus, perferendis
    quia aliquam nihil illum quibusdam assumenda eos ex!
  `;

  const indicesToShow = [1, 3, 4];

  return (
    <>
      <main
        id="start"
        className="flex flex-col items-center justify-center space-y-20 m-auto -mt-48 z-40 w-full"
      >
        <div className="z-40 w-full">
          <h1 className="md:text-4xl text-2xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-600 font-semibold text-center relative z-20 h-14">
            Workflow Collection
          </h1>
          <p className="text-center tracking-widest text-zinc-500">
            Some Full Stack projects, Modern UI and SEO friendly websites
          </p>
        </div>

        <div className="flex flex-col items-center justify-center m-auto">
          <div className="space-y-5">
            <ul className="flex items-center justify-center space-x-3 w-full">
              {indicesToShow.map((index) => {
                const project = projects[index];
                if (!project || !project.imageUrl) {
                  return null;
                }
                return (
                  <li
                    key={project._id}
                    className="hover:scale-105 transition-transform w-full"
                  >
                    <BackgroundGradient className="rounded-xl bg-gradient-to-t from-black to-indigo-500/[0.5] w-full">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        height="400"
                        width="400"
                        className="rounded-t-xl w-full h-full"
                      />
                      <div className="gap-3 px-6 pb-5">
                        <h1 className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-zinc-200">
                          {project.title}
                        </h1>
                        <p className="text-sm text-zinc-400 dark:text-zinc-500">
                          {project.description.slice(0, 500)}
                        </p>
                        <Link
                          href={project.projectUrl} className="hover:scale-105 transition-transform rounded-full p-2 px-6 mt-10 text-zinc-500 hover:text-white inline-flex items-center space-x-3 border border-zinc-700 hover:border-blue-600 text-sm font-medium hover:bg-blue-600">
                          <span>Explore Now</span>
                          <MdArrowRightAlt className="w-5 h-5" />
                        </Link>
                      </div>
                    </BackgroundGradient>
                  </li>
                );
              })}
            </ul>

            <div className="mx-auto overflow-y-auto w-full h-full">
              <div className="flex flex-wrap items-start justify-start gap-3 w-full">
                {blogs.length > 0 ? (
                  blogs.slice(0, 5).map((blog) => (
                    <Link
                      key={blog._id}
                      href={`/blogs/${blog?.slug?.current}`}
                      target="_blank"
                      className="flex flex-col items-start w-[26.8rem] h-48"
                    >
                      <div className="hover:animate-shimmer transition-colors bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] relative bg-white dark:bg-black border border-zinc-800 p-5 h-full overflow-hidden rounded-xl flex flex-col items-start group">
                        <div className="flex items-center space-x-2 text-xs leading-3 font-light text-zinc-500 w-full">
                          <PiArrowCircleDownRight className="w-4 h-4" />
                          <span className="text-zinc-600">
                            {blog.date
                              ? format(new Date(blog.date), "MMM dd, yyyy")
                              : "No Date"}{" "}
                          </span>
                        </div>
                        <h1 className="text-lg font-normal relative z-20 my-3 text-zinc-300">
                          {blog?.title}
                        </h1>
                        <p className="text-zinc-600 relative z-20 text-sm">
                          {blog?.desc
                            ? blog.desc.split(" ").slice(0, 27).join(" ") +
                              "..."
                            : "No description available"}
                        </p>
                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                        <span className="absolute -top-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No blogs available.</p>
                )}
                <div className="flex items-start justify-start rounded-xl antialiased w-[26.8rem]">
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

            <div className="flex flex-col items-center justify-between w-full relative z-40 h-[30rem]">
              <div className="relative shadow-xl bg-zinc-950 border border-zinc-800 px-4 py-10 overflow-hidden rounded-2xl flex flex-col justify-between items-start w-full h-full">
                <h1 className="md:text-3xl text-2xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-700 font-semibold text-center relative z-50 w-full h-12">
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
                    <button className="animate-shimmer transition-colors bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-100 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-md px-5 h-10 inline-block">
                      <div className="flex items-center text-sm space-x-3">
                        <span>Explore</span>
                        <BsVectorPen />
                      </div>
                      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-transparent via-sky-500 to-transparent transition-opacity duration-500 group-hover:opacity-40" />
                    </button>
                  </Tooltip>
                </Link>
              </div>
              <div className="w-full">
                <span className="absolute -top-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
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

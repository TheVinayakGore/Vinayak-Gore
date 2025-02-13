"use client";
import React, { useEffect, useState, lazy } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { BiCircle } from "react-icons/bi";
import { LuChevronRightCircle } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { defineQuery } from "next-sanity";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { format } from "date-fns";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Navbar from "@/components/Navbar";

const LoadingSpinner = lazy(() => import("@/components/LoadingSpinner"));
const LoadingBar = lazy(() => import("@/components/LoadingBar"));

interface Blog {
  _id: string;
  title: string;
  desc: string;
  slug: {
    current: string;
  };
  content?: Array<any>;
  date?: string;
  coverImage?: {
    asset: {
      _ref: string;
    };
    attribution?: string;
  };
}

const BLOGS_QUERY = defineQuery(`*[
  _type == "blogs"
  && defined(slug.current)
]{_id, title, desc, slug, content, date, coverImage}|order(_createdAt desc)`);

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSunIcon, setIsSunIcon] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      setIsSunIcon(storedTheme !== "dark");
      document.body.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    setIsSunIcon((prevState) => !prevState);
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await client.fetch(BLOGS_QUERY);
        const sortedBlogs = fetchedBlogs.sort((a: Blog, b: Blog) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA; // Sorting in descending order
        });
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const placeholders = [
    "How to implement responsive design?",
    "What is the DOM in web development?",
    "How to optimize images for the web?",
    "Write a JavaScript function to fetch API data.",
    "What are the differences between REST and GraphQL?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Filter blogs based on the search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <title>Blogs Page | Web Development | Vinayak Gore</title>
      <LoadingBar loading={loading} />
      {loading && <LoadingSpinner />}
      <Navbar toggleTheme={toggleTheme} isSunIcon={isSunIcon} />
      <main className="pt-28 md:pt-20 w-full">
        <section className="flex flex-col items-center justify-center m-auto gap-20 px-10 w-full">
          <div className="w-full h-full">
            <div className="">
              <TextHoverEffect
                text="NEWBLOGS"
                className="text-[0px] md:text-[3.5rem] -mt-20 z-10"
              />
              <p className="text-center tracking-widest mb-5 sm:-mt-28 pb-10 text-sm sm:text-3xl font-thin">
                All the blogs related to development
              </p>
            </div>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>

          <div className="pb-20 w-full xl:max-w-6xl h-full">
            <div className="w-full h-full">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <div className="w-full" key={blog._id}>
                    <div className="flex flex-col md:flex-row items-start space-x-0 md:space-x-14 w-full">
                      <span className="text-center text-sm font-light text-zinc-600 w-full md:w-40 mb-4 md:mb-0">
                        {blog.date
                          ? format(new Date(blog.date), "MMM dd, yyyy")
                          : "No Date"}{" "}
                      </span>
                      <div className="flex items-start relative w-full">
                        <BiCircle className="absolute inset-0 -left-[5px] text-zinc-500 bg-white dark:bg-black w-3 h-3" />
                        <div className="border-l border-zinc-800 pl-14 pb-10 w-full">
                          <div className="flex flex-col lg:flex-row border border-zinc-800 hover:border-blue-800 hover:bg-gradient-to-r from-blue-600/[0.2] to-cyan-600/[0.2] text-zinc-600 hover:text-zinc-500 mb-2 rounded-lg h-auto lg:h-56 hover:scale-105 transition-transform">
                            <div className="w-full lg:w-[40rem]">
                              {blog.coverImage && (
                                <Image
                                  src={urlFor(blog.coverImage.asset).url()}
                                  alt={
                                    blog.coverImage.attribution || "Cover image"
                                  }
                                  width={300}
                                  height={300}
                                  className="rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none border-b lg:border-r lg:border-b-0 border-zinc-800 w-full h-full"
                                  priority
                                />
                              )}
                            </div>
                            <div className="p-3 pl-5 w-full">
                              <h2 className="font-medium text-xl tracking-wider text-black dark:text-zinc-100">
                                {blog?.title}
                              </h2>
                              <p className="leading-relaxed font-light my-5">
                                {blog?.desc.slice(0, 150)}...
                              </p>
                              <Link
                                href={`/blogs/${blog?.slug?.current}`}
                                target="_blank"
                                className="hover:scale-105 transition-transform inline-flex items-center px-5 py-2 leading-5 rounded-full relative bg-white dark:bg-transparent text-zinc-600 hover:border-blue-600 hover:text-blue-600 text-sm hover:shadow-2xl hover:shadow-white/[0.1] border border-zinc-600"
                              >
                                <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                                <span className="relative z-20 font-light">
                                  Read more
                                </span>
                                <LuChevronRightCircle className="ml-3 w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-lg font-light text-zinc-600">
                  No blog found !
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blogs;
"use client";
import React, { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { MdOutlineDownloading } from "react-icons/md";
import { BiRightArrowCircle } from "react-icons/bi";
import { VscGithub } from "react-icons/vsc";
import { MdPlayCircleOutline } from "react-icons/md";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

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
  tutdownloadUrl: string | null;
  tutorialGitUrl: string | null;
  tutorialYTUrl: string | null;
  tutlink: string | null;
  date: string;
}

const TUTORIALS_QUERY = `*[_type == "tutorials"]{
  _id,
  tutfilter,
  tuttitle,
  tutcategory,
  tutstack,
  tutshortdesc,
  tutimage,
  tutdownloadUrl,
  tutorialGitUrl,
  tutorialYTUrl,
  tutlink,
  date,
}`;

const Tutorials = () => {
  const [tutorialData, setTutorialData] = useState<Tutorial[]>([]);
  const [selectedStack, setSelectedStack] = useState<string>("All");

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const data = await client.fetch(TUTORIALS_QUERY);
        const sortedData = data.sort(
          (a: Tutorial, b: Tutorial) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setTutorialData(sortedData);
      } catch (error) {
        alert("Error fetching tutorial data : " + error);
      }
    };

    fetchTutorials();
  }, []);

  const handleDownloadClick = (url: string) => {
    const toastId = toast.info("Download starting...", {
      autoClose: false,
      closeButton: true,
    });

    setTimeout(() => {
      toast.update(toastId, {
        render: "Download complete!",
        type: "success",
        autoClose: 5000,
      });
    }, 3000);

    window.location.href = url;
  };

  const stacks = [
    "All",
    "CSS",
    "Javascript",
    "Typescript",
    "Rest API",
    "Bootstrap",
    "Tailwind CSS",
    "Vite",
    "React.js",
    "Next.js",
    "Material UI",
    "Shadcn UI",
    "MERN",
    "Aceternity UI",
  ];

  const filteredTutorials =
    selectedStack === "All"
      ? tutorialData
      : tutorialData.filter((item) => item.tutstack.includes(selectedStack));

  // Function to handle link clicks
  const handleLinkClick = (link: string | null) => {
    if (!link) {
      toast.warning("Currently unavailable, comming soon !", {
        autoClose: 2000,
      });
      return false; // Indicate the link is unavailable
    }
    return true; // Indicate the link is available
  };

  return (
    <>
      <main className="flex flex-col items-start w-full h-full">
        <section className="flex items-center justify-between border-b dark:border-zinc-500 shadow-lg shadow-zinc-900/[0.2] w-full">
          <h1 className="text-orange-400 text-3xl font-medium text-start relative p-5 w-1/2 md:w-1/4">
            Tutorials
          </h1>
          <div className="flex items-center space-x-2 p-5 text-base font-light overflow-auto whitespace-nowrap w-full">
            {stacks.map((item) => (
              <button
                key={item}
                className={`px-8 leading-9 hover:scale-105 transition-transform bg-black/[0.07] dark:bg-white/[0.2] dark:text-white hover:bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:text-white rounded-full hover:shadow-xl ${
                  selectedStack === item
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                    : ""
                }`}
                onClick={() => setSelectedStack(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-start justify-start overflow-auto w-full h-full">
          <div className="mx-auto overflow-auto w-full h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-7 items-center justify-center m-auto py-10 w-full">
              {filteredTutorials.length > 0 ? (
                filteredTutorials.map((item, index) => (
                  <CardContainer
                    key={index}
                    className="flex flex-col items-start justify-start inter-var w-full h-full"
                  >
                    <CardBody className="flex flex-col items-start justify-between relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] text-white bg-gradient-to-t from-indigo-500 to-white/[0.3] backdrop-blur-xl rounded-xl z-40 w-full h-full md:h-[500px]">
                      <CardItem translateZ={40} className="flex-col w-full h-full">
                        <CardItem className="w-full">
                          <Image
                            src={
                              item.tutimage?.asset?._ref
                                ? urlFor(item.tutimage.asset).url()
                                : "/noimage.png"
                            }
                            height={500}
                            width={1000}
                            className="h-60 rounded-xl group-hover/card:shadow-xl"
                            alt={item.tuttitle || "tutorial image"}
                          />
                        </CardItem>
                        <div className="p-5">
                          <CardItem
                            translateZ={40}
                            className="flex items-center whitespace-nowrap w-[25vw]"
                          >
                            <div className="flex item-center w-full">
                              <div className="flex space-x-1 overflow-auto pb-4 w-full">
                                {item.tutstack?.map((stack, index) => (
                                  <span
                                    key={index}
                                    className="p-1 px-2 leading-4 bg-pink-500 dark:bg-lime-500 rounded text-xs mb-1 font-light text-white w-max"
                                  >
                                    {stack}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </CardItem>
                          <CardItem
                            translateZ={50}
                            className="text-xl font-bold"
                          >
                            {item.tuttitle}
                          </CardItem>
                          <CardItem
                            as="p"
                            translateZ={50}
                            className="text-sm mt-2 text-zinc-100 font-light"
                          >
                            {item.tutshortdesc.slice(0, 100)}...
                          </CardItem>
                        </div>
                      </CardItem>

                      <div className="flex flex-col items-center justify-between space-y-2 m-auto text-base font-light p-5 pt-0 w-full">
                        <CardItem translateZ={40} className="w-full">
                          <div className="flex flex-col md:flex-row items-center gap-2 w-full">
                            <Link
                              href={item.tutorialGitUrl || "/errorpage"}
                              target={
                                item.tutorialGitUrl ? "_blank" : undefined
                              }
                              rel={item.tutorialGitUrl ? "noopener" : undefined}
                              onClick={(e) => {
                                if (!handleLinkClick(item.tutorialGitUrl))
                                  e.preventDefault();
                              }}
                              className={`flex items-center justify-between p-1 pl-3 rounded-full relative bg-transparent border border-zinc-200 ${
                                item.tutorialGitUrl
                                  ? "hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-500 hover:shadow-md hover:scale-105"
                                  : "opacity-50 hover:cursor-not-allowed"
                              } transition-transform w-full`}
                            >
                              <span className="relative z-20">GitHub Repo</span>
                              <VscGithub className="w-7 h-7" />
                            </Link>

                            <Link
                              href={item.tutorialYTUrl || "/errorpage"}
                              target={item.tutorialYTUrl ? "_blank" : undefined}
                              rel={item.tutorialYTUrl ? "noopener" : undefined}
                              onClick={(e) => {
                                if (!handleLinkClick(item.tutorialYTUrl))
                                  e.preventDefault();
                              }}
                              className={`flex items-center justify-between p-1 pl-3 rounded-full relative bg-transparent border border-zinc-200 ${
                                item.tutorialYTUrl
                                  ? "hover:border-red-500 dark:hover:border-red-500 hover:bg-red-500 hover:shadow-md hover:scale-105"
                                  : "opacity-50 hover:cursor-not-allowed"
                              } transition-transform w-full`}
                            >
                              <span className="relative z-20">
                                YouTube Video
                              </span>
                              <MdPlayCircleOutline className="w-7 h-7" />
                            </Link>
                          </div>
                        </CardItem>
                        <CardItem translateZ={40} className="w-full">
                          <div className="flex flex-col md:flex-row items-center gap-2 w-full">
                            <a
                              href={item.tutdownloadUrl || "/errorpage"}
                              onClick={(e) => {
                                if (!item.tutdownloadUrl) {
                                  e.preventDefault();
                                } else {
                                  handleDownloadClick(item.tutdownloadUrl);
                                }
                              }}
                              className={`flex items-center p-1 pl-3 rounded-full relative bg-transparent border border-zinc-200 ${
                                item.tutdownloadUrl
                                  ? "hover:border-green-500 dark:hover:border-green-500 hover:bg-green-500 hover:shadow-md hover:scale-105"
                                  : "opacity-50 hover:cursor-not-allowed"
                              } transition-transform w-full`}
                            >
                              <button className="flex items-center justify-between w-full">
                                <span className="relative z-20">
                                  Download Now
                                </span>
                                <MdOutlineDownloading className="w-7 h-7" />
                              </button>
                            </a>
                            <Link
                              href={`/create/${item._id}`}
                              target="_blank"
                              rel="noopener"
                              className="flex items-center justify-between p-1 pl-3 rounded-full relative bg-transparent border border-zinc-200 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-500 hover:shadow-md hover:scale-105 transition-transform w-full"
                            >
                              <span className="relative z-20">
                                Start Reading
                              </span>
                              <BiRightArrowCircle className="w-7 h-7" />
                            </Link>
                          </div>
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                ))
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <p className="text-lg font-mono opacity-50">
                    # Currently Unavailable !
                  </p>
                  <Image
                    src="/nofile2.gif"
                    alt="No File found!"
                    width={700}
                    height={700}
                    priority
                    className="rounded-xl w-[23rem]"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Tutorials;

"use client";
import React, { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { MdOutlineDownloading } from "react-icons/md";
import { BiRightArrowCircle } from "react-icons/bi";
import { VscGithub } from "react-icons/vsc";
import { MdPlayCircleOutline } from "react-icons/md";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
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
  tutdownloadUrl: string;
  tutorialGitUrl: string;
  tutorialYTUrl: string;
  tutlink: string;
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

  return (
    <>
      <div className="flex flex-col items-start w-full h-[64.5rem]">
        <div className="flex items-center justify-between border-b shadow-lg shadow-zinc-900/[0.2] pt-4 w-full">
          <div className="flex items-center space-x-4 w-1/2">
            <h1 className="md:text-2xl text-xl lg:text-3xl font-medium text-start relative px-5 h-10">
              Tutorials
            </h1>
          </div>
          <div className="flex items-center space-x-2 p-4 text-base font-light overflow-auto whitespace-nowrap w-full">
            {stacks.map((item) => (
              <button
                key={item}
                className={`px-8 leading-9 hover:scale-105 transition-transform bg-white hover:bg-gradient-to-r from-teal-500 to-green-500 text-black hover:text-white rounded-full hover:shadow-xl ${
                  selectedStack === item
                    ? "bg-gradient-to-r from-teal-500 to-green-500 text-white"
                    : ""
                }`}
                onClick={() => setSelectedStack(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-start w-full h-full">
          <div className="mx-auto overflow-auto w-full h-full">
            <div className="flex flex-wrap items-start justify-start gap-6 px-7 py-10 w-full">
              {filteredTutorials.length > 0 ? (
                filteredTutorials.map((item, index) => (
                  <CardContainer key={index} className="inter-var h-full">
                    <CardBody className="flex flex-col items-start justify-between relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-blue-100 rounded-xl z-40 w-[25.5rem] h-max">
                      <CardItem translateZ={40} className="w-full">
                        <Image
                          src={
                            item.tutimage?.asset?._ref
                              ? urlFor(item.tutimage.asset).url()
                              : "/noimage.png"
                          }
                          height={500}
                          width={1000}
                          className="h-60 w-full rounded-xl group-hover/card:shadow-xl"
                          alt={item.tuttitle || "tutorial image"}
                        />
                      </CardItem>
                      <div className="p-5">
                        <CardItem
                          translateZ={60}
                          className="flex items-center whitespace-nowrap w-[20rem]"
                        >
                          <div className="flex item-center w-[23rem]">
                            <div className="flex space-x-1 overflow-auto pb-4 w-full">
                              {item.tutstack?.map((stack, index) => (
                                <span
                                  key={index}
                                  className="p-1 px-2 leading-4 border border-pink-500 rounded text-xs mb-1 font-light text-pink-500 w-max"
                                >
                                  {stack}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardItem>
                        <CardItem
                          translateZ={50}
                          className="text-xl font-bold text-black"
                        >
                          {item.tuttitle}
                        </CardItem>
                        <CardItem
                          as="p"
                          translateZ={50}
                          className="text-sm mt-2 text-zinc-800 font-light"
                        >
                          {item.tutshortdesc}
                        </CardItem>
                      </div>
                      <div className="flex flex-col items-center justify-between space-y-2 m-auto text-base font-light p-5 pt-0 w-full">
                        <CardItem translateZ={40} className="w-full">
                          <div className="flex items-center space-x-2 w-full">
                            <Link
                              href={item.tutorialGitUrl}
                              target="_blank"
                              rel="noopener"
                              className="flex items-center justify-between p-1 pl-3 rounded-full relative bg-transparent text-zinc-800 border border-zinc-800 hover:border-purple-500 hover:bg-purple-500 hover:text-white hover:shadow-md hover:scale-105 transition-transform w-full"
                            >
                              <span className="relative z-20">GitHub Repo</span>
                              <VscGithub className="w-7 h-7" />
                            </Link>
                            <Link
                              href={item.tutorialYTUrl}
                              target="_blank"
                              rel="noopener"
                              className="flex items-center justify-between p-1 pl-3 rounded-full relative bg-transparent text-zinc-800 border border-zinc-800 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-md hover:scale-105 transition-transform w-full"
                            >
                              <span className="relative z-20">
                                YouTube Video
                              </span>
                              <MdPlayCircleOutline className="w-7 h-7" />
                            </Link>
                          </div>
                        </CardItem>
                        <CardItem translateZ={40} className="w-full">
                          <div className="flex items-center space-x-2 w-full">
                            <a
                              href={item.tutdownloadUrl}
                              onClick={(e) => {
                                e.preventDefault();
                                handleDownloadClick(item.tutdownloadUrl);
                              }}
                              className="flex items-center p-1 pl-3 rounded-full relative bg-transparent text-zinc-800 border border-zinc-800 hover:border-green-500 hover:bg-green-500 hover:text-white hover:shadow-md hover:scale-105 transition-transform w-full"
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
                              className="flex items-center justify-between p-1 pl-3 rounded-full relative bg-transparent text-zinc-800 border border-zinc-800 hover:border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-md hover:scale-105 transition-transform w-full"
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
                  <p className="text-lg font-mono opacity-50"># Currently Unavailable !</p>
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
        </div>
      </div>
    </>
  );
};

export default Tutorials;

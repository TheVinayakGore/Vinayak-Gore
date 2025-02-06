"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { MdDownload } from "react-icons/md";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { toast } from "react-toastify";

interface FigmaDoc {
  _id: string;
  title: string;
  image?: {
    asset: {
      _ref: string;
    };
    caption?: string;
  };
  downloadurl: string;
}

const FIGMA_QUERY = `*[_type == "figma"]{
  _id,
  title,
  image,
  downloadurl
}`;

const Figma = () => {
  const [figmaDocs, setFigmaDocs] = useState<FigmaDoc[]>([]);
  const [selectedStack, setSelectedStack] = useState("All");

  useEffect(() => {
    const fetchFigmaDocs = async () => {
      const data = await client.fetch(FIGMA_QUERY);
      setFigmaDocs(data);
    };

    fetchFigmaDocs();
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

  const stacks = ["All", "Hero", "About", "Skills", "Projects", "Experince"];

  // Filter Figma documents based on the selected stack
  const filteredFigmaDocs = figmaDocs.filter((doc) => {
    if (selectedStack === "All") return true; // Show all documents
    return doc.title.toLowerCase().includes(selectedStack.toLowerCase()); // Match title with selected stack
  });

  return (
    <>
      <main className="flex flex-col items-start w-full h-[64.5rem]">
        <section className="flex items-center justify-between border-b dark:border-zinc-500 shadow-lg shadow-zinc-900/[0.2] pt-4 w-full">
          <h1 className="md:text-2xl text-xl lg:text-3xl font-medium text-start relative px-5 h-12 w-1/2">
            Figma
          </h1>
          <div className="flex items-center justify-end space-x-2 p-4 text-base font-light overflow-auto whitespace-nowrap w-full">
            {stacks.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedStack(item)}
                className={`px-7 leading-9 bg-white hover:bg-gradient-to-r from-blue-600 to-blue-800 text-black hover:text-white rounded-full hover:shadow-xl hover:scale-105 transition-transform ${
                  selectedStack === item
                    ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                    : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="h-full">
          <div className="mx-auto overflow-y-auto w-full h-full">
            <div className="flex flex-wrap items-start justify-start gap-10 p-10 w-full">
              {filteredFigmaDocs.length > 0 ? (
                filteredFigmaDocs.map((doc) => (
                  <CardContainer key={doc._id} className="inter-var">
                    <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-blue-100 rounded-xl z-40 w-[37.5rem] h-full">
                      <CardItem translateZ={40} className="w-full">
                        <Image
                          src={
                            doc.image && doc.image.asset
                              ? urlFor(doc.image.asset).url()
                              : "/figma.avif"
                          }
                          width={1000}
                          height={200}
                          className="h-[350px] w-full rounded-xl group-hover/card:shadow-xl"
                          alt={doc.image?.caption || "thumbnail"}
                        />
                      </CardItem>
                      <div className="flex items-center justify-between m-auto my-5 px-5 w-full">
                        <CardItem translateZ={40} className="w-full">
                          <div className="flex items-center justify-between text-sm font-light w-full">
                            <CardItem
                              translateZ={40}
                              className="text-lg font-medium text-black"
                            >
                              {doc.title}
                            </CardItem>
                            <button
                              onClick={() =>
                                handleDownloadClick(doc.downloadurl)
                              }
                              className="p-2 text-zinc-400 shadow-md bg-zinc-100 rounded-full hover:text-sky-500 hover:scale-105 transition-transform"
                            >
                              <MdDownload className="w-5 h-5" />
                            </button>
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

export default Figma;

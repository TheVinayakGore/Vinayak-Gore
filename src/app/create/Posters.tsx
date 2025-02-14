"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { MdDownload } from "react-icons/md";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { toast } from "react-toastify";

interface PosterDoc {
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

const POSTERS_QUERY = `*[_type == "posters"] | order(_createdAt asc) {
  _id,
  title,
  image,
  downloadurl
}`;

const Posters = () => {
  const [posterDocs, setPosterDocs] = useState<PosterDoc[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL POSTERS");

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const data = await client.fetch(POSTERS_QUERY);
        setPosterDocs(data); // Store the posters in state
      } catch (error) {
        toast.error("Error fetching posters:" + error);
      }
    };

    fetchPosters();
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

  const categories = [
    "ALL POSTERS",
    "CHATRAPATI SHIVAJI MAHARAJ",
    "M S DHONI",
    "BALASAHEB THAKARE",
  ];

  // Filter posters based on selected category
  const filteredPosters = posterDocs.filter((doc) => {
    if (selectedCategory === "ALL POSTERS") return true; // Show all documents
    return doc.title.toUpperCase().includes(selectedCategory); // Match title with selected category
  });

  // Separate "Chatrapati" posters and others
  const chatrapatiPosters = filteredPosters.filter((doc) =>
    doc.title.toUpperCase().startsWith("CHATRAPATI")
  );

  const otherPosters = filteredPosters.filter(
    (doc) => !doc.title.toUpperCase().startsWith("CHATRAPATI")
  );

  // Combine "Chatrapati" posters with the rest
  const allPosters = [...chatrapatiPosters, ...otherPosters];

  return (
    <>
      <main className="flex flex-col items-start w-full h-full">
        <section className="flex items-center justify-between border-b dark:border-zinc-500 shadow-lg shadow-zinc-900/[0.2] w-full">
          <h1 className="text-sky-400 text-xl sm:text-3xl font-medium text-start relative p-5 w-1/2">
            Posters
          </h1>
          <div className="flex items-start justify-start space-x-2 p-4 text-base font-light overflow-auto whitespace-nowrap w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)} // Set selected category
                className={`px-7 py-2 leading-6 sm:py-3 text-xs sm:text-base bg-black/[0.07] dark:bg-white/[0.2] dark:text-white hover:bg-gradient-to-r from-cyan-400 to-cyan-600 text-black hover:text-white rounded-full hover:shadow-xl hover:scale-105 transition-transform ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-cyan-400 to-cyan-600 text-white"
                    : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
        <section className="flex flex-col items-center justify-center m-auto overflow-auto w-full h-full">
          <div className="m-auto overflow-auto w-full h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 flex-col items-center justify-center m-auto p-4 sm:p-10 w-full">
              {allPosters.length > 0 ? (
                allPosters.map((doc) => (
                  <CardContainer
                    key={doc._id}
                    className="inter-var w-full h-full"
                  >
                    <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-yellow-400/[0.8] rounded-xl z-40 mb-5 w-full h-full">
                      <CardItem translateZ={40} className="w-full">
                        <Image
                          src={
                            doc.image && doc.image.asset
                              ? urlFor(doc.image.asset).url()
                              : "/posters/p1.avif"
                          }
                          height="1000"
                          width="1000"
                          alt={doc.image?.caption || "thumbnail"}
                          onContextMenu={(e) => e.preventDefault()} // Disable right-click
                          onDragStart={(e) => e.preventDefault()} // Disable drag
                          className="h-full sm:h-[25rem] md:h-[30rem] w-full rounded-xl group-hover/card:shadow-xl"
                        />
                      </CardItem>
                      <div className="flex items-center justify-between m-auto my-5 px-2 sm:px-5 w-full">
                        <CardItem translateZ={40} className="w-full">
                          <div className="flex items-center justify-between text-sm font-light w-full">
                            <CardItem
                              translateZ={40}
                              className="text-xs sm:text-sm md:text-base xl:text-lg font-medium text-white"
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

export default Posters;

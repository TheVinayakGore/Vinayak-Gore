"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FaRegEye } from "react-icons/fa6";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

interface Playlist {
  _id: string;
  title: string;
  description: string;
  image?: {
    asset: {
      _ref: string;
    };
    caption?: string;
  };
  playlistUrl?: string;
  views: number;
}

const PLAYLISTS_QUERY = `*[_type == "playlists"]{
  _id,
  title,
  description,
  image,
  playlistUrl,
  views
}`;

const Playlists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedStack, setSelectedStack] = useState("All");

  useEffect(() => {
    const fetchPlaylists = async () => {
      const data = await client.fetch(PLAYLISTS_QUERY);
      setPlaylists(data);
    };

    fetchPlaylists();
  }, []);

  const stacks = [
    "All",
    "Javascript",
    "Typescript",
    "Rest API",
    "Bootstrap",
    "Tailwind CSS",
    "React.Js",
    "Vite",
    "Next.Js",
    "Material UI",
    "Shadcn UI",
    "Aceternity UI",
  ];

  // Filter playlists based on selected stack
  const filteredPlaylists = playlists.filter((playlist) => {
    if (selectedStack === "All") return true; // Show all playlists
    return playlist.title.toLowerCase().includes(selectedStack.toLowerCase()); // Match title with selected stack
  });

  return (
    <>
      <main className="flex flex-col items-start w-full h-[64.5rem]">
        <section className="flex items-center justify-between border-b dark:border-zinc-500 shadow-lg shadow-zinc-900/[0.2] pt-4 w-full">
          <h1 className="md:text-2xl text-xl text-pink-500 lg:text-3xl font-medium text-start relative px-5 h-12 w-1/2">
            Playlists
          </h1>
          <div className="flex items-center space-x-2 p-4 text-base font-light overflow-auto whitespace-nowrap w-full">
            {stacks.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedStack(item)}
                className={`px-7 leading-9 bg-white hover:bg-gradient-to-r from-rose-500 to-pink-700 text-black hover:text-white rounded-full hover:shadow-xl hover:scale-105 transition-transform ${
                  selectedStack === item
                    ? "bg-gradient-to-r from-rose-500 to-pink-700 text-white"
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
            <div className="flex flex-wrap items-start justify-start gap-5 py-10 p-7 w-full">
              {filteredPlaylists.length > 0 ? (
                filteredPlaylists.map((playlist) => (
                  <CardContainer key={playlist._id} className="inter-var">
                    <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-blue-100 rounded-xl mb-5 z-40 w-[25.4rem] h-full">
                      <CardItem translateZ={40} className="w-full">
                        <Image
                          src={
                            playlist.image
                              ? urlFor(playlist.image.asset).url()
                              : "/card.png"
                          }
                          height="1000"
                          width="1000"
                          className="h-60 w-full rounded-xl group-hover/card:shadow-xl"
                          alt={playlist.image?.caption || "thumbnail"}
                        />
                      </CardItem>
                      <div className="p-5">
                        <CardItem
                          translateZ={40}
                          className="text-lg font-medium text-black"
                        >
                          {playlist.title}
                        </CardItem>
                        <CardItem
                          as="p"
                          translateZ={40}
                          className="text-sm mt-2 text-zinc-800 font-light"
                        >
                          {playlist.description}
                        </CardItem>
                      </div>
                      <div className="flex items-center justify-between m-auto my-5 px-5 w-full">
                        <CardItem translateZ={40} className="w-full">
                          <div className="flex items-center justify-between text-sm font-light w-full">
                            <Link
                              href={playlist.playlistUrl || "#"}
                              target="_blank"
                              className="py-1 px-4 leading-6 hover:shadow-md rounded-full border border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white hover:scale-105 transition-transform"
                            >
                              Start Watching →
                            </Link>
                            <div className="flex items-center space-x-1 text-zinc-500 mr-3 leading-none text-sm py-1">
                              <FaRegEye className="w-4 h-4" />
                              <span>{playlist.views}K</span>
                            </div>
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

export default Playlists;

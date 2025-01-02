"use client";
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { FloatingDock } from "./ui/floating-dock";
import { FaArrowTurnDown } from "react-icons/fa6";
import { WavyBackground } from "./ui/wavy-background";
import Image from "next/image";
import { toast } from "react-toastify";

interface SocialMedia {
  _id: number;
  title: string;
  desc: string;
  img?: {
    asset: {
      _ref: string;
    };
  };
  UrlLink: string;
}

const SOCIALMEDIA_QUERY = `*[_type == "socialMedia"]`;

const SocialMedia = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const data: SocialMedia[] = await client.fetch(SOCIALMEDIA_QUERY);
        setSocialMedia(data);
      } catch (error) {
        toast.error("Error fetching social media data:" + error);
      }
    };

    fetchTutorials();
  }, []);

  const links = [
    {
      title: "GitHub",
      icon: (
        <Image
          src="/icons/github.png"
          alt="GitHub"
          className="rounded-xl"
          width={300}
          height={300}
        />
      ),
      href: "https://github.com/your-profile",
    },

    {
      title: "Instagram",
      icon: (
        <Image
          src="/icons/instagram.png"
          alt="Instagram"
          className="rounded-xl"
          width={300}
          height={300}
        />
      ),
      href: "https://instagram.com/your-profile",
    },
    {
      title: "Threads",
      icon: (
        <Image
          src="/icons/threads.png"
          alt="Threads"
          className="rounded-xl"
          width={300}
          height={300}
        />
      ),
      href: "https://threads.net/your-profile",
    },
    {
      title: "LinkedIn",
      icon: (
        <Image
          src="/icons/linkedin.png"
          alt="LinkedIn"
          className="rounded-xl"
          width={300}
          height={300}
        />
      ),
      href: "https://linkedin.com/in/your-profile",
    },
    {
      title: "X",
      icon: (
        <Image
          src="/icons/x.png"
          alt="X"
          className="rounded-xl"
          width={300}
          height={300}
        />
      ),
      href: "https://twitter.com/your-profile",
    },

    {
      title: "YouTube",
      icon: (
        <Image
          src="/icons/youtube.png"
          alt="YouTube"
          className="rounded-xl"
          width={300}
          height={300}
        />
      ),
      href: "https://youtube.com/your-channel",
    },
    {
      title: "Facebook",
      icon: (
        <Image
          src="/icons/facebook.png"
          alt="Facebook"
          className="rounded-xl"
          width={300}
          height={300}
        />
      ),
      href: "https://facebook.com/your-profile",
    },
    {
      title: "Telegram",
      icon: (
        <Image
          src="/icons/telegram.png"
          alt="Telegram"
          className="rounded-xl"
          width={300}
          height={300}
        />
      ),
      href: "https://t.me/your-channel",
    },
  ];

  return (
    <>
      <main
        id="socialMedia"
        className="flex flex-col items-center px-10 sm:px-20 w-full"
      >
        <section className="flex flex-col items-center justify-center text-center text-zinc-600 w-full max-w-[40rem] p-4 sm:p-6 lg:p-8 z-10">
          <p className="text-sm sm:text-lg md:text-xl">
            You can contact me on my following social media accounts and
            subscribe if you like my content
          </p>
          <p className="my-6 text-xs sm:text-sm text-blue-600">
            <span className="text-zinc-500">@mail :</span>{" "}
            vinugore2677@gmail.com
          </p>
          <p className="flex items-center justify-center p-3 px-3 sm:px-5 space-x-3 bg-black dark:bg-white text-white dark:text-black text-xs sm:text-sm md:text-base font-medium rounded-lg">
            <span>Contact, Follow & Subscribe</span>
            <FaArrowTurnDown />
          </p>
        </section>

        <section className="flex flex-wrap z-0">
          <div className="show-on-desktop w-full">
            <WavyBackground
              isDarkMode={isDarkMode}
              className="max-w-4xl mx-auto z-0"
            >
              <FloatingDock items={links} />
            </WavyBackground>
          </div>

          <div className="show-on-mobile items-center justify-center w-full">
            <WavyBackground
              isDarkMode={isDarkMode}
              className="z-0 w-full max-w-screen"
            >
              <ul className="grid grid-cols-4 gap-3 items-center w-60">
                {socialMedia.map((item) => (
                  <li key={item._id}>
                    {item.img?.asset?._ref ? (
                      <Link href={item.UrlLink}>
                        <Image
                          src={urlFor(item.img).url()}
                          alt={item.title || "Social media icon"}
                          className="rounded-lg w-14 h-14"
                          width={300}
                          height={300}
                        />
                      </Link>
                    ) : (
                      <span className="text-gray-500">Image not available</span>
                    )}
                  </li>
                ))}
              </ul>
            </WavyBackground>
          </div>
        </section>
      </main>
    </>
  );
};

export default SocialMedia;

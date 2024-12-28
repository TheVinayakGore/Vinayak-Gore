"use client";
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import Link from "next/link";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandThreads,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconBrandFacebook,
  IconBrandTelegram,
} from "@tabler/icons-react";
import { FaArrowTurnDown } from "react-icons/fa6";


interface SocialMedia {
  id: number;
  title: string;
  desc: string;
  img?: {
    asset: {
      _ref: string;
    };
  };
  icon: string;
  UrlLink: string;
  height: string;
  margin: string;
}

const SOCIALMEDIA_QUERY = `*[_type == "socialMedia"]`;

const SocialMedia = () => {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const data: SocialMedia[] = await client.fetch(SOCIALMEDIA_QUERY);
        setSocialMedia(data);
      } catch (error) {
        console.error("Error fetching social media data:", error);
        alert("Error fetching social media data. Check console for details.");
      }
    };

    fetchTutorials();
  }, []);

  const links = [
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/your-profile",
    },

    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://instagram.com/your-profile",
    },
    {
      title: "Threads",
      icon: (
        <IconBrandThreads className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://threads.net/your-profile",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://linkedin.com/in/your-profile",
    },
    {
      title: "X",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://twitter.com/your-profile",
    },

    {
      title: "YouTube",
      icon: (
        <IconBrandYoutube className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://youtube.com/your-channel",
    },
    {
      title: "Facebook",
      icon: (
        <IconBrandFacebook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://facebook.com/your-profile",
    },
    {
      title: "Telegram",
      icon: (
        <IconBrandTelegram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
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
        <section className="flex flex-col items-center justify-center text-center text-zinc-600 w-full max-w-[40rem] p-4 sm:p-6 lg:p-8">
          <p className="text-sm sm:text-lg md:text-xl">
            You can contact me on my following social media accounts and
            subscribe if you like my content
          </p>
          <p className="my-6 text-xs sm:text-sm text-blue-600 underline decoration-zinc-300 underline-offset-8">
            <span className="text-zinc-500">@mail :</span> vvgore2675@gmail.com
          </p>
          <p className="flex items-center justify-center p-3 px-3 sm:px-5 space-x-3 bg-black dark:bg-white text-white dark:text-black text-xs sm:text-sm md:text-base font-medium rounded-lg">
            <span>Contact, Follow & Subscribe</span>
            <FaArrowTurnDown />
          </p>
        </section>

        <div className="socialMedia border-dashed border-t border-zinc-700 mt-5 mb-[-1rem] w-10"></div>
        <div className="socialMedia border-dashed border-t border-l border-zinc-700 h-40 mb-[-2rem]"></div>
        <div className="socialMedia flex items-center justify-between m-auto border-dashed border-t border-zinc-700 mb-10 w-full">
          <ul className="flex items-center justify-between m-auto ml-[-0.7rem] w-full">
            {socialMedia.map((item, index) => {
              const imageUrl = item.img
                ? urlFor(item.img).url()
                : "/icons/youtube.png";
              return (
                <li key={item.id}>
                  <hr
                    className={`${item.height} w-0 ${item.margin} ml-14 border-dashed border-l border-zinc-700`}
                  />
                  <div className="ml-[1.3rem]">
                    <Link
                      href={item.UrlLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AnimatedTooltip
                        item={{
                          id: index,
                          name: item.title,
                          designation: item.desc,
                          image: imageUrl,
                        }}
                      />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="socialMediaSmallLink flex items-center justify-center h-[10rem] w-full">
          <FloatingDock items={links} />
        </div>
      </main>
    </>
  );
};

export default SocialMedia;

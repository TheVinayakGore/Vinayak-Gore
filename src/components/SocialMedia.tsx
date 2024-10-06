import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import Link from "next/link";

const SocialMedia = () => {

  const socialAccounts = [
    {
      id: 1,
      name: "GitHub",
      designation: "GitHub Profile",
      image: "/icons/github.png",
      link: "https://github.com/your-profile",
      hrHeight: "h-28",
      hrMargin: "mt-[-15rem]",
    },
    {
      id: 2,
      name: "Instagram",
      designation: "Instagram Profile",
      image: "/icons/instagram.png",
      link: "https://instagram.com/your-profile",
      hrHeight: "h-40",
      hrMargin: "mt-[-15rem]",
    },
    {
      id: 3,
      name: "Threads",
      designation: "Threads Profile",
      image: "/icons/threads.png",
      link: "https://threads.net/your-profile",
      hrHeight: "h-60",
      hrMargin: "mt-[-11rem]",
    },
    {
      id: 4,
      name: "LinkedIn",
      designation: "LinkedIn Profile",
      image: "/icons/linkedin.png",
      link: "https://linkedin.com/in/your-profile",
      hrHeight: "h-28",
      hrMargin: "mt-[-15rem]",
    },
    {
      id: 5,
      name: "Twitter",
      designation: "Twitter Profile",
      image: "/icons/twitter.png",
      link: "https://twitter.com/your-profile",
      hrHeight: "h-52",
      hrMargin: "mt-[-13rem]",
    },
    {
      id: 7,
      name: "YouTube",
      designation: "YouTube Channel",
      image: "/icons/youtube.png",
      link: "https://youtube.com/your-channel",
      hrHeight: "h-96",
      hrMargin: "mt-[-2rem]",
    },
    {
      id: 6,
      name: "Facebook",
      designation: "Facebook Profile",
      image: "/icons/facebook.png",
      link: "https://facebook.com/your-profile",
      hrHeight: "h-48",
      hrMargin: "mt-[-14rem]",
    },
    {
      id: 8,
      name: "Telegram",
      designation: "Telegram Channel",
      image: "/icons/telegram.png",
      link: "https://t.me/your-channel",
      hrHeight: "h-20",
      hrMargin: "mt-[-15rem]",
    },
  ];

  return (
    <>
      <div id="socialMedia" className="flex flex-col items-center px-20 w-full">
        <div className="flex flex-col items-center justify-center text-center text-zinc-600 w-[40rem]">
          <p className="text-xl">You can contact me on my following social media accounts and make subscribe if you like my content</p>
          <p className="my-10 text-xs text-blue-600">
            <span className="text-zinc-500">@mail :</span>{" "}
            vinu@vinayakgore.com
          </p>
          <p className="flex items-end justify-end p-3 px-5 space-x-3 bg-white text-zinc-800 text-base font-medium rounded-lg">
            <span>Contact, Follow & Subscribe on</span>
            <span>
              <i className="fa-solid fa-arrow-turn-down"></i>
            </span>
          </p>
        </div>

        <div className="border-dashed border-t border-zinc-700 mt-5 mb-[-1rem] w-10"></div>
        <div className="border-dashed border-t border-l border-zinc-700 h-40 mb-[-2rem]"></div>
        <div className="flex items-center justify-between m-auto border-dashed border-t border-zinc-700 mb-10 w-full">
          <ul className="flex items-center justify-between m-auto ml-[-0.7rem] w-full">
            {socialAccounts.map((account) => (
              <li key={account.id}>
                <hr
                  className={`${account.hrHeight} w-0 ${account.hrMargin} ml-14 border-dashed border-l border-zinc-700`}
                />
                <div className="ml-[1.3rem]">
                  <Link
                    href={account.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AnimatedTooltip item={account} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SocialMedia;

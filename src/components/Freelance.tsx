"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/app/hooks/use-outside-click";
import { Cover } from "./ui/cover";
import { GoPlus, GoDash } from "react-icons/go";

const Freelance = () => {
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const toggleParagraph = () => {
    setIsParagraphVisible((prevState) => !prevState);
  };

  return (
    <>
      <main
        id="freelance"
        className="border-t border-b border-zinc-300 dark:border-zinc-900 pt-20 px-10 xl:px-0 w-full"
      >
        <div className="flex flex-col items-center justify-center m-auto max-w-6xl w-full">
          <section className="w-full">
            <div>
              <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold mx-auto text-center mt-6 relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-zinc-500 via-black to-black dark:from-zinc-600 dark:via-white dark:to-white">
                Build amazing websites <br /> {"Let's"}{" "}
                <Cover>Code Together</Cover>
              </h1>
            </div>
            <div className="my-24 w-full">
              <AnimatePresence>
                {active && typeof active === "object" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-white/20 dark:bg-black/20 h-full w-full z-10"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {active && typeof active === "object" ? (
                  <div className="fixed inset-0 grid place-items-center z-[40]">
                    <motion.button
                      key={`button-${active.title}-${id}`}
                      layout
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: 0.05,
                        },
                      }}
                      className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                      onClick={() => setActive(null)}
                    >
                      <CloseIcon />
                    </motion.button>
                    <motion.div
                      layoutId={`card-${active.title}-${id}`}
                      ref={ref}
                      className="w-full max-w-xl h-[38rem] mt-14 flex flex-col bg-zinc-100 dark:bg-zinc-900 shadow-2xl shadow-zinc-400 dark:shadow-black rounded-xl"
                    >
                      <motion.div layoutId={`image-${active.title}-${id}`}>
                        <Image
                          priority
                          width={1000}
                          height={1000}
                          src={active.src}
                          alt={active.title}
                          className="w-full h-72 sm:rounded-t-xl"
                        />
                      </motion.div>

                      <div className="h-full overflow-auto">
                        <div className="flex justify-between items-start p-4">
                          <div className="">
                            <motion.h3
                              layoutId={`title-${active.title}-${id}`}
                              className="font-bold text-zinc-700 dark:text-zinc-100 text-2xl"
                            >
                              {active.title}
                            </motion.h3>
                            <motion.p
                              layoutId={`username-${active.username}-${id}`}
                              className="text-zinc-400 text-lg"
                            >
                              @{active.username}
                            </motion.p>
                          </div>

                          <motion.a
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            href={active.ctaLink}
                            target="_blank"
                            className="px-7 py-3 text-sm rounded-full font-bold bg-white hover:bg-green-500 text-black hover:text-white border-2 border-pink-500 hover:border-zinc-200 shadow-lg shadow-pink-700/[0.4] hover:shadow-green-700/[0.6] transition delay-100"
                          >
                            {active.ctaText}
                          </motion.a>
                        </div>
                        <div className="pt-4 relative px-4">
                          <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-zinc-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-zinc-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                          >
                            {typeof active.content === "function"
                              ? active.content()
                              : active.content}
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : null}
              </AnimatePresence>
              <ul className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 items-start gap-4">
                {cards.map((card) => (
                  <motion.div
                    layoutId={`card-${card.title}-${id}`}
                    key={card.title}
                    onClick={() => setActive(card)}
                    className="p-4 flex flex-col hover:bg-gradient-to-r from-pink-300 to-pink-500 rounded-xl cursor-pointer"
                  >
                    <div className="flex gap-4 flex-col w-full">
                      <motion.div layoutId={`image-${card.title}-${id}`}>
                        <Image
                          width={1500}
                          height={1500}
                          src={card.src}
                          alt={card.title}
                          className="h-72 lg:h-96 w-full shadow-2xl shadow-zinc-950/[0.4] rounded-lg"
                        />
                      </motion.div>
                      <div className="flex justify-center items-center flex-col">
                        <motion.h3
                          layoutId={`title-${card.title}-${id}`}
                          className="font-bold text-transparent/[0.8] dark:text-zinc-100 text-center md:text-left text-3xl"
                        >
                          {card.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`username-${card.username}-${id}`}
                          className="text-blue-600 text-center md:text-left text-base font-medium"
                        >
                          @{card.username}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </ul>
            </div>
          </section>
          <section className="flex items-start justify-start m-auto w-full h-72">
            <div className="flex flex-col items-start border border-zinc-500 dark:border-zinc-800 rounded-xl w-full">
              <div className="flex items-center justify-between m-auto p-3 sm:p-5 w-full">
                <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl">
                  Why Choose me ?
                </h1>
                <button
                  onClick={toggleParagraph}
                  className={`${
                    isParagraphVisible
                      ? "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 p-2"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-900 active:bg-zinc-200 dark:active:bg-zinc-800"
                  } hover:text-black dark:hover:text-white p-2 rounded-full`}
                >
                  {isParagraphVisible ? (
                    <GoDash className="text-black dark:text-white w-3 h-3 sm:w-6 sm:h-6" />
                  ) : (
                    <GoPlus className="w-3 h-3 sm:w-6 sm:h-6" />
                  )}
                </button>
              </div>
              {isParagraphVisible && (
                <p className="font-extralight text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-5 pb-3">
                  As a passionate and innovative web developer, I bring a blend
                  of creativity and technical expertise to each project. With a
                  solid foundation in HTML, CSS, JavaScript, React, and Next.js,
                  I create modern, responsive websites that not only look
                  stunning but also perform seamlessly. My attention to detail,
                  dedication to delivering clean, scalable code, and commitment
                  to staying updated with the latest industry trends set me
                  apart. Whether you need a visually appealing interface or a
                  robust full-stack solution, I am here to turn your vision into
                  reality—on time and beyond expectations.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Freelance;

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    title: "Upwork",
    username: "Vinayak.G",
    src: "/upwork.png",
    ctaText: "Visit Profile",
    ctaLink: "https://www.upwork.com/freelancers/~011d4c26a288037333",
    content: () => {
      return (
        <div>
          <p>
            ^__^ I&apos;m a skilled Web Developer specializing in React, Next.js,
            and the MERN stack. I create responsive, user-friendly websites
            using modern tools like Tailwind CSS and Shadcn UI, with a strong
            focus on intuitive frontend UI design. My experience includes
            delivering 5 full-stack projects with dynamic data handling powered
            by MongoDB and Sanity.
          </p>
          <p className="my-4"># Here is what I can help you with :</p>
          <ul className="flex flex-col gap-2 my-4">
            <li>● Building responsive websites or single-page applications</li>
            <li>
              ● Designing and developing intuitive UIs for impactful user
              experiences
            </li>
            <li>
              ● Creating and managing dynamic backend solutions using MongoDB
              and Express
            </li>
            <li>
              ● Collaborating using Git for seamless development workflows
            </li>
          </ul>
          <p className="my-4">
            Whether you need a polished portfolio website, an online store, or a
            custom web application, I&apos;m here to bring your ideas to life. I
            believe in clear communication and delivering quality work on time,
            so let&apos;s discuss how I can help with your project !
          </p>
        </div>
      );
    },
  },
  {
    title: "Glassdoor",
    username: "Vinayak Gore",
    src: "/glassdoor.png",
    ctaText: "Visit Profile",
    ctaLink: "https://www.glassdoor.co.uk/member/profile",
    content: () => {
      return (
        <div>
          <p>
            ^__^ I&apos;m a skilled Web Developer specializing in React, Next.js,
            and the MERN stack. I create responsive, user-friendly websites
            using modern tools like Tailwind CSS and Shadcn UI, with a strong
            focus on intuitive frontend UI design. My experience includes
            delivering 5 full-stack projects with dynamic data handling powered
            by MongoDB and Sanity.
          </p>
          <p className="my-4"># Here is what I can help you with :</p>
          <ul className="flex flex-col gap-2 my-4">
            <li>● Building responsive websites or single-page applications</li>
            <li>
              ● Designing and developing intuitive UIs for impactful user
              experiences
            </li>
            <li>
              ● Creating and managing dynamic backend solutions using MongoDB
              and Express
            </li>
            <li>
              ● Collaborating using Git for seamless development workflows
            </li>
          </ul>
          <p className="my-4">
            Whether you need a polished portfolio website, an online store, or a
            custom web application, I&apos;m here to bring your ideas to life. I
            believe in clear communication and delivering quality work on time,
            so let&apos;s discuss how I can help with your project !
          </p>
        </div>
      );
    },
  },
];

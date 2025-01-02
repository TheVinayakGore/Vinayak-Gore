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
        className="border-b border-zinc-300 dark:border-zinc-900 w-full"
      >
        <div className="flex flex-col items-center justify-center m-auto max-w-7xl w-full">
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
                <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl">Why Choose me ?</h1>
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
                  As a passionate and innovative web developer, I bring a blend of
                  creativity and technical expertise to each project. With a solid
                  foundation in HTML, CSS, JavaScript, React, and Next.js, I
                  create modern, responsive websites that not only look stunning
                  but also perform seamlessly. My attention to detail, dedication
                  to delivering clean, scalable code, and commitment to staying
                  updated with the latest industry trends set me apart. Whether
                  you need a visually appealing interface or a robust full-stack
                  solution, I am here to turn your vision into reality—on time and
                  beyond expectations.
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
    title: "Glassdoor",
    username: "vinu_glassdoor",
    src: "/icons/glassdoor.jpeg",
    ctaText: "Visit Profile",
    ctaLink: "https://www.glassdoor.com",
    content: () => {
      return (
        <p>
          I am offering top-notch web development, frontend development, and UI
          design services through Glassdoor. With extensive experience in
          building high-performing, responsive websites and user-centric
          designs, I can help bring your next project to life. My skills in{" "}
          <strong>
            HTML, CSS, JavaScript, React, Next.js, Bootstrap, Tailwind CSS,
            Shadcn UI, Material UI, MERN, TypeScript, Vite, Sanity
          </strong>
          , and version control with GitHub ensure the highest quality work.{" "}
          <br /> <br />
          Let&apos;s collaborate and make your vision a reality. If you are
          looking for someone reliable and skilled for your next project, feel
          free to reach out. I am excited to work with you and contribute to
          your success.
        </p>
      );
    },
  },
  {
    title: "Fiverr",
    username: "vinu_fiverr",
    src: "/icons/fiverr.png",
    ctaText: "Visit Profile",
    ctaLink: "https://www.fiverr.com",
    content: () => {
      return (
        <p>
          On Fiverr, I specialize in offering web development and UI design
          services that meet modern standards and ensure client satisfaction.
          Whether you are starting a new project or upgrading an existing one,
          my skill set—
          <strong>
            HTML, CSS, JavaScript, React, Next.js, Bootstrap, Tailwind CSS,
            Shadcn UI, Material UI, MERN, TypeScript, Vite, and Sanity
          </strong>
          —will help you achieve the best results. <br /> <br />
          Give me the opportunity to work on your next project, and I promise to
          deliver quality work on time. Let&apos;s build something amazing
          together!
        </p>
      );
    },
  },
  {
    title: "Upwork",
    username: "vinu_upwork",
    src: "/icons/upwork.png",
    ctaText: "Visit Profile",
    ctaLink: "https://www.upwork.com",
    content: () => {
      return (
        <p>
          Looking for a dedicated freelancer for your web development or
          frontend development needs? On Upwork, I offer comprehensive services
          to create seamless and responsive web experiences. My expertise in{" "}
          <strong>
            HTML, CSS, JavaScript, React, Next.js, Bootstrap, Tailwind CSS,
            Shadcn UI, Material UI, MERN, TypeScript, Vite, and Sanity
          </strong>{" "}
          ensures that your project will stand out and perform well across all
          devices. <br /> <br />
          Let&apos;s work together on your next project—whether it is building a
          brand new site or enhancing an existing one. I am committed to
          delivering results that exceed expectations.
        </p>
      );
    },
  },
  {
    title: "99Design",
    username: "vinu_99design",
    src: "/icons/99design.png",
    ctaText: "Visit Profile",
    ctaLink: "https://www.99designs.com",
    content: () => {
      return (
        <p>
          On 99Design, I offer cutting-edge UI design and frontend development
          services to bring your vision to life. If you are looking for a
          creative, efficient, and reliable developer who understands the
          importance of design in creating a great user experience, you have
          come to the right place. With proficiency in{" "}
          <strong>
            HTML, CSS, JavaScript, React, Next.js, Bootstrap, Tailwind CSS,
            Shadcn UI, Material UI, MERN, TypeScript, Vite, and Sanity
          </strong>
          , I ensure that your designs are not only visually appealing but also
          functional and responsive. <br /> <br />
          Let me take your project to the next love to collaborate with you on
          your next big idea.
        </p>
      );
    },
  },
];

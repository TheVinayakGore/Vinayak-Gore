import React from "react";
import { cn } from "@/lib/utils";
import { IoLogoJavascript } from "react-icons/io";
import { RiReactjsLine } from "react-icons/ri";
import { SiNextdotjs } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { IoIosGitBranch } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiMui } from "react-icons/si";
import { SiShadcnui } from "react-icons/si";
import { BsBootstrapFill } from "react-icons/bs";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiVite } from "react-icons/si";
import { SiSanity } from "react-icons/si";
import { SiCplusplus } from "react-icons/si";

const TechStacks = () => {
  const features = [
    {
      title: "Javascript",
      description: "Versatile language for web development and scripting.",
      icon: <IoLogoJavascript className="w-7 h-7" />,
    },
    {
      title: "Typescript",
      description: "Typed superset of JavaScript for scalable applications.",
      icon: <SiTypescript className="w-7 h-7" />,
    },
    {
      title: "Bootstrap",
      description: "Popular CSS framework for responsive web design.",
      icon: <BsBootstrapFill className="w-7 h-7" />,
    },
    {
      title: "Tailwind CSS",
      description: "Utility-first CSS framework for custom designs.",
      icon: <RiTailwindCssFill className="w-7 h-7" />,
    },
    {
      title: "Node.js",
      description: "JavaScript runtime for building server-side applications.",
      icon: <FaNodeJs className="w-7 h-7" />,
    },
    {
      title: "Express.js",
      description:
        "Minimalist framework for building web applications in Node.",
      icon: <SiExpress className="w-7 h-7" />,
    },
    {
      title: "React.Js",
      description: "Library for building interactive user interfaces.",
      icon: <RiReactjsLine className="w-7 h-7" />,
    },
    {
      title: "Next.Js",
      description:
        "React framework for server-side rendering and static sites.",
      icon: <SiNextdotjs className="w-7 h-7" />,
    },
    {
      title: "Vite",
      description: "Fast build tool for modern web applications.",
      icon: <SiVite className="w-7 h-7" />,
    },
    {
      title: "Material UI",
      description: "React components implementing Google's Material Design.",
      icon: <SiMui className="w-7 h-7" />,
    },
    {
      title: "Shadcn UI",
      description: "Dark-themed UI components for modern web apps.",
      icon: <SiShadcnui className="w-7 h-7" />,
    },
    {
      title: "Mongo DB",
      description: "NoSQL database for scalable and flexible data storage.",
      icon: <SiMongodb className="w-7 h-7" />,
    },
    {
      title: "Version Control",
      description: "Track changes in code with Git and GitHub.",
      icon: <IoIosGitBranch className="w-7 h-7" />,
    },
    {
      title: "C++",
      description:
        "General-purpose programming language for performance-critical applications.",
      icon: <SiCplusplus className="w-7 h-7" />,
    },
    {
      title: "Sanity",
      description: "Headless CMS for structured content management.",
      icon: <SiSanity className="w-7 h-7" />,
    },
  ];

  return (
    <>
      <div
        id="techStacks"
        className="flex flex-col items-center justify-center m-auto space-y-10 w-full"
      >
        <div className="w-full">
          <h1 className="md:text-4xl text-2xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-black to-zinc-400 dark:from-zinc-50 dark:to-zinc-600 font-semibold text-center relative z-20 h-14">
            Tech Stacks
          </h1>
          <p className="text-center tracking-widest text-zinc-500 text-xs sm:text-sm md:text-lg">
            Development Tech Stacks for creating Modern Projects
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 relative z-10 py-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TechStacks;

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-5 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 5 || index === 10) &&
          "lg:border-l dark:border-neutral-800",
        index < 10 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 5 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 5 && index < 10 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 10 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

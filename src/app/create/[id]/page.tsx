"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { BiLogoYoutube } from "react-icons/bi";
import LoadingBar from "@/components/LoadingBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { GoPaste } from "react-icons/go";
import { MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Tutorial {
  _id: string;
  tuttitle: string;
  tutstack: string[];
  tutshortdesc: string;
  tutimage?: {
    asset: {
      _ref: string;
    };
  };
  content: any[];
  date: string;
  tutorialYTUrl: string | null;
}

interface TutorialPageProps {
  params: { id: string }; // Directly define `params` as an object
}

export default function TutorialPage({ params }: TutorialPageProps) {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const id = params.id; // Directly access `params.id`

    if (!id) {
      console.error("No ID provided in params");
      router.push("/404");
      return;
    }

    const fetchTutorial = async () => {
      try {
        const fetchedTutorial = await client.fetch(
          `*[_type == "tutorials" && _id == $id][0]`,
          { id }
        );
        if (!fetchedTutorial) {
          router.push("/404");
          return;
        }
        setTutorial(fetchedTutorial);
      } catch (error) {
        console.error("Failed to fetch tutorial:", error);
        toast.error("Failed to load tutorial", { autoClose: 2000 });
      } finally {
        setLoading(false);
      }
    };

    fetchTutorial();
  }, [params.id, router]);

  useEffect(() => {
    document.body.classList.add("dark"); // Apply dark mode class to body
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchTutorial = async () => {
      try {
        const fetchedTutorial = await client.fetch(
          `*[_type == "tutorials" && _id == $id][0]`,
          { id }
        );
        if (!fetchedTutorial) {
          router.push("/404");
          return;
        }
        setTutorial(fetchedTutorial);
      } catch (error) {
        console.error("Failed to fetch tutorial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorial();
  }, [id, router]);

  if (loading) {
    return (
      <div>
        <LoadingBar loading={loading} />
        {loading && <LoadingSpinner />}
      </div>
    );
  }

  if (!tutorial) {
    return toast.error("Tutorial not found", { autoClose: 2000 });
  }

  const CodeBlock = ({
    value,
  }: {
    value: { language: string; code: string };
  }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(value.code);
      setIsCopied(true);
      toast.success("Copied Successfully!", { autoClose: 2000 });
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };

    return (
      <div className="hover:shadow-xl rounded-lg my-2 w-full">
        <div className="flex items-center justify-between bg-[#1d1d1d] rounded-t-lg text-base px-4 py-2 font-medium">
          <div className="flex space-x-1">
            <span className="bg-red-500 rounded-full w-3 h-3"></span>
            <span className="bg-yellow-500 rounded-full w-3 h-3"></span>
            <span className="bg-green-500 rounded-full w-3 h-3"></span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center text-sm font-light space-x-2 pb-1 ${
              isCopied ? "text-blue-600" : ""
            }`}
          >
            <span>
              <i
                className={
                  isCopied ? "fa-solid fa-check" : "fa-regular fa-clipboard"
                }
              ></i>
            </span>
            <span>{isCopied ? <MdDone /> : <GoPaste />}</span>
            <span>{isCopied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
        <SyntaxHighlighter
          language={value.language}
          style={atomOneDark}
          customStyle={{
            padding: "1.5rem",
            borderRadius: "0 0 0.5rem 0.5rem",
            background: "#0f0f0f",
          }}
          wrapLongLines={true}
          className="text-sm font-light"
        >
          {value.code}
        </SyntaxHighlighter>
      </div>
    );
  };

  const components = {
    types: {
      image: ({ value }: any) => (
        <Image
          src={urlFor(value.asset).url()}
          alt={value.caption || "Blog image"}
          width={1500}
          height={500}
          priority
          className="border border-zinc-800 rounded-lg my-2 w-full h-full"
        />
      ),
      code: CodeBlock,
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-4xl font-medium text-zinc-200 my-2 mt-5">
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-3xl font-medium text-zinc-200 my-2 mt-10">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl font-medium text-zinc-200 my-2 mt-10">
          {children}
        </h3>
      ),
      h5: ({ children }: any) => (
        <h5 className="text-xl font-medium text-zinc-200 my-2">{children}</h5>
      ),
      normal: ({ children }: any) => (
        <p className="text-zinc-400 leading-relaxed mb-2">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc pl-5 text-blue-400 my-2">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal pl-5 text-zinc-400 my-2">{children}</ol>
      ),
      square: ({ children }: any) => (
        <ul className="list-square pl-5 text-purple-500 my-2">{children}</ul>
      ),
      circle: ({ children }: any) => (
        <ul className="list-circle pl-5 text-green-400 my-2">{children}</ul>
      ),

      alpha: ({ children }: any) => (
        <ol className="list-[lower-alpha] pl-5 text-pink-400 my-2">
          {children}
        </ol>
      ),
      roman: ({ children }: any) => (
        <ol className="list-[upper-roman] pl-5 text-red-400 my-2">
          {children}
        </ol>
      ),
    },
    marks: {
      link: ({ children, value }: any) => {
        const target = value.href.startsWith("http") ? "_blank" : undefined;
        return (
          <Link
            href={value.href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className="text-blue-600 underline underline-offset-4 decoration-1 hover:text-green-500"
          >
            {children}
          </Link>
        );
      },
    },
  };

  return (
    <>
      <title>{`${tutorial.tuttitle} | Tutorial`}</title>
      <main className="flex flex-col items-start pt-14 px-52 overflow-auto w-full">
        <div className="flex items-end justify-between mb-5 pb-3 border-b border-zinc-600 w-full">
          <div className="flex flex-col items-start border-l-4 border-zinc-400 rounded-l-[0.3rem] pl-5 w-full">
            <p className="text-3xl font-semibold text-zinc-300 mb-1">
              {tutorial.tuttitle}
            </p>
            <p className="text-start text-sm text-zinc-600 font-light mb-3 w-full">
              {tutorial.date
                ? format(new Date(tutorial.date), "MMM dd, yyyy")
                : "No Date"}
            </p>
            <div className="flex items-center space-x-1">
              {tutorial.tutstack?.map((stack, index) => (
                <span
                  key={index}
                  className="p-1 px-2 leading-4 border border-zinc-500 rounded text-xs mb-1 font-light text-zinc-500 w-max"
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="relative flex justify-center items-center w-full">
          {tutorial.tutimage && (
            <Image
              src={urlFor(tutorial.tutimage.asset._ref).url()}
              alt="Tutorial"
              width={1500}
              height={1500}
              className="border border-zinc-800 rounded-lg w-full h-auto"
            />
          )}
          <div className="absolute flex justify-center items-center z-10 rounded-lg w-full h-full">
            {tutorial.tutorialYTUrl ? (
              <Link
                href={tutorial.tutorialYTUrl}
                target="_blank"
                className="bg-white rounded-full text-red-600 shadow-xl shadow-black/[0.5] hover:scale-105 transition-transform w-20 h-20"
              >
                <BiLogoYoutube className="p-2 w-full h-full" />
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start py-5 mb-10 border-dashed border-b border-zinc-700 w-full">
          <p className="text-base font-mono text-zinc-500 leading-relaxed">
            <span className="text-lg text-zinc-300 font-semibold">
              Summary :
            </span>{" "}
            {tutorial.tutshortdesc}
          </p>
        </div>
        <PortableText value={tutorial.content} components={components} />
      </main>
    </>
  );
}

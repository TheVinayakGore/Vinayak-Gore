"use client";
import React, { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { format } from "date-fns";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { GoPaste } from "react-icons/go";
import { MdDone } from "react-icons/md";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoadingBar from "@/components/LoadingBar";
import Link from "next/link";

interface PortfolioBlog {
  title: string;
  date: string;
  desc: string;
  coverImage?: {
    asset: {
      _ref: string;
    };
    caption?: string;
  };
  content: any;
}

const PortfolioBlog = () => {
  const [blogData, setBlogData] = useState<PortfolioBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("dark"); // Apply dark mode class to body
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      const query = `*[_type == "portfolioblog"] | order(date desc)[0]`;
      const data = await client.fetch(query);
      setBlogData(data);
      setLoading(false); // Set loading to false after fetching
    };

    fetchData();
  }, []);

  const CodeBlock = ({
    value,
  }: {
    value: { language: string; code: string };
  }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(value.code);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };

    return (
      <div className="hover:shadow-xl shadow-pink-400 rounded-lg w-full">
        <div className="flex items-center justify-between bg-[#1d1d1d] rounded-t-lg text-base px-4 py-2 font-medium">
          <div className="flex space-x-2">
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
            <span>{isCopied ? <MdDone /> : <GoPaste />}</span>
            <span>{isCopied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
        <SyntaxHighlighter
          language={value.language || "javascript"}
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <LoadingBar loading={loading} />
        {loading && <LoadingSpinner />}
      </div>
    );
  }

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
        <h1 className="text-4xl font-medium text-zinc-200 my-2">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-3xl font-medium text-zinc-200 my-2">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl font-medium text-zinc-200 my-2">{children}</h3>
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
            className="text-blue-600 hover:text-green-500"
          >
            {children}
          </Link>
        );
      },
    },
  };

  if (!blogData) {
    return <div className="pt-32">{loading && <LoadingSpinner />}</div>;
  }

  return (
    <>
      <title>{`${blogData.title} | Blog | Vinayak Gore`}</title>
      <LoadingBar loading={loading} />
      <main className="flex flex-col items-center justify-center m-auto sticky top-0 max-w-4xl">
        <div className="font-light py-14 w-full">
          <section className="flex flex-col items-start space-y-10 w-full">
            <div className="w-full">
              <div className="flex items-end justify-between mb-5 pb-5 border-b border-zinc-700 w-full">
                <div className="flex flex-col items-start space-y-1">
                  <h1 className="text-4xl font-semibold text-black dark:text-white">
                    {blogData.title}
                  </h1>
                  <p className="text-sm text-zinc-500">
                    {blogData.date
                      ? format(new Date(blogData.date), "MMM dd, yyyy")
                      : "No Date"}
                  </p>
                </div>
              </div>
              <div className="flex">
                {blogData.coverImage && (
                  <Image
                    src={urlFor(blogData.coverImage.asset).url()}
                    alt={blogData.coverImage.caption || "Website Image"}
                    className="border border-zinc-800 rounded-lg my-2 w-full h-full"
                    width={1500}
                    height={1000}
                    priority
                  />
                )}
              </div>
              <div className="flex flex-col text-zinc-400 w-full">
                <PortableText
                  value={blogData.content}
                  components={components}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default PortfolioBlog;

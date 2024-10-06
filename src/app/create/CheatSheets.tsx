"use client";
import React, { useState, useEffect, useCallback } from "react";
import CodeSnippet from "./CodeSnippet";
import { getCodeSnippets as getHTMLSnippets } from "./SheetsData/HTMLData";
import { getCodeSnippets as getCSSSnippets } from "./SheetsData/CSSData";
import { getCodeSnippets as getJSSnippets } from "./SheetsData/JSData";
import { getCodeSnippets as getPythonSnippets } from "./SheetsData/PythonData";
import { getCodeSnippets as getCSnippets } from "./SheetsData/CData";
import { getCodeSnippets as getCPPSnippets } from "./SheetsData/CPPData";
import Image from "next/image";

const CheatSheets: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("HTML");
  const [snippets, setSnippets] = useState<any[]>([]);

  const fetchSnippets = useCallback(async () => {
    let data;
    switch (selectedCategory) {
      case "HTML":
        data = await getHTMLSnippets();
        break;
      case "CSS":
        data = await getCSSSnippets();
        break;
      case "JAVASCRIPT":
        data = await getJSSnippets();
        break;
      case "PYTHON":
        data = await getPythonSnippets();
        break;
      case "C":
        data = await getCSnippets();
        break;
      case "C++":
        data = await getCPPSnippets();
        break;
      default:
        data = await getHTMLSnippets();
    }
    setSnippets(data);
  }, [selectedCategory]);

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  const sheets = ["HTML", "CSS", "JAVASCRIPT", "PYTHON", "C", "C++"];

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center justify-between border-b shadow-lg shadow-zinc-900/[0.2] pt-4 w-full">
          <h1 className="md:text-2xl text-xl lg:text-3xl font-medium text-start relative px-5 h-12 w-1/2">
            CheatSheets
          </h1>
          <div className="flex items-center justify-end space-x-2 p-4 text-base font-light overflow-auto whitespace-nowrap w-full">
            {sheets.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedCategory(item)}
                className={`px-7 leading-9 rounded-full hover:shadow-xl ${
                  selectedCategory === item
                    ? "bg-gradient-to-r from-yellow-400 to-amber-600 text-white"
                    : "bg-white hover:bg-gradient-to-r from-yellow-400 to-amber-600 text-black hover:text-white hover:scale-105 transition-transform"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center overflow-auto w-full h-full">
          <ul className="flex flex-col px-10 w-full h-full">
            {snippets.length > 0 ? (
              snippets.map((snippet, index) => (
                <li
                  key={index}
                  className="space-y-5 py-10 border-dashed border-b border-purple-500"
                >
                  <div className="flex flex-col space-y-2 w-full">
                    <span className="text-xl font-medium text-white leading-5">
                      {snippet.title}
                    </span>
                    <p className="text-sm font-light text-zinc-300">
                      {snippet.description}
                    </p>
                  </div>
                  <CodeSnippet codeString={snippet.codeString} />
                </li>
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
          </ul>
        </div>
      </div>
    </>
  );
};

export default CheatSheets;

"use client";
import React, { useState, useEffect, useCallback } from "react";
import CodeSnippet from "./CodeSnippet";
import { getCodeSnippets as getHTMLSnippets } from "./SheetsData/HTMLData";
import { getCodeSnippets as getCSSSnippets } from "./SheetsData/CSSData";
import { getCodeSnippets as getJSSnippets } from "./SheetsData/JSData";
import { getCodeSnippets as getPythonSnippets } from "./SheetsData/PythonData";
import { getCodeSnippets as getCSnippets } from "./SheetsData/CData";
import { getCodeSnippets as getCPPSnippets } from "./SheetsData/CPPData";
import { IoSearch } from "react-icons/io5";

const CheatSheets: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("HTML");
  const [snippets, setSnippets] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

    // Sort snippets alphabetically by title
    if (data && Array.isArray(data)) {
      data.sort((a, b) => a.title.localeCompare(b.title));
    }

    setSnippets(data);
  }, [selectedCategory]);

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sheets = ["HTML", "CSS", "JAVASCRIPT", "PYTHON", "C", "C++"];

  return (
    <>
      <main className="flex flex-col w-full h-full">
        <section className="flex items-center justify-between border-b dark:border-zinc-500 shadow-lg shadow-zinc-900/[0.2] pt-4 w-full">
          <h1 className="md:text-2xl text-xl text-green-500 lg:text-3xl font-medium text-start relative px-5 h-12 w-1/4">
            CheatSheets
          </h1>
          <div className="flex items-center justify-end space-x-2 p-4 text-base font-light overflow-auto whitespace-nowrap w-full">
            <div className="relative transform transition-transform hover:scale-105">
              <input
                type="text"
                id="searchInput"
                className="w-80 leading-9 pl-4 pr-10 bg-transparent/[0.05] backdrop-blur-sm rounded-full shadow-lg placeholder:text-zinc-700 dark:placeholder:text-zinc-300 focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="Search here for code snippets.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
              <button
                className="absolute top-1/2 right-[1px] -translate-y-1/2 p-2 cursor-pointer rounded-full bg-white text-black"
                onClick={() => console.log("Search button clicked")}
              >
                <IoSearch className="w-5 h-5" />
              </button>
            </div>
            {sheets.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedCategory(item)}
                className={`px-7 leading-9 rounded-full hover:shadow-xl ${
                  selectedCategory === item
                    ? "bg-gradient-to-r from-teal-400 to-green-600 text-white"
                    : "bg-black/[0.07] dark:bg-white/[0.2] dark:text-white hover:bg-gradient-to-r from-teal-400 to-green-600 text-black hover:text-white hover:scale-105 transition-transform"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>
        <section className="flex items-center overflow-auto w-full h-full">
          <ul className="flex flex-col px-10 w-full h-full">
            {filteredSnippets.length > 0 ? (
              filteredSnippets.map((snippet, index) => (
                <li
                  key={index}
                  className="space-y-5 py-10 border-dashed border-b border-zinc-500"
                >
                  <div className="flex flex-col space-y-2 w-full">
                    <span className="text-xl font-medium leading-5">
                      {snippet.title}
                    </span>
                    <p className="text-sm font-light">
                      {snippet.description}
                    </p>
                  </div>
                  <CodeSnippet codeString={snippet.codeString} />
                </li>
              ))
            ) : (
              <p className="text-lg font-mono opacity-50 pt-10">
                # No such code snippet is available !
              </p>
            )}
          </ul>
        </section>
      </main>
    </>
  );
};

export default CheatSheets;

import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { GoPaste } from "react-icons/go";
import { MdDone } from "react-icons/md";
import { toast } from "react-toastify";

interface CodeSnippetProps {
  codeString: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ codeString }) => {
  const [copy, setCopy] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopy(true);
    toast.success("Copied Successfully!", { autoClose: 2000 });
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  return (
    <div className="bg-[#1d1d1d] hover:shadow-xl rounded-lg w-full">
      <div className="flex items-center justify-between text-base px-4 py-2 font-medium">
        <div className="flex space-x-1">
          <span className="bg-red-500 rounded-full w-3 h-3"></span>
          <span className="bg-yellow-500 rounded-full w-3 h-3"></span>
          <span className="bg-green-500 rounded-full w-3 h-3"></span>
        </div>
        {copy ? (
          <button
            type="button"
            className="flex items-center text-sm font-light text-blue-600 space-x-2 pb-1"
          >
            <MdDone />
            <span>Copied!</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center text-sm font-light text-white space-x-2 pb-1"
          >
            <GoPaste />
            <span>Copy</span>
          </button>
        )}
      </div>
      <div className="overflow-x-auto w-full">
        <SyntaxHighlighter
          language="html"
          style={atomOneDark}
          customStyle={{
            padding: "1.5rem",
            borderRadius: "0 0 0.5rem 0.5rem",
            background: "#0f0f0f",
          }}
          wrapLongLines={true}
          className="text-xs sm:text-sm font-light"
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeSnippet;

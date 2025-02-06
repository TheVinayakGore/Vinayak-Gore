import React from "react";
import Link from "next/link";
import Image from "next/image";

const PageNotFoundError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          404
        </h1>
        <p className="text-2xl font-semibold text-gray-800 mt-4">
          Oops! Page Not Found
        </p>
        <p className="text-lg text-gray-600 mt-2">
          The page you are looking for doesn not exist or has been moved.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/">
          <a className="px-6 py-3 font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 transition-transform duration-300">
            Back to Home
          </a>
        </Link>
      </div>
      <div className="mt-12">
        <Image
          src="/404-illustration.svg"
          alt="Page Not Found Illustration"
          width={300}
          height={300}
          className="w-64 h-auto"
        />
      </div>
    </div>
  );
};

export default PageNotFoundError;

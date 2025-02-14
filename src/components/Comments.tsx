"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook

interface Comment {
  _id: string;
  name: string;
  comment: string;
  stars: number;
}

const Comments = () => {
  const { user } = useUser(); // Use Clerk's useUser hook
  const [comments, setComments] = useState<Comment[]>([]);

  // Fetch comments from localStorage
  const fetchCommentsFromStorage = () => {
    const storedFeedbacks = JSON.parse(
      localStorage.getItem("feedbacks") || "[]"
    );
    return storedFeedbacks;
  };

  useEffect(() => {
    // Fetch comments from local storage on component mount
    const feedbacksFromStorage = fetchCommentsFromStorage();
    setComments(feedbacksFromStorage);
  }, []);

  const createInfiniteLoop = (items: Comment[], duration: number) => {
    const repeatedItems = [...items];
    return (
      <motion.div
        className="flex flex-col space-y-6"
        initial={{ y: 0 }}
        animate={{ y: -repeatedItems.length * 100 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
        }}
      >
        {repeatedItems.map((comment, index) => (
          <div
            key={`${comment._id}-${index}`}
            className="text-zinc-100 bg-zinc-900 p-4 rounded-lg border border-zinc-700 shadow-md"
          >
            <div className="flex items-center space-x-2 w-full">
              <Image
                src={user?.imageUrl || "/user.png"} // Use Clerk's user image
                alt="user"
                className="rounded-full w-12 h-12"
                width={500}
                height={500}
              />
              <div className="flex flex-col items-start">
                <p className="font-semibold text-lg leading-7">
                  {comment.name}
                </p>
                <p className="font-light text-xs text-zinc-300">
                  @{comment.name}
                </p>
              </div>
            </div>
            <p className="text-base m-3 mb-0">{comment.comment}</p>
            {comment.stars > 0 ? (
              <div className="flex items-center text-sm space-x-1 p-2">
                <span className="text-zinc-400">ratings : </span>
                {Array.from({ length: comment.stars }, (_, index) => (
                  <span key={index} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </motion.div>
    );
  };

  // Divide comments into 3 unique sets
  const chunkSize = Math.ceil(comments.length / 3);
  const column1 = comments.slice(0, chunkSize);
  const column2 = comments.slice(chunkSize, chunkSize * 2);
  const column3 = comments.slice(chunkSize * 2);

  return (
    <>
      {comments.length > 30 ? (
        <div className="my-10 px-36 w-full h-[40rem] relative">
          <div className="absolute inset-0 z-30">
            <div className="absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black to-transparent"></div>
          </div>
          <div className="relative z-10 w-full h-full overflow-hidden">
            <div className="grid grid-cols-3 gap-6 h-full">
              {/* Column 1 */}
              <div className="relative h-full overflow-hidden">
                {createInfiniteLoop(column1, 50)}
              </div>
              {/* Column 2 */}
              <div className="relative h-full overflow-hidden">
                {createInfiniteLoop(column2, 70)}
              </div>
              {/* Column 3 */}
              <div className="relative h-full overflow-hidden">
                {createInfiniteLoop(column3, 50)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>{""}</div>
      )}
    </>
  );
};

export default Comments;
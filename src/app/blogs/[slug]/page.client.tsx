"use client";
import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { format } from "date-fns";
import { PortableText } from "@portabletext/react";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { LiaCommentSolid } from "react-icons/lia";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { TfiControlBackward, TfiControlForward } from "react-icons/tfi";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoadingBar from "@/components/LoadingBar";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { GoPaste } from "react-icons/go";
import { MdDone } from "react-icons/md";
import CommentModal from "./CommentForm";
import { ShareDialog } from "./ShareDialog";
import { toast } from "react-toastify";
import Tooltip from "@/components/Tooltip";
import Cookies from "js-cookie"; // Import js-cookie

interface Blog {
  _id: string;
  title: string;
  desc: string;
  date: string;
  content: any[];
  slug: {
    current: string;
  };
  previousPost?: { slug: { current: string } };
  nextPost?: { slug: { current: string } };
  starCount: number;
  likeCount: number;
  likedBy: string[]; // Array of user identifiers who liked the post
  starredBy: string[]; // Array of user identifiers who starred the post
}

interface Comment {
  username: string;
  message: string;
  date: string;
}

interface Props {
  params: {
    slug: string;
  };
}

const BlogPage = ({ params }: Props) => {
  const { slug } = params;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [star, setStar] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Generate or retrieve a unique user identifier (e.g., from a cookie)
  const getUserId = () => {
    let userId = Cookies.get("user_id");
    if (!userId) {
      userId =
        Math.random().toString(36).substring(2) + Date.now().toString(36); // Generate a unique ID
      Cookies.set("user_id", userId, { expires: 365 }); // Store the ID in a cookie for 1 year
    }
    return userId;
  };

  useEffect(() => {
    document.body.classList.add("dark"); // Apply dark mode class to body
  }, []);

  // Handle comment submission
  const handleCommentSubmit = async (newComment: {
    username: string;
    message: string;
  }) => {
    const currentDate = new Date().toISOString();

    const commentDoc = {
      _type: "blogComments",
      username: newComment.username,
      message: newComment.message,
      date: currentDate,
      blog: {
        _type: "reference",
        _ref: blog?._id,
      },
    };

    try {
      await client.create(commentDoc);
      toast.success("Comment submitted successfully!", { autoClose: 2000 });
      fetchComments(); // Refresh comments after submission
    } catch (error) {
      console.error("Failed to submit comment:", error); // Log the error
      toast.error("Failed to submit comment. Please try again.", {
        autoClose: 2000,
      });
    }

    setModalOpen(false);
  };

  // Fetch comments for the current blog post
  const fetchComments = useCallback(async () => {
    if (!blog?._id) return;

    try {
      const query = `*[_type == "blogComments" && blog._ref == $blogId] | order(date desc) {
        username,
        message,
        date
      }`;
      const fetchedComments = await client.fetch(query, { blogId: blog._id });
      setComments(fetchedComments);
    } catch (error) {
      toast.error("Failed to load comments", { autoClose: 2000 });
    }
  }, [blog?._id]); // Add blog._id as a dependency

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogQuery = `*[_type == "blogs" && slug.current == $slug][0]{
          _id,
          ...,
          "previousPost": *[_type == "blogs" && date < ^.date] | order(date desc)[0]{ slug },
          "nextPost": *[_type == "blogs" && date > ^.date] | order(date asc)[0]{ slug }
        }`;
        const fetchedBlog = await client.fetch(blogQuery, { slug });

        if (!fetchedBlog) {
          setError("Blog not found");
          return;
        }

        setBlog(fetchedBlog);
        setLikeCount(fetchedBlog.likeCount || 0); // Initialize likeCount
        setStarCount(fetchedBlog.starCount || 0); // Initialize starCount

        // Check if the current user has already liked or starred the post
        const userId = getUserId();
        setLike(fetchedBlog.likedBy?.includes(userId) || false);
        setStar(fetchedBlog.starredBy?.includes(userId) || false);

        fetchComments(); // Fetch comments after setting the blog
      } catch (err) {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug, fetchComments]);

  if (loading) {
    return (
      <>
        <LoadingBar loading={loading} />
        {loading && <LoadingSpinner />}
      </>
    );
  }

  if (error) {
    return toast.error("Error : " + error, { autoClose: 2000 });
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  // Handle Like
  const handleLikeMark = async () => {
    if (!blog?._id) return;

    const userId = getUserId();
    const hasLiked = blog.likedBy?.includes(userId);

    if (hasLiked) {
      toast.warning("You have already liked this post!", { autoClose: 2000 });
      return;
    }

    const updatedLikeCount = likeCount + 1;
    const updatedLikedBy = [...(blog.likedBy || []), userId];

    try {
      await client
        .patch(blog._id)
        .set({ likeCount: updatedLikeCount, likedBy: updatedLikedBy })
        .commit();

      setLike(true);
      setLikeCount(updatedLikeCount);
      toast.success("Liked the blog!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Failed to update like count", { autoClose: 2000 });
    }
  };

  // Handle Star
  const handleStarMark = async () => {
    if (!blog?._id) return;

    const userId = getUserId();
    const hasStarred = blog.starredBy?.includes(userId);

    if (hasStarred) {
      toast.warning("You have already starred this post!", { autoClose: 2000 });
      return;
    }

    const updatedStarCount = starCount + 1;
    const updatedStarredBy = [...(blog.starredBy || []), userId];

    try {
      await client
        .patch(blog._id)
        .set({ starCount: updatedStarCount, starredBy: updatedStarredBy })
        .commit();

      setStar(true);
      setStarCount(updatedStarCount);
      toast.success("Starred the blog!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Failed to update star count", { autoClose: 2000 });
    }
  };

  const CodeBlock = ({
    value,
  }: {
    value: { language: string; code: string };
  }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(value.code);
      setIsCopied(true);
      toast.success("Copied Successfully!");
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

  const components = {
    types: {
      image: ({ value }: any) => (
        <Image
          src={urlFor(value.asset).url()}
          alt={value.attribution || "Blog image"}
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
      h4: ({ children }: any) => (
        <h4 className="text-xl font-medium text-zinc-200 my-2">{children}</h4>
      ),
      h5: ({ children }: any) => (
        <h5 className="text-lg font-light text-white my-2 py-1 rounded-lg bg-yellow-500/[0.3] whitespace-nowrap overflow-auto opacity-50 w-full">
          <span className="sticky left-0 z-20 py-2 px-3 rounded-lg rounded-r-none bg-gradient-to-r from-yellow-500 to-yellow-400">
            ✦
          </span>
          <span className="p-2">{children}</span>
        </h5>
      ),
      normal: ({ children }: any) => (
        <p className="text-base text-zinc-400 leading-relaxed mb-2">
          {children}
        </p>
      ),
      hr: () => <hr className="my-10 border-t border-zinc-800" />,
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc text-zinc-400 my-2 py-3 px-7 bg-zinc-900 rounded-lg opacity-90">
          {children}
        </ul>
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

  const buttonLinkClass =
    "hover:text-blue-600 p-2 hover:bg-blue-600/[0.25] hover:border border-blue-950 rounded-full w-10 h-10";

  return (
    <>
      <title>{`${blog.title} | Blog`}</title>
      <main className="flex flex-col items-center justify-center m-auto sticky top-20 w-full">
        {/* Navigation Links */}
        <div className="flex items-center justify-between fixed top-0 py-7 xl:py-0 z-50 bg-black/[0.5] backdrop-blur-sm xl:backdrop-blur-none xl:bg-transparent xl:sticky xl:top-20 px-10 xl:px-20 font-light text-zinc-500 w-full">
          {blog.previousPost ? (
            <Link
              href={`/blogs/${blog.previousPost.slug.current}`}
              className="flex items-center space-x-2 bg-zinc-900 hover:bg-white hover:text-black focus:text-blue-600 p-2 leading-3 pl-3 pr-5 rounded-full hover:scale-105 transition-transform"
            >
              <TfiControlBackward className="w-6 h-6" />
              <span>Back</span>
            </Link>
          ) : (
            <div />
          )}
          {blog.nextPost ? (
            <Link
              href={`/blogs/${blog.nextPost.slug.current}`}
              className="flex items-center space-x-2 bg-zinc-900 hover:bg-white hover:text-black focus:text-blue-600 p-2 leading-3 pr-3 pl-5 rounded-full hover:scale-105 transition-transform"
            >
              <span>Next</span>
              <TfiControlForward className="w-6 h-6" />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Blog Content */}
        <div className="font-light relative p-12 mt-10 w-full md:max-w-4xl">
          <section className="flex flex-col items-start space-y-10 w-full">
            <div className="w-full">
              <div className="flex items-end justify-between mb-5 pb-5 border-b border-zinc-700 w-full">
                <div className="flex flex-col items-start space-y-2">
                  <h1 className="text-4xl font-semibold text-black dark:text-white">
                    {blog.title}
                  </h1>
                  <p className="text-sm text-zinc-500">
                    {blog.date
                      ? format(new Date(blog.date), "MMM dd, yyyy")
                      : "No Date"}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleStarMark}
                    aria-label={star ? "Unstar" : "Star"}
                    aria-pressed={star}
                    className="flex items-center rounded-full w-8 h-8"
                  >
                    {star ? (
                      <IoIosStar className="text-yellow-400 hover:scale-105 transition-transform w-full h-full" />
                    ) : (
                      <IoIosStarOutline className="text-zinc-700 hover:scale-105 transition-transform w-full h-full" />
                    )}
                  </button>
                  <p className="text-3xl font-thin text-zinc-400">
                    {starCount}
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-zinc-400 w-full">
                <PortableText value={blog.content} components={components} />
              </div>
            </div>

            <div className="inline-flex items-center p-1 border border-zinc-800 rounded-full hover:scale-105 transition-transform text-zinc-700">
              <Tooltip
                text={`${likeCount} Likes on blog page`}
                className="mb-3 -left-8 bottom-full w-max h-max"
              >
                <button
                  onClick={handleLikeMark}
                  aria-label={like ? "Liked" : "Like"}
                  aria-pressed={like}
                  className="flex items-center rounded-full hover:scale-105 transition-transform"
                >
                  {like ? (
                    <IoMdHeart className="text-rose-600 p-2 w-10 h-10" />
                  ) : (
                    <IoMdHeartEmpty className={buttonLinkClass} />
                  )}
                </button>
              </Tooltip>
              <Tooltip
                text="Make Comments on blog"
                className="mb-3 -left-14 bottom-full w-max h-max"
              >
                <button
                  onClick={openModal}
                  className="flex items-center hover:scale-105 transition-transform"
                >
                  <LiaCommentSolid className="hover:text-blue-600 p-2 hover:bg-blue-600/[0.25] hover:border border-blue-950 rounded-full w-10 h-10" />
                </button>
              </Tooltip>
              <Tooltip
                text="Share blog page link"
                className="mb-3 -left-8 bottom-full hover:scale-105 transition-transform w-max h-max"
              >
                <button
                  onClick={() => setShareModalOpen(!isShareModalOpen)}
                  className="flex items-center"
                >
                  <IoShareSocialOutline className={buttonLinkClass} />
                </button>
              </Tooltip>
            </div>
          </section>

          <section className="mt-10 w-full h-full">
            <div className="space-y-4 w-1/2">
              {comments.length > 0 ? (
                <>
                  {comments.map((comment: Comment, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col items-start text-zinc-100 bg-zinc-950 p-4 gap-y-3 rounded-lg border border-zinc-800 shadow-md w-full"
                    >
                      <div className="flex items-center space-x-2 w-full">
                        <Image
                          src="/user.png"
                          alt="user"
                          className="rounded-full grayscale w-10 h-10"
                          width={50}
                          height={50}
                        />
                        <div className="flex flex-col items-start">
                          <p className="text-base font-medium text-zinc-200 leading-6">
                            {comment.username}
                          </p>
                          <span className="font-light text-[0.7rem] text-zinc-500 mt-1">
                            {format(
                              new Date(comment.date),
                              "dd-MM-yyyy | hh:mm:ss a"
                            )}
                          </span>
                        </div>
                      </div>
                      <p className="text-base font-light text-zinc-400">
                        {comment.message}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-zinc-400">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </section>
        </div>

        <div>
          {/* Comment Modal */}
          {isModalOpen && (
            <CommentModal
              closeModal={closeModal}
              onSubmit={handleCommentSubmit}
            />
          )}
          {/* Share Modal */}
          <ShareDialog
            isOpen={isShareModalOpen}
            onClose={() => setShareModalOpen(false)}
            shareUrl={window.location.href}
          />
        </div>
      </main>
    </>
  );
};

export default BlogPage;

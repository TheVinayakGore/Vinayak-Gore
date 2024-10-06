"use client";
import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Feedback from "./Feedback";
import Tooltip from "./Tooltip";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PiArrowUpRightBold } from "react-icons/pi";
import { toast } from "react-toastify";

const LoadingSpinner = lazy(() => import("@/components/LoadingSpinner"));

interface MainProjects {
  _id: string;
  title: string;
  description: string;
  image?: {
    asset: {
      _ref: string;
    };
    caption?: string;
  };
  projectUrl?: string;
}

const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mainprojects, setmainprojects] = useState<MainProjects[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const email = "vvgore2675@gmail.com";
  const subject = "Inquiry from Portfolio";
  const body = "Hello Vinu,\n\nI would like to discuss...";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Fetch mainprojects from Sanity
  useEffect(() => {
    const fetchMainProjects = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "mainprojects"]{_id, title, description, image, projectUrl}`
        );
        setmainprojects(data);
      } catch (error) {
        console.error("Error fetching mainprojects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMainProjects();
  }, []);

  const handleFeedbackClick = () => {
    if (status === "authenticated") {
      openModal();
    } else {
      toast.warning("Please log in to give feedback", {
        position: "top-center",
        style: {
          marginTop: "5rem",
        },
      });
    }
  };

  return (
    <>
      <div
        className={cn(
          `fixed top-5 inset-x-0 max-w-[40rem] mx-auto z-50`,
          className
        )}
      >
        <Menu setActive={setActive}>
          <div className="flex items-center justify-between z-50 w-full">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
            </Link>
            <div className="flex items-center space-x-6 text-zinc-500 font-light">
              <MenuItem setActive={setActive} active={active} item="Auther">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/#auther">Who am I ?</HoveredLink>
                  <HoveredLink href="/#techStacks">Tech Stacks</HoveredLink>
                  <HoveredLink href="/#freelance">Freelance</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Projects">
                <div className="text-sm grid grid-cols-3 gap-2 max-w-5xl mx-auto h-full">
                  <Suspense fallback={<LoadingSpinner />}>
                    {loading ? (
                      <div className="flex justify-center items-center w-full h-full">
                        <LoadingSpinner />
                      </div>
                    ) : (
                      mainprojects.map((project) => (
                        <ProductItem
                          key={project._id}
                          title={project.title}
                          href={project.projectUrl || "#"}
                          src={
                            project.image?.asset
                              ? urlFor(project.image.asset._ref).url()
                              : "/card.png"
                          }
                          description={
                            project.description.slice(0, 50) ||
                            "Project - short description"
                          }
                          target="_blank"
                          priority
                        />
                      ))
                    )}
                  </Suspense>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Contact">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href={mailtoLink}>Email</HoveredLink>
                  <HoveredLink href="/#socialMedia">
                    Social Media Links
                  </HoveredLink>
                  <HoveredLink href="#">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleFeedbackClick();
                      }}
                    >
                      Feedback Form
                    </button>
                  </HoveredLink>
                </div>
              </MenuItem>
              <Link
                href="/create"
                target="_blank"
                prefetch={true}
                className="flex items-start space-x-1 text-zinc-500 hover:text-white"
              >
                Create
                <PiArrowUpRightBold className="text-xs font-light w-2 h-2" />
              </Link>
              <Link
                href="/blogs"
                target="_blank"
                prefetch={true}
                className="flex items-start space-x-1 text-zinc-500 hover:text-white"
              >
                Blogs
                <PiArrowUpRightBold className="text-xs font-light w-2 h-2" />
              </Link>
            </div>
            <div className="flex items-center text-xs font-medium text-zinc-100">
              {status === "authenticated" && session?.user ? (
                <Tooltip
                  text={
                    <>
                      <p className="">
                        You are signed in as
                        <span className="text-blue-600 mx-1">
                          {session.user.name}
                        </span>
                        Click to Sign Out
                      </p>
                    </>
                  }
                  className="top-full -left-16 mt-2 overflow-auto w-40 h-16"
                >
                  <button
                    onClick={() => signOut()}
                    className="flex text-zinc-300 cursor-pointer rounded-full"
                  >
                    <Image
                      src={session?.user?.image || "/user.png"}
                      width={40}
                      height={40}
                      alt="User Image"
                      className="rounded-full"
                    />
                  </button>
                </Tooltip>
              ) : (
                <button
                  onClick={async () => await signIn()}
                  className="flex cursor-pointer border border-zinc-700 hover:bg-gradient-to-r from-blue-500 to-blue-700 hover:text-white hover:border-blue-600 rounded-full px-7 py-2"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </Menu>
        <Feedback isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
};

export default Navbar;

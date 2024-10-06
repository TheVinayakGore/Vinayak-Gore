"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Workflow from "@/components/Workflow";
import Gallery from "@/components/Gallery";
import Auther from "@/components/Auther";
import Freelance from "@/components/Freelance";
import SocialMedia from "@/components/SocialMedia";
import TechStacks from "@/components/TechStacks";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoadingBar from "@/components/LoadingBar";

const Page: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingBar loading={loading} />
      <main className="pt-20 min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        {loading ? (
          <div className="flex items-center justify-center pt-40 w-full h-screen">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-y-32 py-28">
              <Navbar />
              <div className="flex flex-col px-16 w-full h-full">
                <Hero />
              </div>
              <div className="h-[30rem] -mt-28 flex items-center justify-center text-center">
                <TextHoverEffect text="VIGORE" className="text-[5.5rem]" />
              </div>
              <div className="flex flex-col space-y-48 px-16 w-full h-full">
                <Workflow />
                <TechStacks />
              </div>
              <div className="flex-col space-y-32">
                <div className="px-16 mt-3">
                  <Gallery />
                </div>
                <div className="pt-5 pb-10 border-t border-b border-zinc-800">
                  <Auther />
                </div>
              </div>
              <div className="flex flex-col space-y-40 w-full h-full">
                <Freelance />
                <SocialMedia />
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Page;

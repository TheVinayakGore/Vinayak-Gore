"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  description: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]); // Track active tab
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <title>{`Create - ${active.title} | Vinayak Gore`}</title>
      <div
        className={cn(
          "flex flex-row items-center justify-between space-x-2 relative border-b border-zinc-700 pb-5 overflow-auto sm:overflow-visible no-visible-scrollbar min-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "flex flex-col items-start justify-between relative p-5 bg-white/[0.5] dark:bg-black/[0.1] border border-zinc-500 dark:border-zinc-800 active:border-blue-500 backdrop-blur-[1px] rounded-xl w-full h-32",
              tabClassName
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.5, duration: 0.7 }}
                className={cn(
                  "absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 rounded-xl",
                  activeTabClassName
                )}
              />
            )}

            {/* Conditionally change text color based on active tab */}
            <span
              className={cn(
                "text-start text-xl font-medium relative block mb-2",
                active.value === tab.value ? "text-yellow-400" : "text-blue-600"
              )}
            >
              {tab.title}
            </span>
            <span
              className={cn(
                "text-start text-sm font-light relative block",
                active.value === tab.value ? "text-white" : "text-zinc-600"
              )}
            >
              {tab.description}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-14", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
  active,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => tab.value === active.value;

  return (
    <div className="relative z-40 w-full h-[70rem]">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -70 : 0,
            zIndex: isActive(tab) ? 100 : -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};

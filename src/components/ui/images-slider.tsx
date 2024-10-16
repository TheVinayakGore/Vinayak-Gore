"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames"; // Assuming you are using classnames for conditional classes

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
  setCurrentIndex, // Accept the setCurrentIndex function
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
  setCurrentIndex: (index: number) => void; // Declare setCurrentIndex prop
}) => {
  const [currentIndex, setLocalCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  // Function to handle the next image
  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1 === images.length ? 0 : currentIndex + 1;
    setLocalCurrentIndex(nextIndex);
    setCurrentIndex(nextIndex); // Update parent component's index
  }, [currentIndex, images.length, setCurrentIndex]);

  // Function to handle the previous image
  const handlePrevious = useCallback(() => {
    const prevIndex =
      currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
    setLocalCurrentIndex(prevIndex);
    setCurrentIndex(prevIndex); // Update parent component's index
  }, [currentIndex, images.length, setCurrentIndex]);

  // Function to load the images and update the state
  const loadImages = useCallback(() => {
    setLoading(true);
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages as string[]);
        setLoading(false);
      })
      .catch((error) => console.error("Failed to load images", error));
  }, [images]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  // Listen for keyboard arrow keys and autoplay functionality
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // autoplay
    let interval: NodeJS.Timeout | undefined;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 3000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [autoplay, handleNext, handlePrevious]);

  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: {
        duration: 1,
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        "overflow-hidden h-[40rem] w-full relative flex items-center justify-center",
        className
      )}
      style={{
        perspective: "5000px",
      }}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-transparent backdrop-blur-[1px] dark:bg-black/[0.05] z-40", overlayClassName)}
        />
      )}

      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="image h-full w-full absolute inset-0 rounded-xl"
          />
        </AnimatePresence>
      )}
    </div>
  );
};

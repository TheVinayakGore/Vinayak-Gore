"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

export const ImagesSlider = ({
  images,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
  setCurrentIndex,
}: {
  images: string[];
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
  setCurrentIndex: (index: number) => void;
}) => {
  const [currentIndex, setLocalCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1 === images.length ? 0 : currentIndex + 1;
    setLocalCurrentIndex(nextIndex);
    setCurrentIndex(nextIndex);
  }, [currentIndex, images.length, setCurrentIndex]);

  const handlePrevious = useCallback(() => {
    const prevIndex =
      currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
    setLocalCurrentIndex(prevIndex);
    setCurrentIndex(prevIndex);
  }, [currentIndex, images.length, setCurrentIndex]);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

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
        "overflow-hidden h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[30rem] xl:h-[40rem] w-full relative flex items-center justify-center",
        className
      )}
      style={{
        perspective: "5000px",
      }}
    >
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-transparent z-40", overlayClassName)}
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
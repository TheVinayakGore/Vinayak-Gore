"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ImagesSlider } from "./ui/images-slider";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Gallery {
  _id: string;
  title: string;
  image?: {
    asset: {
      _ref: string;
    };
    caption?: string;
  };
}

const GALLERY_QUERY = `*[_type == "gallery"]{
  _id,
  title,
  image,
}`;

const Gallery = () => {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGalleryImage = async () => {
      const data = await client.fetch(GALLERY_QUERY);
      setGallery(data);
    };

    fetchGalleryImage();
  }, []);

  // Only call urlFor if the image asset is defined
  const images = gallery.map((item) =>
    item.image?.asset ? urlFor(item.image.asset).url() : "/card.png"
  );

  const titles = gallery.map((item) => item.title);

  return (
    <>
      <div className="flex flex-col w-full">
        <h1 className="md:text-5xl text-3xl lg:text-[12rem] leading-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-black font-extrabold text-center relative z-20 h-36 opacity-70">
          GALLERY
        </h1>

        <div>
          {images.length > 0 && (
            <ImagesSlider
              className="border border-zinc-800 rounded-2xl"
              images={images.filter((img) => img)}
              setCurrentIndex={setCurrentIndex}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: -80,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="z-50 flex flex-col justify-center items-center"
              >
                {titles[currentIndex] && (
                  <motion.p className="font-bold text-[10rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                    {titles[currentIndex]}{" "}
                  </motion.p>
                )}
              </motion.div>
            </ImagesSlider>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;

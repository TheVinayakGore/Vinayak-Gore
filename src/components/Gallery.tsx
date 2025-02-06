"use client";
import React, { useState, useEffect } from "react";
import { ImagesSlider } from "./ui/images-slider";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

interface Gallery {
  _id: string;
  image?: {
    asset: {
      _ref: string;
    };
    caption?: string;
  };
}

const GALLERY_QUERY = `*[_type == "gallery"]{
  _id,
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

  return (
    <>
      <div className="flex flex-col items-center m-auto max-w-6xl px-10 xl:px-0 w-full">
        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none bg-clip-text text-transparent bg-gradient-to-b from-zinc-400 dark:from-zinc-400 dark:to-black font-extrabold text-center relative z-20 h-16 sm:h-20 md:h-24 lg:h-32 xl:h-36 opacity-50 dark:opacity-70">
          GALLERY
        </h1>

        <div className="w-full">
          <ImagesSlider
            className="border border-zinc-300 dark:border-zinc-800 rounded-2xl"
            images={images.filter((img) => img)}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      </div>
    </>
  );
};

export default Gallery;

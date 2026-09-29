"use client";

import { useEffect, useState } from "react";

type Props = {
  images?: string[];
};

const DEFAULT_IMAGES = [
  "/gallery/gallery-1.png",
  "/gallery/gallery-2.png",
  "/gallery/gallery-3.png",
  "/gallery/gallery-4.png",
];

export default function GalleryBand({ images = DEFAULT_IMAGES }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full aspect-[6/1] rounded-2xl overflow-hidden mb-10 bg-teal">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src + i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

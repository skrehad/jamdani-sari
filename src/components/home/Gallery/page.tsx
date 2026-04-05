"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { gallery } from "../../data/gallery";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const visibleCount = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % (gallery.length - visibleCount + 1));
    }, 2500); // 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  const visibleImages = gallery.slice(index, index + visibleCount);

  return (
    <section className="pt-28 pb-8 px-6 bg-[#FFF5F5]">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Exclusive Jamdani Gallery
        </h2>
        <p className="text-gray-600">
          Explore the intricate beauty of our handwoven Jamdani sarees
        </p>
      </div>

      {/* Gallery Slider */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 md:gap-8 transition-all duration-700">
        {visibleImages.map((img, i) => (
          <div
            key={i}
            className="relative w-full h-80 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            <Image
              src={img}
              alt={`Gallery ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

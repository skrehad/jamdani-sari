/* eslint-disable @next/next/no-img-element */
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { banners } from "../../data/banners";

// const HeroSlider = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     if (!banners.length) return;

//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % banners.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative h-[70vh] w-full overflow-hidden">
//       {banners.map((banner, index) => (
//         <div
//           key={banner.id}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === activeIndex ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           {/* Background Image */}
//           <Image
//             src={banner.image}
//             alt={banner.title}
//             fill
//             priority={index === 0}
//             className="object-cover"
//           />

//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-center px-6">
//             <div className="max-w-3xl">
//               <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
//                 {banner.title}
//               </h1>
//               <p className="text-lg md:text-xl tracking-wide drop-shadow-lg">
//                 {banner.subtitle}
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default HeroSlider;

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const images = [
  "https://images.unsplash.com/photo-1583391733956-6c78276477e2",
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
  "https://images.unsplash.com/photo-1618354691792-d1d42acfd860",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      {/* SLIDES */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={img} alt="banner" className="object-cover" />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Premium Jamdani <br /> Collection 2026
        </h1>

        <p className="mt-5 text-white/80 max-w-xl">
          Discover handcrafted elegance with modern luxury designs.
        </p>

        <Link
          href="/shop"
          className="mt-8 px-8 py-3 bg-yellow-300 text-black font-semibold rounded-full hover:scale-105 transition"
        >
          Shop Now
        </Link>
      </div>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === index ? "bg-yellow-300" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

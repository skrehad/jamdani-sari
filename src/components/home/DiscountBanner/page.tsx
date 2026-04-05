"use client";

import Link from "next/link";

export default function DiscountBanner() {
  return (
    <section className="relative overflow-hidden py-28 px-6 text-white bg-gradient-to-r from-[#b31217] via-[#ff3c48] to-[#ff6b6b]">
      {/* SOFT BLUR BACKGROUNDS */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

      {/* CENTER CONTENT */}
      <div className="relative max-w-5xl mx-auto text-center">
        {/* BADGE */}
        <div className="inline-block mb-6 px-5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-sm tracking-wide">
          🔥 Limited Time Offer
        </div>

        {/* MAIN TITLE */}
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          <span className="text-yellow-300"> UPTO 30% OFF</span> <br />
          Premium Jamdani Collection
        </h2>

        {/* SUB TEXT */}
        <p className="mt-6 text-white/85 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Discover handcrafted elegance with exclusive discounts on our finest
          traditional sarees. Limited stock available — grab yours now.
        </p>

        {/* CTA BUTTON */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/shop"
            className="relative px-10 py-4 rounded-full bg-yellow-300 text-black font-semibold shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* FLOATING DOTS */}
      <div className="absolute top-10 left-20 w-3 h-3 bg-white/60 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-32 w-2 h-2 bg-white/50 rounded-full animate-ping" />
      <div className="absolute top-1/3 right-10 w-4 h-4 bg-white/40 rounded-full animate-pulse" />
    </section>
  );
}

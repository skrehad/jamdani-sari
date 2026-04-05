/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";

const statsData = [
  { label: "Designs Crafted", value: 500 },
  { label: "Skilled Artisans", value: 300 },
  { label: "Happy Customers", value: 1000 },
  { label: "Years of Heritage", value: 25 },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const intervalsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting();
        } else {
          resetCounting();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const startCounting = () => {
    resetCounting();

    statsData.forEach((stat, index) => {
      let current = 0;
      const step = Math.ceil(stat.value / 120);

      const interval = window.setInterval(() => {
        current += step;

        if (current >= stat.value) {
          current = stat.value;
          clearInterval(interval);
        }

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = current;
          return updated;
        });
      }, 18);

      intervalsRef.current.push(interval);
    });
  };

  const resetCounting = () => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    setCounts(statsData.map(() => 0));
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 bg-gradient-to-b from-white via-pink-50 to-white"
    >
      {/* HEADER */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Our Journey in Numbers
        </h2>

        <p className="text-gray-500 mt-4 text-base md:text-lg">
          Every number tells a story of craftsmanship, tradition, and trust in
          authentic Jamdani sarees.
        </p>
      </div>

      {/* STATS GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {statsData.map((stat, index) => (
          <div
            key={stat.label}
            className="group relative bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            {/* glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-pink-100 opacity-0 group-hover:opacity-20 transition" />

            <h3 className="text-4xl md:text-5xl font-extrabold text-pink-600 mb-3">
              {counts[index].toLocaleString()}+
            </h3>

            <p className="text-gray-600 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

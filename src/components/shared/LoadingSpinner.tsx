"use client";

import React from "react";

const colors = [
  "fill-sky-500", // blue
  "fill-emerald-500", // green
  "fill-amber-400", // yellow
  "fill-rose-500", // red/pink
  "fill-violet-500", // purple
  "fill-cyan-500", // cyan
];

const Spinner = ({ color, delay }: { color: string; delay: number }) => (
  <svg
    aria-hidden="true"
    className={`w-8 h-8 text-gray-200 animate-spin ${color}`}
    style={{ animationDelay: `${delay}ms` }}
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348Z"
      fill="currentFill"
    />
  </svg>
);

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center gap-3 my-8">
      {colors.map((color, i) => (
        <Spinner key={i} color={color} delay={i * 120} />
      ))}
    </div>
  );
};

export default LoadingSpinner;

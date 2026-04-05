"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllReviews } from "@/services/review";

type Review = {
  id: string;
  username: string;
  image: string;
  comment: string;
  rating: number;
};

export default function Testimonial() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [index, setIndex] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getAllReviews();
        console.log(res.data);
        setReviews(res.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setIndex(
        (prev) => (prev + 1) % Math.max(reviews.length - visibleCount + 1, 1),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [reviews]);

  const visibleReviews = reviews.slice(index, index + visibleCount);

  return (
    <section className="bg-gradient-to-b from-white via-pink-50 to-white py-24 px-6">
      {/* HEADER */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold">
          What Our Customers Say
        </h2>
        <p className="text-gray-500 mt-3">
          Real feedback from our happy Jamdani lovers
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {visibleReviews.map((t) => (
          <div
            key={t.id}
            className="group bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-pink-100 mb-5">
              <Image
                src={t.image}
                alt={t.username}
                fill
                className="object-cover"
              />
            </div>

            {/* STARS */}
            <div className="flex justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-lg ${
                    star <= t.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* REVIEW */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {t.comment}
            </p>

            {/* NAME */}
            <h4 className="font-semibold text-lg">{t.username}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

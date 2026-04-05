"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubscribe = () => {
    // Required check
    if (!email) {
      setToast({ type: "error", message: "Email is required" });
      autoHideToast();
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToast({
        type: "error",
        message: "Please enter a valid email address",
      });
      autoHideToast();
      return;
    }

    // ✅ Success
    setEmail("");
    setToast({ type: "success", message: "Subscribed successfully!" });
    autoHideToast();
  };

  const autoHideToast = () => {
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <section className="relative bg-black py-28 px-6 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-linear-to-r from-[#FF3C48]/30 via-transparent to-[#FF3C48]/30 blur-3xl" />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join Our Newsletter
        </h2>

        <p className="text-gray-300 mb-6 leading-relaxed">
          Be the first to discover new Jamdani collections, exclusive offers,
          and stories from our artisans.
        </p>

        {/* Form */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full sm:w-80 px-5 py-3 rounded-full text-white bg-transparent border-2 border-[#FF3C48] focus:outline-none focus:ring-2 focus:ring-[#FF3C48]"
          />

          <button
            onClick={handleSubscribe}
            className="px-8 py-3 cursor-pointer rounded-full bg-[#FF3C48] hover:bg-[#e7333e] transition font-semibold"
          >
            Subscribe
          </button>
        </div>

        {/* Trust text */}
        <p className="text-xs text-gray-400 mt-6">
          We respect your privacy. No spam — unsubscribe anytime.
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white
          ${toast.type === "success" ? "bg-[#FF3C48]" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}
    </section>
  );
}

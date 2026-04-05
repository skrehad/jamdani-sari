/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { createReview } from "@/services/review";
import { toast } from "sonner";
import Image from "next/image";

export default function ReviewPage() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (image) formData.set("image", image);

    const toastId = toast.loading("Submitting review...");

    try {
      await createReview(formData);
      toast.success("Review submitted 🎉");
      form.reset();
      removeImage();
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit review", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Leave a Review ⭐</h2>

        {/* USERNAME */}
        <input
          type="text"
          name="username"
          placeholder="Your name"
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* RATING */}
        <select
          name="rating"
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select rating</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        {/* COMMENT */}
        <textarea
          name="comment"
          placeholder="Write your review..."
          required
          rows={6}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />

        {/* IMAGE UPLOAD */}
        <div className="flex flex-col space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload Your Image
          </label>

          {/* CUSTOM UPLOAD BUTTON */}
          <label className="cursor-pointer inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded">
            {image ? "Change Image" : "Choose Your Image"}
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* IMAGE PREVIEW */}
          {preview && (
            <div className="relative w-48 h-48 border rounded overflow-hidden mt-2">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

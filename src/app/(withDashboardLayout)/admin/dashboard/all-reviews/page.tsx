"use client";

import { useEffect, useState } from "react";
import { getAllReviews, deleteReview } from "@/services/review";
import { Review } from "@/types/gallery";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getAllReviews();
        setReviews(res.data);
      } catch {
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;
    await deleteReview(selectedId);
    setReviews((prev) => prev.filter((r) => r.id !== selectedId));
    setSelectedId(null);
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All Reviews</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">User Name</th>
            <th className="p-2 border">Rating</th>
            <th className="p-2 border">Comment</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id} className="text-center">
              <td className="p-2 border">{r.username}</td>
              <td className="p-2 border text-yellow-500">
                {"⭐".repeat(r.rating)}
              </td>
              <td className="p-2 border text-sm">{r.comment}</td>
              <td className="p-2 border">
                <button
                  onClick={() => setSelectedId(r.id)}
                  className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Modal */}
      {selectedId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">Delete this review?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setSelectedId(null)}
                className="cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 cursor-pointer text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { getMyWishlist, deleteWishlist } from "@/services/wishlist";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface IWishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    category: string;
    images: { url: string }[];
  };
}

const MyWishlistPage = () => {
  const [wishlist, setWishlist] = useState<IWishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await getMyWishlist();
      setWishlist(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // --- Modal actions ---
  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedId(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      setDeleteLoading(selectedId);
      await deleteWishlist(selectedId);
      setWishlist((prev) => prev.filter((item) => item.id !== selectedId));
      toast.success("Wishlist item removed 🎉");
      closeDeleteModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item ❌");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">💖 My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
            >
              <div className="w-full h-48 bg-gray-100">
                {item.product.images[0] ? (
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-semibold text-lg">{item.product.name}</h2>
                <p className="text-gray-500 text-sm mb-4">
                  {item.product.category}
                </p>

                <button
                  onClick={() => openDeleteModal(item.id)}
                  disabled={deleteLoading === item.id}
                  className={`mt-auto px-4 py-2 rounded text-white text-sm transition
                    ${
                      deleteLoading === item.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                  {deleteLoading === item.id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[350px]">
            <h2 className="text-lg font-bold mb-3">Remove Wishlist Item</h2>
            <p className="mb-4 text-sm">
              Are you sure you want to remove this item from your wishlist?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWishlistPage;

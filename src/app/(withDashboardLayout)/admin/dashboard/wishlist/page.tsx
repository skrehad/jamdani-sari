/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getAllWishlists, deleteWishlist } from "@/services/wishlist";
import { getUserById } from "@/services/user";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { toast } from "sonner";

interface IWishlistRow {
  id: string;
  userName: string;
  userEmail: string;
  productName: string;
  productCategory: string;
}

const WishlistPage = () => {
  const [rows, setRows] = useState<IWishlistRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch all wishlists
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await getAllWishlists();
        if (!res.data || res.data.length === 0) {
          setRows([]);
          return;
        }

        const userCache: Record<string, any> = {};

        const formattedRows = await Promise.all(
          res.data.map(async (w: any) => {
            if (!userCache[w.userId]) {
              try {
                const user = await getUserById(w.userId);
                userCache[w.userId] = user.data;
              } catch {
                userCache[w.userId] = { name: "Unknown", email: "Unknown" };
              }
            }

            return {
              id: w.id,
              userName: userCache[w.userId].name,
              userEmail: userCache[w.userId].email,
              productName: w.product?.name ?? "N/A",
              productCategory: w.product?.category ?? "N/A",
            };
          }),
        );

        setRows(formattedRows);
      } catch (err) {
        console.error(err);
        setError("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

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
      setDeleteLoading(true);
      await deleteWishlist(selectedId);
      setRows((prev) => prev.filter((r) => r.id !== selectedId));
      toast.success("Wishlist item deleted 🎉");
      closeDeleteModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete wishlist item ❌");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Wishlist (Admin)</h1>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">User Name</th>
              <th className="p-2 border">User Email</th>
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((r) => (
                <tr key={r.id} className="text-center">
                  <td className="p-2 border">{r.userName}</td>
                  <td className="p-2 border">{r.userEmail}</td>
                  <td className="p-2 border">{r.productName}</td>
                  <td className="p-2 border">{r.productCategory}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => openDeleteModal(r.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No wishlist items
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteModalOpen && selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[350px]">
            <h2 className="text-lg font-bold mb-3">Delete Wishlist Item</h2>
            <p className="mb-4 text-sm">
              Are you sure you want to delete this item?
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
                disabled={deleteLoading}
                className={`px-4 py-2 rounded-lg text-white text-sm ${
                  deleteLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { getMyPreOrders, deletePreOrder } from "@/services/pre-order";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UserPreOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  console.log(orders);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getMyPreOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      setDeleteLoading(selectedId);
      await deletePreOrder(selectedId);

      setOrders((prev) => prev.filter((o) => o.id !== selectedId));
      toast.success("Pre-order deleted successfully 🎉");
    } catch (err) {
      toast.error("Failed to delete ❌");
    } finally {
      setDeleteLoading(null);
      setSelectedId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (orders.length === 0)
    return <p className="p-4 text-center">You have no pre-orders yet.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Pre-Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold text-gray-800 text-sm">
                  {order.id.slice(0, 12)}...
                </p>
              </div>

              <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-600">
                {order.status}
              </span>
            </div>

            {/* Total */}
            <div className="mb-4">
              <p className="text-gray-500 text-sm">Total Price</p>
              <p className="text-2xl font-bold text-gray-800">
                ${order.totalPrice}
              </p>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-4">
              {order.items.map((item: any) => (
                <div
                  key={item.productId}
                  className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl"
                >
                  <img
                    src={item.product.images[0]?.url ?? "/placeholder.png"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-700">${item.price}</p>
                </div>
              ))}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => setSelectedId(order.id)}
              disabled={deleteLoading === order.id}
              className={`w-full py-2 rounded-xl text-white text-sm font-medium transition ${
                deleteLoading === order.id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {deleteLoading === order.id ? "Deleting..." : "Delete Pre-Order"}
            </button>
          </div>
        ))}
      </div>

      {/* Confirm Modal */}
      {selectedId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-6 w-[350px] shadow-xl">
            <h2 className="text-lg font-bold mb-3">Confirm Delete</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this pre-order?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedId(null)}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
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

export default UserPreOrdersPage;

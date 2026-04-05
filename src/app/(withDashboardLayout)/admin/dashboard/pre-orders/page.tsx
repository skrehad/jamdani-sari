/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { IPreOrderRow } from "@/types/pre-order";
import { deletePreOrder, getAllPreOrders } from "@/services/pre-order";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const PreOrderPage = () => {
  const [rows, setRows] = useState<IPreOrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreOrders = async () => {
      try {
        const res = await getAllPreOrders();

        const formatted = res.data.map((o: any) => ({
          id: o.id,
          userName: o.user.name,
          userEmail: o.user.email,
          productName: o.items[0]?.product?.name ?? "N/A",
          quantity: o.items[0]?.quantity ?? 0,
          totalPrice: o.totalPrice,
          status: o.status,
        }));

        setRows(formatted);
      } catch {
        setError("Failed to load pre-orders");
      } finally {
        setLoading(false);
      }
    };

    fetchPreOrders();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;
    await deletePreOrder(selectedId);
    setRows((prev) => prev.filter((r) => r.id !== selectedId));
    setSelectedId(null);
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Pre Orders</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="text-center">
              <td className="p-2 border">{r.userName}</td>
              <td className="p-2 border">{r.userEmail}</td>
              <td className="p-2 border">{r.productName}</td>
              <td className="p-2 border">{r.quantity}</td>
              <td className="p-2 border">{r.totalPrice}</td>
              <td className="p-2 border">{r.status}</td>
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

      {selectedId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">Delete this pre-order?</p>
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
};

export default PreOrderPage;

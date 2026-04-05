/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getAllOrders, deleteOrder, updateOrderStatus } from "@/services/order";
import { getUserById } from "@/services/user";
import { singleProductById } from "@/services/product";
import { IOrder, IOrderItem, IOrderRow } from "@/types/order";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const OrderPage = () => {
  const [rows, setRows] = useState<IOrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("PENDING");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        if (!res.data || res.data.length === 0) {
          setRows([]);
          return;
        }

        const userCache: Record<string, any> = {};
        const productCache: Record<string, any> = {};

        const formattedRows: IOrderRow[] = await Promise.all(
          res.data.map(async (order: IOrder) => {
            if (!userCache[order.userId]) {
              try {
                const userRes = await getUserById(order.userId);
                userCache[order.userId] = userRes.data;
              } catch {
                userCache[order.userId] = {
                  name: "Unknown",
                  email: "Unknown",
                  phone: "Unknown",
                };
              }
            }

            const itemsWithProduct = await Promise.all(
              order.items.map(async (item: IOrderItem) => {
                if (!productCache[item.productId]) {
                  try {
                    const productRes = await singleProductById(item.productId);
                    productCache[item.productId] = productRes.data.name;
                  } catch {
                    productCache[item.productId] = "Unknown Product";
                  }
                }

                return {
                  id: item.id,
                  productName: productCache[item.productId],
                  quantity: item.quantity,
                  price: item.price,
                };
              }),
            );

            return {
              id: order.id,
              userName: userCache[order.userId].name,
              userEmail: userCache[order.userId].email,
              userPhone: userCache[order.userId].phone,
              totalPrice: order.totalPrice,
              status: order.status,
              createdAt: order.createdAt,
              items: itemsWithProduct,
            };
          }),
        );

        setRows(formattedRows);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🔍 SEARCH FILTER (Name, Email, Phone only)
  const filteredRows = rows.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.userName.toLowerCase().includes(q) ||
      r.userEmail.toLowerCase().includes(q) ||
      r.userPhone.toLowerCase().includes(q)
    );
  });

  // --- Delete ---
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
      await deleteOrder(selectedId);
      setRows((prev) => prev.filter((r) => r.id !== selectedId));
      closeDeleteModal();
    } catch {
      setError("Failed to delete order");
    }
  };

  // --- Update ---
  const openUpdateModal = (id: string, currentStatus: string) => {
    setSelectedId(id);
    setNewStatus(currentStatus);
    setUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setSelectedId(null);
    setUpdateModalOpen(false);
  };
  const handleUpdate = async () => {
    if (!selectedId) return;
    try {
      await updateOrderStatus(selectedId, newStatus);
      setRows((prev) =>
        prev.map((r) =>
          r.id === selectedId ? { ...r, status: newStatus } : r,
        ),
      );
      closeUpdateModal();
    } catch {
      setError("Failed to update order");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All Orders</h1>

      {/* 🔍 Search Field */}
      <div className="mb-5 flex justify-end">
        <div className="relative w-full md:w-96">
          {/* Search Icon */}
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
        w-full pl-10 pr-4 py-2.5
        rounded-xl border border-gray-300
        bg-white shadow-sm
        text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition
      "
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">User Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Total Price</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((r) => (
                <tr key={r.id} className="text-center">
                  <td className="p-2 border">{r.userName}</td>
                  <td className="p-2 border">{r.userEmail}</td>
                  <td className="p-2 border">{r.userPhone}</td>
                  <td className="p-2 border">{r.totalPrice}</td>
                  <td className="p-2 border">{r.status}</td>
                  <td className="p-2 border">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2 border">
                    {r.items.map((i) => (
                      <div key={i.id}>
                        {i.productName} x {i.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="p-2 border flex flex-col gap-1">
                    <button
                      onClick={() => openDeleteModal(r.id)}
                      className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openUpdateModal(r.id, r.status)}
                      className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-4 text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteModalOpen && selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-2xl w-[350px]">
            <h2 className="text-lg font-bold mb-3">Delete Order</h2>
            <p className="mb-4 text-sm">
              Are you sure you want to delete this order?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="border cursor-pointer px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {updateModalOpen && selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-2xl w-[350px]">
            <h2 className="text-lg font-bold mb-3">Update Order Status</h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="PENDING">PENDING</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeUpdateModal}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;

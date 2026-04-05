/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import {
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "@/services/product";
import { IProduct } from "@/types/product";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

type UpdateProductPayload = Partial<
  Omit<IProduct, "id" | "createdAt" | "updatedAt">
>;

const ProductPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [updateData, setUpdateData] = useState<UpdateProductPayload>({});

  /* ---------------- Fetch products ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  /* ---------------- Delete ---------------- */
  const openDeleteModal = (product: IProduct) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
    setError(null);
  };

  const closeDeleteModal = () => {
    setSelectedProduct(null);
    setDeleteModalOpen(false);
    setError(null);
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct.id);
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      closeDeleteModal();
    } catch (err) {
      console.error(err);
      setError("Failed to delete product.");
    }
  };

  /* ---------------- Update ---------------- */
  const openUpdateModal = (product: IProduct) => {
    setSelectedProduct(product);

    setUpdateData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
    });

    setUpdateModalOpen(true);
    setError(null);
  };

  const closeUpdateModal = () => {
    setSelectedProduct(null);
    setUpdateModalOpen(false);
    setUpdateData({});
    setError(null);
  };

  const handleUpdate = async () => {
    if (!selectedProduct) return;

    const cleanedData = Object.fromEntries(
      Object.entries(updateData).filter(
        ([_, value]) => value !== "" && value !== undefined,
      ),
    );

    try {
      await updateProduct(selectedProduct.id, cleanedData);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...cleanedData } : p,
        ),
      );

      closeUpdateModal();
    } catch (err) {
      console.error(err);
      setError("Failed to update product.");
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold my-8">All Products</h1>

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
            placeholder="Search by name, category..."
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

      {/* ---------------- Table ---------------- */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length ? (
              filteredProducts.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">{product.price}</td>
                  <td className="p-2 border">{product.stock}</td>
                  <td className="p-2 border">{product.status}</td>
                  <td className="p-2 border flex justify-center gap-2">
                    <button
                      onClick={() => openUpdateModal(product)}
                      className="px-3 cursor-pointer py-1 rounded text-white  text-sm  font-medium  transition-all  duration-200  hover:scale-105  hover:shadow-md  active:scale-95"
                      style={{ backgroundColor: "#2563EB" }} // blue
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(product)}
                      className="px-3 py-1  cursor-pointer rounded bg-red-500 text-white text-sm hover:bg-red-600 transition hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------- Delete Modal ---------------- */}
      {deleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[350px]">
            <h2 className="text-lg font-bold mb-3">Delete Product</h2>
            <p className="mb-4 text-sm">
              Are you sure you want to delete{" "}
              <strong>{selectedProduct.name}</strong>?
            </p>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className=" cursor-pointer px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className=" cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Update Modal ---------------- */}
      {updateModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[400px]">
            <h2 className="text-lg font-bold mb-3">Update Product</h2>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="space-y-2">
              <input
                className="w-full p-2 border rounded"
                value={updateData.name ?? ""}
                placeholder="Name"
                onChange={(e) =>
                  setUpdateData({ ...updateData, name: e.target.value })
                }
              />

              <select
                className="w-full p-2 border rounded"
                value={updateData.category ?? "COTTON"}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    category: e.target.value as IProduct["category"],
                  })
                }
              >
                <option value="COTTON">COTTON</option>
                <option value="SEMI_SILK">SEMI_SILK</option>
                <option value="PURE_HANDLOOM">PURE_HANDLOOM</option>
                <option value="BRIDAL">BRIDAL</option>
              </select>

              <input
                type="number"
                className="w-full p-2 border rounded"
                value={updateData.price ?? ""}
                placeholder="Price"
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    price: Number(e.target.value),
                  })
                }
              />

              <input
                type="number"
                className="w-full p-2 border rounded"
                value={updateData.stock ?? ""}
                placeholder="Stock"
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    stock: Number(e.target.value),
                  })
                }
              />

              <select
                className="w-full p-2 border rounded"
                value={updateData.status ?? "IN_STOCK"}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    status: e.target.value as IProduct["status"],
                  })
                }
              >
                <option value="IN_STOCK">IN_STOCK</option>
                <option value="PRE_ORDER">PRE_ORDER</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={closeUpdateModal}
                className="px-4 cursor-pointer py-2 border rounded transition-all  duration-200  hover:scale-105  hover:shadow-md  active:scale-95 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 cursor-pointer py-1.5 rounded-lg text-white  text-sm  font-medium  transition-all  duration-200  hover:scale-105  hover:shadow-md  active:scale-95"
                style={{ backgroundColor: "#2563EB" }} // blue
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

export default ProductPage;

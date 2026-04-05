/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProducts } from "@/services/product";

interface Image {
  url: string;
  type: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discount: number;
  stock: number;
  status: "IN_STOCK" | "PRE_ORDER";
  images: Image[];
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 100000,
  });

  // Determine min/max from products dynamically
  const priceLimits = {
    min: Math.min(...products.map((p) => p.price - p.discount), 0),
    max: Math.max(...products.map((p) => p.price - p.discount), 100000),
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const priceAfterDiscount = p.price - p.discount;

    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter
      ? p.category === categoryFilter
      : true;

    const matchesStatus = statusFilter ? p.status === statusFilter : true;

    const matchesPrice =
      priceAfterDiscount >= priceRange.min &&
      priceAfterDiscount <= priceRange.max;

    return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Shop Our Collection
      </h1>

      {/* FILTER SECTION */}
      <div className="bg-white border rounded-xl p-5 mb-10 shadow-sm grid md:grid-cols-5 gap-4">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        {/* CATEGORY */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border cursor-pointer px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">Product Categories</option>
          <option value="PURE_COTTON">PURE_COTTON</option>
          <option value="HALF_SILK"> HALF_SILK</option>
        </select>

        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border cursor-pointer px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">Product Status</option>
          <option value="IN_STOCK">In Stock</option>
          <option value="PRE_ORDER">Pre Order</option>
        </select>

        {/* PRICE MIN */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            Min Price: ৳{priceRange.min}
          </label>
          <input
            type="range"
            min={priceLimits.min}
            max={priceLimits.max}
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: Number(e.target.value) })
            }
            className="w-full"
          />
        </div>

        {/* PRICE MAX */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            Max Price: ৳{priceRange.max}
          </label>
          <input
            type="range"
            min={priceLimits.min}
            max={priceLimits.max}
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
            className="w-full"
          />
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* IMAGE SECTION */}
              <div className="relative overflow-hidden">
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-72 object-cover transition duration-700 group-hover:scale-110"
                />

                {/* DARK OVERLAY ON HOVER */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                {/* DISCOUNT BADGE */}
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
                    SAVE ৳{product.discount}
                  </span>
                )}

                {/* STATUS BADGE */}
                <span
                  className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white shadow ${
                    product.status === "IN_STOCK"
                      ? "bg-green-600"
                      : "bg-orange-500"
                  }`}
                >
                  {product.status === "IN_STOCK" ? "In Stock" : "Pre Order"}
                </span>
              </div>

              {/* INFO SECTION */}
              <div className="p-5 flex flex-col justify-between h-44">
                <div>
                  {/* TITLE */}
                  <h2 className="font-semibold text-lg text-gray-800 group-hover:text-black transition line-clamp-1">
                    {product.name}
                  </h2>

                  {/* CATEGORY */}
                  <p className="text-sm text-gray-400 uppercase tracking-wide mt-1">
                    {product.category.replace("_", " ")}
                  </p>

                  {/* PRICE */}
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xl font-bold text-black">
                      ৳{product.price - product.discount}
                    </span>

                    {product.discount > 0 && (
                      <span className="line-through text-gray-400 text-sm">
                        ৳{product.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* BUTTON */}
                <div className="mt-4">
                  <div className="w-full bg-black text-white py-2 rounded-xl text-center font-medium group-hover:bg-gray-800 transition">
                    View Details
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-16">No products found</p>
      )}
    </div>
  );
};

export default ShopPage;

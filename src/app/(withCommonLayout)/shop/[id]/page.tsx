/* eslint-disable jsx-a11y/alt-text */

"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAllProducts } from "@/services/product";
import { createOrder } from "@/services/order";
import { toast } from "sonner";
import { createWishlist } from "@/services/wishlist";

interface Image {
  url: string;
  type: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  stock: number;
  status: "IN_STOCK" | "PRE_ORDER";
  images: Image[];
  material: string;
  blouse: string;
  ghuri: string;
  length: string;
  care: string;
  colour: string;
}

const ProductDetails = () => {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [imageModal, setImageModal] = useState(false);

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getAllProducts();
      const found = res.data.find((p: Product) => p.id === productId);

      if (found) {
        setProduct(found);
        setMainImage(found.images[0]?.url);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  const priceAfterDiscount = product.price - (product.discount || 0);

  // ✅ HANDLE ORDER
  const handleOrder = async () => {
    try {
      setLoading(true);

      await createOrder({
        items: [{ productId: product.id, quantity }],
        addressId: "default-address-id",
      });

      toast.success("Order placed successfully 🎉");

      setOrderModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Order failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async () => {
    try {
      await createWishlist(product.id);

      toast.success("Added to wishlist ❤️");
    } catch (err) {
      console.error(err);
      toast.error("Wishlist failed ❌");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-16">
        {/* LEFT: IMAGE */}
        <div>
          <div className="rounded-3xl overflow-hidden shadow-lg group">
            <img
              src={mainImage}
              onClick={() => setImageModal(true)}
              className="w-full h-[550px] object-cover transition duration-700 group-hover:scale-110 cursor-zoom-in"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                onClick={() => setMainImage(img.url)}
                className={`w-20 h-20 rounded-xl object-cover border cursor-pointer transition ${
                  mainImage === img.url
                    ? "border-black scale-105"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="space-y-6">
          <p className="text-sm tracking-widest text-gray-400 uppercase">
            Jamdani Collection
          </p>

          <h1 className="text-4xl font-semibold text-gray-900">
            {product.name}
          </h1>

          {/* PRICE */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-semibold">
              ৳{priceAfterDiscount}
            </span>

            {product.discount > 0 && (
              <>
                <span className="line-through text-gray-400 text-lg">
                  ৳{product.price}
                </span>

                <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                  SAVE ৳{product.discount}
                </span>
              </>
            )}
          </div>

          {/* STATUS */}
          <div>
            {product.status === "IN_STOCK" ? (
              <span className="text-green-700 bg-green-100 px-4 py-1 rounded-full text-sm">
                Ready to Ship
              </span>
            ) : (
              <span className="text-orange-700 bg-orange-100 px-4 py-1 rounded-full text-sm">
                Pre Order (7-10 Days)
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 border-t pt-5">{product.description}</p>

          {/* DETAILS */}
          <div className="grid grid-cols-2 gap-4 text-sm border-t pt-5">
            <p>
              <span className="text-gray-500">Blouse:</span> {product.blouse}
            </p>
            <p>
              <span className="text-gray-500">Ghuri:</span> {product.ghuri}
            </p>
            <p>
              <span className="text-gray-500">Length:</span> {product.length}
            </p>
            <p>
              <span className="text-gray-500">Color:</span> {product.colour}
            </p>
            <p>
              <span className="text-gray-500">Care:</span> {product.care}
            </p>
            <p>
              <span className="text-gray-500">Stock:</span> {product.stock}
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => setOrderModalOpen(true)}
            className="w-full cursor-pointer py-4 rounded-2xl bg-black text-white text-lg hover:bg-gray-900 transition"
          >
            {product.status === "PRE_ORDER"
              ? "Pre Order This Saree"
              : "Order This Saree"}
          </button>

          <button
            onClick={handleWishlist}
            className="w-full mt-3 cursor-pointer flex items-center justify-center gap-2 py-4 rounded-2xl border border-red-400 text-red-500 hover:bg-red-50 transition"
          >
            ❤️ Add to Wishlist
          </button>

          <p className="text-xs text-gray-400 text-center">
            Authentic Jamdani • Handcrafted • Premium Quality
          </p>
        </div>
      </div>

      {/* IMAGE MODAL */}
      {imageModal && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
          <button
            onClick={() => setImageModal(false)}
            className="absolute top-6 right-6 text-white text-4xl"
          >
            ✕
          </button>

          <img
            src={mainImage}
            className="max-h-[90vh] max-w-[90vw] rounded-xl"
          />
        </div>
      )}

      {/* ORDER MODAL */}
      {orderModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md relative">
            <button
              onClick={() => setOrderModalOpen(false)}
              className="absolute right-4 top-3 text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-4">Confirm Order</h2>

            <p className="mb-2 font-medium">{product.name}</p>
            <p className="mb-4 text-gray-600">৳{priceAfterDiscount}</p>

            <div className="flex items-center gap-3 mb-5">
              <label>Quantity</label>
              <input
                type="number"
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.min(product.stock, Number(e.target.value)))
                }
                className="border px-3 py-1 rounded w-24"
              />
            </div>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

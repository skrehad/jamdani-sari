"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { createProductService } from "@/services/product";
import { ImageWithPreview } from "@/types/product";

const AddProductPage = () => {
  const [images, setImages] = useState<ImageWithPreview[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    if (images.length + filesArray.length > 7) {
      toast.error("You must upload minium 4 images maximum 7 images");
      return;
    }

    const newImages = filesArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: "full",
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (images.length < 4 || images.length > 7) {
      toast.error("Please upload minimum 4 and maximum 7 images");
      return;
    }

    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    // const price = Number(formData.get("price"));
    // const discount = Number(formData.get("discount") || 0);
    // const totalPrice = price - discount;

    // 👉 append total
    // formData.append("totalPrice", totalPrice.toString());

    // Add images to FormData
    images.forEach((img) => {
      formData.append("images", img.file);
      formData.append("imageTypes", img.type);
    });

    try {
      await createProductService(formData);
      toast.success("Product created successfully 🎉");
      console.log(formData);
      form.reset();
      setImages([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Add New Product</h2>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Product name"
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          required
          rows={4}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />

        {/* CATEGORY */}
        <select
          name="category"
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select category</option>
          <option value="PURE_COTTON">PURE_COTTON</option>
          <option value="HALF_SILK">HALF_SILK</option>
        </select>

        {/* PRICE & DISCOUNT */}
        <div className="flex space-x-2">
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount"
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            name="blouse"
            placeholder="Blouse"
            required
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            name="ghuri"
            placeholder="Ghuri"
            required
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            name="length"
            placeholder="Length"
            required
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* CARE & STOCK */}
        <div className="flex space-x-2">
          <input
            type="text"
            name="care"
            placeholder="Care"
            required
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            required
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* STATUS */}
        <select
          name="status"
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select status</option>
          <option value="IN_STOCK">IN STOCK</option>
          <option value="PRE_ORDER">PRE ORDER</option>
        </select>

        <input
          type="text"
          name="colour"
          placeholder="Color"
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* IMAGE UPLOAD */}
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              You must upload minimum 4 and maximum 7 images
            </label>
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 cursor-pointer hover:border-gray-500 transition"
              />
              <p className="mt-1 text-xs text-gray-400">
                Select minimum 4 and maximum 7 images. Each image should be
                under 10MB.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-2">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative w-25 h-25 border rounded overflow-hidden"
              >
                <Image
                  src={img.preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {(images.length < 4 || images.length > 7) && (
            <p className="text-red-500 text-sm mt-1">
              You must upload minimum 4 and maximum 7 images
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Submitting..." : "Submit Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;

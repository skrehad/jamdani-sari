/* eslint-disable @next/next/no-img-element */
"use client";

import { uploadGalleryImage } from "@/services/gallery";
import { useRef, useState } from "react";
import { toast } from "sonner";

const AddGalleryPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resetFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image first");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("accessToken");

    try {
      await uploadGalleryImage(file, token!);
      toast.success("Image uploaded successfully 🎉");
      resetFile();
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">
        📸 Gallery Image Upload
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md">
        {/* LEFT: Preview */}
        <div className="flex items-center justify-center border-2 border-dashed rounded-lg h-64">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-gray-400 text-sm">
              Image preview will appear here
            </p>
          )}
        </div>

        {/* RIGHT: Controls */}
        <div className="flex flex-col justify-between">
          <div>
            <label className="block cursor-pointer text-sm font-medium mb-2">
              Select Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm cursor-pointer
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className={`flex-1 px-4 cursor-pointer py-2 rounded text-white transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>

            {file && (
              <button
                onClick={resetFile}
                className="px-4 cursor-pointer py-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGalleryPage;

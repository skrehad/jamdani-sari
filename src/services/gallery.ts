"use client";
export const uploadGalleryImage = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("NEXT_PUBLIC_API/api/gallery/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to upload image");
  }

  return res.json(); // { data: { url, publicId, ... } }
};

// export const getGalleryImages = async () => {
//   const res = await fetch("NEXT_PUBLIC_API/api/gallery");
//   if (!res.ok) throw new Error("Failed to fetch gallery images");
//   return res.json(); // { data: Gallery[] }
// };

"use server";
import { cookies } from "next/headers";

export const getAllWishlists = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) throw new Error("No token found");

  const res = await fetch("NEXT_PUBLIC_API/api/wishlist", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Wishlist fetch error:", text);
    throw new Error("Failed to fetch wishlist");
  }

  return res.json(); // { data: IWishlist[] } -> admin view, all users
};

export const createWishlist = async (productId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("Not authenticated");

  const res = await fetch("NEXT_PUBLIC_API/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Wishlist create error:", text);
    throw new Error("Failed to create wishlist");
  }

  return res.json();
};
// ------------------ USER ------------------ //
export const getMyWishlist = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) throw new Error("Not authenticated");

  const res = await fetch("NEXT_PUBLIC_API/api/wishlist/my-wishlist", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("My wishlist fetch error:", text);
    throw new Error("Failed to fetch wishlist");
  }

  return res.json(); // { data: IWishlist[] } -> only current user
};

// ------------------ DELETE ------------------ //
export const deleteWishlist = async (wishlistId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) throw new Error("No token");

  const res = await fetch(`NEXT_PUBLIC_API/api/wishlist/${wishlistId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete wishlist");

  return res.json();
};

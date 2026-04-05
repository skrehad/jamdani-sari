"use server";

import { cookies } from "next/headers";

export const createReview = async (formData: FormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("No token found");

  const res = await fetch("NEXT_PUBLIC_API/api/review", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // ✅ only this
    },
    body: formData, // ✅ FormData directly
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(err);
    throw new Error("Failed to submit review");
  }

  return res.json();
};

export const getAllReviews = async () => {
  const res = await fetch("NEXT_PUBLIC_API/api/review", {
    cache: "no-store",
  });
  return res.json();
};

export const deleteReview = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`NEXT_PUBLIC_API/api/review/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete review");
  return res.json();
};

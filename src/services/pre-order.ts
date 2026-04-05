"use server";

import { cookies } from "next/headers";

export const getAllPreOrders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`NEXT_PUBLIC_API/api/pre-order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch pre-orders");
  return res.json();
};

export const getSinglePreOrder = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`NEXT_PUBLIC_API/api/pre-order/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch single pre-order error:", text);
    throw new Error("Failed to fetch pre-order");
  }

  return res.json();
};

export const getMyPreOrders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("Not authenticated");

  const res = await fetch("NEXT_PUBLIC_API/api/pre-order/my-pre-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(text);
    throw new Error("Failed to fetch pre-orders");
  }

  return res.json(); // { data: IPreOrder[] }
};

export const deletePreOrder = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`NEXT_PUBLIC_API/api/pre-order/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete pre-order");
  return res.json();
};

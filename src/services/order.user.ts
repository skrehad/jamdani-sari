// "use client";

"use server";

import { cookies } from "next/headers";

export const getMyOrders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("Not authenticated");

  const res = await fetch("NEXT_PUBLIC_API/api/order/my-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to loading data:", text);
    throw new Error(text || "Failed to fetch your orders");
  }

  return res.json();
};

// services/order.client.ts
export const deleteUserOrder = async (orderId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`NEXT_PUBLIC_API/api/order/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Delete order failed:", text);
    throw new Error(text || "Failed to delete order");
  }

  return res.json();
};

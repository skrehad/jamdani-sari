"use server";

import { cookies } from "next/headers";

export interface CreateOrderPayload {
  items: { productId: string; quantity: number }[];
  addressId: string;
}

export const createOrder = async (payload: CreateOrderPayload) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("No token found");

  const res = await fetch("NEXT_PUBLIC_API/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Order creation failed:", err);
    throw new Error("Failed to create order");
  }

  return res.json(); // { success: true, data: order }
};

export const getAllOrders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch("NEXT_PUBLIC_API/api/order", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Order fetch failed:", err);
    throw new Error("Failed to fetch orders");
  }

  return res.json();
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`NEXT_PUBLIC_API/api/order/status/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Update order status failed:", err);
    throw new Error("Failed to update order status");
  }

  return res.json();
};

export const deleteOrder = async (orderId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`NEXT_PUBLIC_API/api/order/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Delete order failed:", err);
    throw new Error("Failed to delete order");
  }

  return res.json();
};

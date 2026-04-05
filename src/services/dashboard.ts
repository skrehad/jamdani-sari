"use server";

import { cookies } from "next/headers";

export const getUserDashboardStats = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch("NEXT_PUBLIC_API/api/dashboard/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Dashboard fetch failed:", text);
    throw new Error("Failed to fetch dashboard stats");
  }

  return res.json(); // { ordersCount, wishlistCount, preOrdersCount, reviewsCount }
};

export const getAdminDashboardStats = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("Not authenticated");

  const res = await fetch("NEXT_PUBLIC_API/api/dashboard/admin", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(text);
    throw new Error("Failed to fetch admin stats");
  }

  return res.json(); // { totalUsers, totalOrders, totalProducts, totalReviews }
};

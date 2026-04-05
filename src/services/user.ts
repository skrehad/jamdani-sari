"use server";

import { cookies } from "next/headers";

export const getAllUsers = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch("NEXT_PUBLIC_API/api/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    console.log(err);
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

export const getUserById = async (userId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) throw new Error("No token");

  const res = await fetch(`NEXT_PUBLIC_API/api/user/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  console.log(userId);

  if (!res.ok) throw new Error("Failed to fetch user");

  return res.json();
};

export const deleteUser = async (userId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`NEXT_PUBLIC_API/api/user/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.log(err);
    throw new Error("Failed to delete user");
  }

  return res.json();
};

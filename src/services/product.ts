"use server";

import { IProduct } from "@/types/product";
import { cookies } from "next/headers";

export const createProductService = async (formData: FormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("No token found");

  const res = await fetch("NEXT_PUBLIC_API/api/product", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // only token
    },
    body: formData, // FormData includes images + fields
    credentials: "include",
  });

  console.log(formData);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Backend error:", errorText);
    throw new Error("Failed to create product");
  }

  return res.json(); // { success, message, data: Product }
};

export const getAllProducts = async () => {
  const res = await fetch("NEXT_PUBLIC_API/api/product", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    console.log(err);
    throw new Error("Failed to fetch products");
  }

  return res.json(); // { data: IProduct[] }
};

export const singleProductById = async (productId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`NEXT_PUBLIC_API/api/product/${productId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.log(err);
    throw new Error("Failed to get product");
  }

  return res.json();
};

export const deleteProduct = async (productId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`NEXT_PUBLIC_API/api/product/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.log(err);
    throw new Error("Failed to delete product");
  }

  return res.json();
};

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  const res = await fetch(`NEXT_PUBLIC_API/api/product/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(err);
    throw new Error("Update failed");
  }

  return res.json();
};

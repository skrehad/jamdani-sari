/* eslint-disable @typescript-eslint/no-explicit-any */
export const loginUser = async (userData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return res.json();
};

export const registerUser = async (userData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return res.json();
};

export const getCurrentUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/get-me`, {
    credentials: "include",
  });

  console.log("STATUS:", res.status); // 🔥 add this

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

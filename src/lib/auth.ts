export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

// lib/auth.ts
export const saveToken = (token: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("accessToken", token);
};

export const removeToken = () => {
  if (typeof window !== "undefined") localStorage.removeItem("accessToken");
};

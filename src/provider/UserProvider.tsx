/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/services/auth";

interface IUserContext {
  user: any;
  setUser: any;
  isLoading: boolean;
  logOut: () => void;
}

const UserContext = createContext<IUserContext | null>(null);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");

  //   if (!token) {
  //     setIsLoading(false);
  //     return;
  //   }

  //   const fetchUser = async () => {
  //     try {
  //       const data = await getCurrentUser();
  //       console.log("USER DATA:", data);
  //       setUser(data);
  //     } catch (error) {
  //       console.log("User fetch failed");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // ✅ Only logout এ token remove হবে
  // const logOut = () => {
  //   localStorage.removeItem("accessToken");
  //   setUser(null);
  // };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res?.data); // 🔥 only actual user object
      } catch (error) {
        console.log("User fetch failed");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logOut = () => {
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, logOut }}>
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used inside UserProvider");
  return context;
};

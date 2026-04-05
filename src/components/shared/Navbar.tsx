"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "../../assests/logo.png";
import { Menu, X } from "lucide-react";

import { useAuth } from "@/provider/UserProvider";

export default function Navbar() {
  const { user, isLoading, logOut } = useAuth();
  const [open, setOpen] = useState(false);

  const linkClass =
    "text-gray-600 hover:text-black transition text-sm font-medium";

  const authBtn = "px-3 py-2 rounded-full text-sm transition font-medium";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoImage} alt="logo" height={38} width={38} />
          <span className="font-semibold text-lg">Jamdani Cart</span>
        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={linkClass}>
            Home
          </Link>
          <Link href="/shop" className={linkClass}>
            Shop
          </Link>
          <Link href="/about" className={linkClass}>
            About
          </Link>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>
        </div>

        {/* AUTH */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link
                    href={
                      user.role === "ADMIN"
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                    }
                    className={`${authBtn} bg-black text-white hover:opacity-80`}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={logOut}
                    className={`${authBtn} border cursor-pointer border-red-300 text-gray-700 hover:bg-gray-100`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`${authBtn} bg-black text-white hover:opacity-80`}
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className={`${authBtn} border border-gray-300 text-gray-700 hover:bg-gray-100`}
                  >
                    Register
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-5 space-y-4">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/shop" className="block">
            Shop
          </Link>
          <Link href="/about" className="block">
            About
          </Link>
          <Link href="/contact" className="block">
            Contact
          </Link>

          <div className="pt-4 border-t space-y-3">
            {!isLoading && (
              <>
                {user ? (
                  <>
                    <Link
                      href={
                        user.role === "ADMIN"
                          ? "/admin/dashboard"
                          : "/user/dashboard"
                      }
                      className="block font-medium"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={logOut}
                      className="block text-red-500 font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block font-medium">
                      Login
                    </Link>

                    <Link href="/register" className="block font-medium">
                      Register
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

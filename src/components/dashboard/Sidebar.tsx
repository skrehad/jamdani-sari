"use client";

import Link from "next/link";
import { useAuth } from "@/provider/UserProvider";
import { usePathname, useRouter } from "next/navigation";
import { Home, LogOut, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  const { user, logOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  const links =
    user.role === "ADMIN"
      ? [
          { name: "Dashboard", href: "/admin/dashboard" },
          { name: "All Users", href: "/admin/dashboard/users" },
          { name: "Products", href: "/admin/dashboard/products" },
          { name: "Add Products", href: "/admin/dashboard/add-products" },
          { name: "Orders", href: "/admin/dashboard/orders" },
          { name: "Pre-Orders", href: "/admin/dashboard/pre-orders" },
          { name: "Wishlist", href: "/admin/dashboard/wishlist" },
          { name: "All Reviews", href: "/admin/dashboard/all-reviews" },
        ]
      : [
          { name: "Dashboard", href: "/user/dashboard" },
          { name: "My Orders", href: "/user/dashboard/orders" },
          { name: "Pre-Orders", href: "/user/dashboard/pre-orders" },
          { name: "My Wishlist", href: "/user/dashboard/wishlist" },
          { name: "Add Review", href: "/user/dashboard/add-review" },
        ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-xl flex flex-col border-r sticky top-0">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white p-5">
        <div className="flex items-center gap-2">
          <LayoutDashboard size={20} />
          <h2 className="font-bold text-lg">{user.role} Panel</h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-3 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold border-l-4 border-indigo-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-3 border-t">
        {/* Home Button */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <Home size={18} />
          Go To Home
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full cursor-pointer flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
}

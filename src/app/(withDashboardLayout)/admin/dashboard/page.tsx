/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Users, ShoppingCart, Package, Star, Home } from "lucide-react";
import { toast } from "sonner";
import { getAdminDashboardStats } from "@/services/dashboard";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  const quickLinks = [
    { name: "Manage Users", href: "/admin/dashboard/users" },
    { name: "Manage Orders", href: "/admin/dashboard/orders" },
    { name: "Manage Products", href: "/admin/dashboard/products" },
    { name: "All Reviews", href: "/admin/dashboard/all-reviews" },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminDashboardStats();
        setStats({
          totalUsers: data.totalUsers,
          totalOrders: data.totalOrders,
          totalProducts: data.totalProducts,
          totalReviews: data.totalReviews,
        });
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to load admin stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading stats...</p>;

  const statsData = [
    { title: "Total Users", value: stats.totalUsers, icon: Users },
    { title: "Total Orders", value: stats.totalOrders, icon: ShoppingCart },
    { title: "Total Products", value: stats.totalProducts, icon: Package },
    { title: "Total Reviews", value: stats.totalReviews, icon: Star },
  ];

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* Gradient Header */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome Admin 👑</h1>
          <p className="opacity-90 mt-2">
            Control and manage your entire platform from here.
          </p>
        </div>

        {/* Home Button */}
        <Link
          href="/"
          className="mt-4 md:mt-0 flex items-center gap-2 bg-white text-indigo-600 px-5 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          <Home size={18} />
          Go To Home
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </h2>
                </div>
                <div className="bg-indigo-100 p-3 rounded-2xl">
                  <Icon className="text-indigo-600" size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-3xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Quick Actions 🚀
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="bg-linear-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-2xl text-center font-semibold hover:scale-105 transition duration-300 shadow-md"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

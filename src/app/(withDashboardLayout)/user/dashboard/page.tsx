/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart, Clock, Star, Home } from "lucide-react";
import { getUserDashboardStats } from "@/services/dashboard";
import { toast } from "sonner";

export default function UserDashboardPage() {
  const [stats, setStats] = useState({
    ordersCount: 0,
    wishlistCount: 0,
    preOrdersCount: 0,
    reviewsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  const quickLinks = [
    { name: "View Orders", href: "/user/dashboard/orders" },
    { name: "My Wishlist", href: "/user/dashboard/wishlist" },
    { name: "Pre-Orders", href: "/user/dashboard/pre-orders" },
    { name: "Add Review", href: "/user/dashboard/add-review" },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getUserDashboardStats();
        console.log(data);
        setStats({
          ordersCount: data.ordersCount,
          wishlistCount: data.wishlistCount,
          preOrdersCount: data.preOrdersCount,
          reviewsCount: data.reviewsCount,
        });
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading stats...</p>;

  const statsData = [
    { title: "My Orders", value: stats.ordersCount, icon: ShoppingCart },
    { title: "Pre-Orders", value: stats.preOrdersCount, icon: Clock },
    { title: "Wishlist Items", value: stats.wishlistCount, icon: Heart },
    { title: "Reviews Given", value: stats.reviewsCount, icon: Star },
  ];

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* Gradient Header */}
      <div className="bg-linear-to-r from-blue-500 to-indigo-500 text-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
          <p className="opacity-90 mt-2">
            Manage your orders, wishlist, pre-orders, and track your activity.
          </p>
        </div>

        {/* Home Button */}
        <Link
          href="/"
          className="mt-4 md:mt-0 flex items-center gap-2 bg-white text-blue-600 px-5 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
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
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Icon className="text-blue-600" size={28} />
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
              className="bg-linear-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-2xl text-center font-semibold hover:scale-105 transition duration-300 shadow-md"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import logoImage from "../../assests/logo.png";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const supportLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Shipping Policy", href: "/shipping" },
  { label: "Return Policy", href: "/return" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Top Newsletter */}
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight md:mx-3 xl:text-2xl">
            Get updates on new{" "}
            <span className="text-[#d9f507]">Jamdani arrivals</span> & offers ✨
          </h1>
          <div className="mt-6 md:mx-3 md:mt-0">
            <button className="px-5 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/80 transition">
              Subscribe Now
            </button>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Footer Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Quick Links */}
          <div className="mx-auto">
            <p className="font-semibold text-lg mb-3">Quick Links</p>
            <div className="space-y-2">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-300 hover:text-[#FDF2F2] transition duration-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="mx-auto">
            <p className="font-semibold text-lg mb-3">Support</p>
            <div className="space-y-2">
              {supportLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-300 hover:text-[#FDF2F2] transition duration-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="mx-auto">
            <p className="font-semibold text-lg mb-3">Contact Us</p>
            <div className="space-y-2">
              <a
                className="block text-gray-300 hover:text-[#FDF2F2] transition duration-100"
                href="tel:+8801700000000"
              >
                +8801920527080
              </a>
              <a
                className="block text-gray-300 hover:text-[#FDF2F2] transition duration-100"
                href="mailto:support@jamdani.com"
              >
                jamdanicart@gmail.com
              </a>
              <p className="text-gray-300">Dhaka, Bangladesh</p>

              <div className="flex items-center gap-3 pt-2">
                <a className="p-2 bg-gray-800 hover:text-black cursor-pointer hover:bg-[#FDF2F2] rounded-full transition">
                  <Facebook size={18} />
                </a>
                <a className="p-2 bg-gray-800 hover:text-black cursor-pointer hover:bg-[#FDF2F2] rounded-full transition">
                  <Instagram size={18} />
                </a>
                <a className="p-2 bg-gray-800 hover:text-black cursor-pointer hover:bg-[#FDF2F2] rounded-full transition">
                  <Twitter size={18} />
                </a>
                <a className="p-2 bg-gray-800 hover:text-black cursor-pointer hover:bg-[#FDF2F2] rounded-full transition">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className=" flex flex-col items-center text-center">
            <div>
              <Image
                src={logoImage}
                height={90}
                width={120}
                alt="Jamdani Logo"
                className="mb-3 "
              />
            </div>
            <p className="text-gray-300">
              Traditional Handmade Jamdani Sari crafted with love in Bangladesh.
            </p>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Footer Bottom */}
        <div className="w-full text-center py-2">
          <p className="text-sm text-gray-400">
            © 2025 Jamdani Store. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

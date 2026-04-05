"use client";

import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  const phoneNumber = "8801920527080";
  const message = "Hello! I am interested in your Jamdani sari.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      {/* Hover Text */}
      <span className="opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md text-sm font-semibold">
        Chat on WhatsApp
      </span>

      {/* WhatsApp Icon */}
      <div className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 animate-pulse">
        <FaWhatsapp size={34} />
      </div>
    </a>
  );
};

export default WhatsappButton;

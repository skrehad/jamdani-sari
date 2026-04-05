/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Jamdani sari?",
    answer:
      "Jamdani is one of the most famous traditional handloom saris of Bangladesh. It is woven manually using a special technique that creates beautiful floral and geometric patterns directly on the fabric.",
  },
  {
    question: "Are your Jamdani saris handmade?",
    answer:
      "Yes. All of our Jamdani saris are handcrafted by skilled artisans in Bangladesh. Each piece takes days or even weeks to complete depending on the complexity of the design.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Inside Bangladesh delivery usually takes 2-5 business days. International shipping may take 7-14 days depending on your location.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship Jamdani saris worldwide. Shipping cost and delivery time depend on the destination country.",
  },
  {
    question: "How should I take care of Jamdani sari?",
    answer:
      "We recommend dry cleaning for the first few washes. After that, gentle hand washing with mild detergent is best to maintain the beauty of the fabric.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about our handmade Jamdani saris,
            shipping, care instructions, and more.
          </p>
        </div>

        {/* FAQ List */}

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full cursor-pointer flex justify-between items-center p-6 text-left group"
              >
                <span className="font-semibold text-lg text-gray-800 group-hover:text-primary transition-colors duration-300">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition-all duration-300 text-gray-500 group-hover:text-primary ${
                    openIndex === index ? "rotate-180 text-primary" : ""
                  }`}
                  size={22}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-gray-600 leading-7">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-14 text-center bg-white border rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Still have questions?</h2>

          <p className="text-gray-600 mb-6">
            If you couldn&lsquo;t find the answer you&lsquo;re looking for, our
            support team is here to help you anytime.
          </p>

          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary text-white rounded-full hover:opacity-90 transition font-semibold"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

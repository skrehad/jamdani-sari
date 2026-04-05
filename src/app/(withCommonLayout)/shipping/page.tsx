import { Truck, Clock, Globe, PackageCheck } from "lucide-react";

const ShippingPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shipping Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At Jamdani Store, we are committed to delivering your handmade
            Jamdani saris safely and quickly. Each product is carefully packed
            to ensure it reaches you in perfect condition.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Processing Time */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-primary" />
              <h2 className="text-xl font-semibold">Processing Time</h2>
            </div>

            <p className="text-gray-600 leading-7">
              Orders are processed within <b>24–48 hours</b> after payment
              confirmation. During peak seasons or holidays, processing time may
              be slightly longer due to high demand.
            </p>
          </div>

          {/* Delivery Time */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="text-primary" />
              <h2 className="text-xl font-semibold">Delivery Time</h2>
            </div>

            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>
                Inside Bangladesh: <b>2–5 business days</b>
              </li>
              <li>
                International Orders: <b>7–14 business days</b>
              </li>
              <li>Remote areas may require additional time.</li>
            </ul>
          </div>

          {/* Shipping Charges */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-primary" />
              <h2 className="text-xl font-semibold">Shipping Charges</h2>
            </div>

            <p className="text-gray-600 leading-7">
              Shipping costs are calculated at checkout depending on your
              location and order size. From time to time, we offer
              <b> free shipping promotions</b> on selected orders.
            </p>
          </div>

          {/* Order Tracking */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <PackageCheck className="text-primary" />
              <h2 className="text-xl font-semibold">Order Tracking</h2>
            </div>

            <p className="text-gray-600 leading-7">
              Once your order is shipped, you will receive a
              <b> tracking number via email or SMS</b>. This allows you to track
              your delivery status in real time.
            </p>
          </div>
        </div>

        {/* Extra Section */}
        <div className="mt-14 bg-white border rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Questions About Shipping?
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto leading-7">
            If you have any questions about shipping, delivery times, or order
            tracking, feel free to contact our support team. We are always ready
            to help you with your Jamdani purchase.
          </p>

          <div className="mt-6">
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-primary text-white rounded-full hover:opacity-90 transition font-semibold"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;

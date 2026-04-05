import { RefreshCcw, Package, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

const ReturnPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Return & Refund Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We want you to absolutely love your Jamdani sari. If for any reason
            you are not satisfied with your purchase, our return and refund
            policy is designed to make the process simple and transparent.
          </p>
        </div>

        {/* Return Policy Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Eligibility */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-primary" />
              <h2 className="text-xl font-semibold">Return Eligibility</h2>
            </div>

            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>
                Return request must be made within <b>7 days</b> of delivery.
              </li>
              <li>
                Product must be <b>unused and unwashed</b>.
              </li>
              <li>Original packaging, tags and invoice must be included.</li>
              <li>Items damaged due to misuse are not eligible.</li>
            </ul>
          </div>

          {/* Return Process */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCcw className="text-primary" />
              <h2 className="text-xl font-semibold">Return Process</h2>
            </div>

            <p className="text-gray-600 leading-7">
              To start a return, please contact our support team with your
              <b> order number</b>. After approval, we will guide you through
              the return process. Our team will provide the return shipping
              address and further instructions.
            </p>
          </div>

          {/* Refund Policy */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <Package className="text-primary" />
              <h2 className="text-xl font-semibold">Refund Policy</h2>
            </div>

            <p className="text-gray-600 leading-7">
              Once we receive the returned product and inspect it, your refund
              will be processed within <b>5-7 business days</b>. Refunds will be
              issued using the same payment method used during the purchase.
            </p>
          </div>

          {/* Non Returnable */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-red-500" />
              <h2 className="text-xl font-semibold">Non-Returnable Items</h2>
            </div>

            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Customized or specially ordered Jamdani saris.</li>
              <li>Products damaged after delivery due to misuse.</li>
              <li>Items returned without original packaging.</li>
            </ul>
          </div>
        </div>

        {/* Extra Info */}
        <div className="mt-14 bg-white border rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Need Help With a Return?
          </h2>

          <p className="text-gray-600 text-center max-w-2xl mx-auto leading-7">
            If you have any questions about our return policy or need help with
            your order, please contact our support team. We are always happy to
            assist you and ensure you have a wonderful experience with our
            handcrafted Jamdani saris.
          </p>

          <div className="text-center mt-6">
            <Link href="/contact">
              <button className="px-6 py-3 bg-primary text-white rounded-full hover:opacity-90 transition font-semibold cursor-pointer">
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPage;

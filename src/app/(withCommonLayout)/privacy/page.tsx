import { ShieldCheck, Database, Lock, Users } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your privacy is very important to us. This privacy policy explains
            how Jamdani Store collects, uses, and protects your personal
            information when you use our website.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Information We Collect */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <Database className="text-primary" />
              <h2 className="text-xl font-semibold">Information We Collect</h2>
            </div>

            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Name and contact information</li>
              <li>Shipping and billing address</li>
              <li>Email address and phone number</li>
              <li>Payment details for order processing</li>
            </ul>
          </div>

          {/* How We Use Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-primary" />
              <h2 className="text-xl font-semibold">
                How We Use Your Information
              </h2>
            </div>

            <p className="text-gray-600 leading-7">
              We use your information to process orders, deliver products,
              improve our services, and communicate with you about your
              purchases, promotions, and updates related to Jamdani products.
            </p>
          </div>

          {/* Data Protection */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-primary" />
              <h2 className="text-xl font-semibold">Data Protection</h2>
            </div>

            <p className="text-gray-600 leading-7">
              We use modern security technologies and encryption to protect your
              personal information from unauthorized access, misuse, or
              disclosure.
            </p>
          </div>

          {/* Third Party Services */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-primary" />
              <h2 className="text-xl font-semibold">Third-Party Services</h2>
            </div>

            <p className="text-gray-600 leading-7">
              We may use trusted third-party services for payment processing,
              delivery services, and analytics. These providers only access the
              information necessary to perform their services.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-14 bg-white border rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-semibold mb-3">Your Privacy Matters</h2>

          <p className="text-gray-600 max-w-2xl mx-auto leading-7">
            Jamdani Store is committed to protecting your personal data and
            providing a safe online shopping experience. If you have any
            questions regarding our privacy policy, please feel free to contact
            our support team.
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

export default PrivacyPage;

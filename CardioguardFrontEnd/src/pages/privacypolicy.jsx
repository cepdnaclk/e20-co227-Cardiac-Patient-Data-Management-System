import NavBar from "../components/NavBar";

export default function PrivacyPolicyPage() {
  return (
    <div>
      <NavBar />
      <div className="privacy-policy-body bg-gray-100 min-h-screen p-8">
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-4">
            Last updated: September 10, 2024
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Introduction
          </h2>
          <p className="text-gray-700 mb-4">
            Welcome to [Your Company]. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">
            We collect information that you provide to us directly, such as when you fill out forms on our website or communicate with us. This may include:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Your name</li>
            <li>Email address</li>
            <li>Phone number</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Provide and manage our services</li>
            <li>Communicate with you</li>
            <li>Improve our website and services</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 mb-4">
            We use cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic. You can control cookies through your browser settings.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Rights
          </h2>
          <p className="text-gray-700 mb-4">
            You have the right to access, correct, or delete your personal information. If you wish to exercise any of these rights, please contact us.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-700 mb-4">
            Email: <a href="mailto:info@yourcompany.com" className="text-blue-500">info@yourcompany.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

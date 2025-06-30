// PrivacyPolicy.js
import React from "react";
import bg from '../assets/img1.jpg';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-900 text-white">
      <div
        className="px-6 py-16 md:px-24 min-h-screen bg-opacity-70"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}
      >
        <div className="max-w-6xl mx-auto p-10 my-16">
          {/* Title Section */}
          <div className="text-center mb-10">
            <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
              Privacy Policy
            </h2>
            <p className="text-2xl text-gray-300 mt-4">
              At <span className="text-green-400">[Restaurant Name]</span>, we are dedicated to safeguarding your privacy.
              Below is how we protect your personal data.
            </p>
          </div>

          {/* Information Section */}
          <div className="space-y-12">
            {/* Section 1 */}
            <div className="relative text-left">
              <h3 className="text-4xl font-semibold text-white font-poppins pb-4 border-b-4 border-yellow-400 mb-6">
                1. Information We Collect
              </h3>
              <p className="text-lg text-white opacity-80 mb-4">
                We collect the following information when you make a reservation:
              </p>
              <ul className="list-inside list-disc text-lg text-gray-100 mb-8">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Date and time of reservation</li>
                <li>Special requests (if any)</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="relative text-left">
              <h3 className="text-4xl font-semibold text-white font-poppins pb-4 border-b-4 border-yellow-400 mb-6">
                2. How We Use Your Information
              </h3>
              <p className="text-lg text-white opacity-80 mb-4">
                The information we collect helps us provide you with a seamless dining experience. We use your data for:
              </p>
              <ul className="list-inside list-disc text-lg text-gray-100 mb-8">
                <li>Confirming and managing your reservation</li>
                <li>Communicating with you regarding your booking</li>
                <li>Providing customer support</li>
                <li>Improving our restaurant services</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="relative text-left">
              <h3 className="text-4xl font-semibold text-white font-poppins pb-4 border-b-4 border-yellow-400 mb-6">
                3. Data Protection
              </h3>
              <p className="text-lg text-white opacity-80 mb-4">
                Your data is protected by secure systems. We implement encryption and use access controls to safeguard your personal information.
              </p>
            </div>

            {/* Section 4 */}
            <div className="relative text-left">
              <h3 className="text-4xl font-semibold text-white font-poppins pb-4 border-b-4 border-yellow-400 mb-6">
                4. Sharing Your Information
              </h3>
              <p className="text-lg text-white opacity-80 mb-4">
                We do not sell or share your information with third parties except when necessary to manage your booking.
              </p>
            </div>

            {/* Section 5 */}
            <div className="relative text-left">
              <h3 className="text-4xl font-semibold text-white font-poppins pb-4 border-b-4 border-yellow-400 mb-6">
                5. Your Rights
              </h3>
              <p className="text-lg text-white opacity-80 mb-4">
                You have the right to access, update, or delete the personal data we hold about you.
              </p>
            </div>

            {/* Section 6 */}
            <div className="relative text-left">
              <h3 className="text-4xl font-semibold text-white font-poppins pb-4 border-b-4 border-yellow-400 mb-6">
                6. Cookies
              </h3>
              <p className="text-lg text-white opacity-80 mb-4">
                We use cookies to enhance your experience on our website and track analytics for performance optimization.
              </p>
            </div>

            {/* Section 7 */}
            <div className="relative text-left">
              <h3 className="text-4xl font-semibold text-white font-poppins pb-4 border-b-4 border-yellow-400 mb-6">
                7. Changes to This Privacy Policy
              </h3>
              <p className="text-lg text-white opacity-80 mb-4">
                We may update our policy, and we will notify users of any significant changes by posting on this page.
              </p>
            </div>

            {/* Section 8 */}
            <div className="relative text-left">
              <h3 className="text-4xl font-semibold text-white font-poppins pb-4 border-b-4 border-yellow-400 mb-6">
                8. Contact Us
              </h3>
              <p className="text-lg text-white opacity-80 mb-4">
                If you have any questions about how we handle your data, feel free to contact us at:
              </p>
              <p className="text-lg text-white opacity-80 mb-8">
                Email: contact@restaurant.com
              </p>
            </div>

            {/* Closing Statement */}
            <div className="text-center">
              <p className="text-lg text-white opacity-80">
                By using our services, you agree to the terms of this privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

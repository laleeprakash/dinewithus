import axios from 'axios';
import React, { useState } from 'react';

const Contact = () => {
  const API = import.meta.env.VITE_API_URL;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/feedback`, {
        full_Name: fullName, // match the model field
        email,
        message,
      });

      alert("Thank you for your message!");
      setFullName(""); // Clear the input fields after successful submit
      setEmail("");
      setMessage("");
    } catch (error) {
      alert("There was an error submitting your feedback. Please try again later.");
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg my-12">
      <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">
        Feed Back for Any Improvement
      </h2>
      <p className="text-lg text-center text-gray-700 mb-4">
        Fill out the form below to send us a message.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Field */}
        <div>
          <label htmlFor="fullName" className="block text-lg font-semibold text-gray-800">
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={handleFullName}
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your Full Name"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-gray-800">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your Email Address"
            required
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-lg font-semibold text-gray-800">
            Your Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={handleMessage}
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your message here..."
            rows="4"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>

      <div className="mt-8 text-center text-gray-600 text-lg">
        <p>
          We value your feedback! If you have any suggestions or just want to say hello, feel free to use the form above or email us directly.
        </p>
      </div>
    </div>
  );
};

export default Contact;

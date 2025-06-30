import { useNavigate } from "react-router";
import { useState } from "react";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import Bottom from "../components/Bottom";

function Adminlogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mailhandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordhandler = (e) => {
    setPassword(e.target.value);
  };

  const loginhandler = () => {
    navigate("/adminpage");
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg flex flex-col justify-center items-center shadow-lg">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login as Admin</h1>
        <p className="text-center text-gray-600 mb-6">Use the credentials to login</p>
        
        {/* Form */}
        <form onSubmit={loginhandler} className="w-full">
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email-signin" className="block text-gray-700 text-lg">Email</label>
            <input
              type="email"
              id="email-signin"
              placeholder="Enter your email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={mailhandler}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password-signin" className="block text-gray-700 text-lg">Password</label>
            <input
              type="password"
              id="password-signin"
              placeholder="Enter your password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={passwordhandler}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Bottom Links */}
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="font-bold text-green-500 opacity-90 hover:text-green-600 hover:opacity-100">
              Sign Up
            </a>
          </p>
          <p className="text-sm mt-2">
            <a href="/signin" className="font-bold text-green-500 opacity-90 hover:text-green-600 hover:opacity-100">
              Login as User
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Adminlogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/adminlogin`, {
        username: username,
        password: password,
      });

      if (response.data.success) {
        // Navigate to admin page after successful login
        navigate("/adminpage");
      } else {
        setError("Invalid admin credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials or try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg flex flex-col justify-center items-center shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login as Admin</h1>
        <p className="text-center text-gray-600 mb-6">Use the credentials to login</p>

        {/* Show error if login fails */}
        {error && (
          <div className="mb-4 text-red-500 text-center font-semibold">{error}</div>
        )}

        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4">
            <label htmlFor="email-signin" className="block text-gray-700 text-lg">Email</label>
            <input
              type="email"
              id="email-signin"
              placeholder="Enter your email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password-signin" className="block text-gray-700 text-lg">Password</label>
            <input
              type="password"
              id="password-signin"
              placeholder="Enter your password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition duration-200"
          >
            Login
          </button>
        </form>

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

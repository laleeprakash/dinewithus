import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Adminlogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false); // 👈 New loading state

  const API = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true); // 👈 Start loading

    try {
      const response = await axios.post(`${API}/adminlogin`, {
        username,
        password,
      });

      if (response.data.success) {
        // Save token if needed
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminId", response.data.admin.id);
        localStorage.setItem("adminName", response.data.admin.name);

        navigate("/adminpage");
      } else {
        setError("Invalid admin credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed. Please check your credentials or try again.");
    } finally {
      setIsLoggingIn(false); // 👈 Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg flex flex-col justify-center items-center shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login as Admin</h1>
        <p className="text-center text-gray-600 mb-6">Use your credentials to login</p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-500 text-center font-semibold">{error}</div>
        )}

        {/* Loading Message */}
        {isLoggingIn && (
          <div className="mb-4 text-blue-500 text-center font-medium">Logging in, please wait...</div>
        )}

        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-lg">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoggingIn}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-lg">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoggingIn}
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className={`w-full p-3 font-semibold rounded-md transition duration-200 ${
              isLoggingIn
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-500"
            }`}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="font-bold text-green-500 hover:text-green-600">
              Sign Up
            </a>
          </p>
          <p className="text-sm mt-2">
            <a href="/signin" className="font-bold text-green-500 hover:text-green-600">
              Login as User
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;

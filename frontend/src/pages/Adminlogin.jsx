import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import axios from "axios";

function Adminlogin() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    try {
      const response = await axios.post(`${API}/adminlogin`, {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminId", response.data.admin.id);
        localStorage.setItem("adminName", response.data.admin.name);

        navigate("/adminpage");
      } else {
        setError("Invalid admin credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.error || "Login failed. Please check your credentials or try again."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-cover bg-center">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg flex flex-col justify-center items-center shadow-lg">
        <Heading label="Login as Admin" />

        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>
        )}

        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-lg">
              Username
            </label>
            <Inputbox
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoggingIn}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-lg">
              Password
            </label>
            <Inputbox
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoggingIn}
            />
          </div>

          <Button
            type="submit"
            label={isLoggingIn ? "Logging in..." : "Login"}
            disabled={isLoggingIn}
            className="w-full bg-green-600 text-white rounded p-2"
          />
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            <Link
              to="/signin"
              className="font-bold text-green-500 opacity-90 hover:text-green-600 hover:opacity-100"
            >
              Login as User
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
